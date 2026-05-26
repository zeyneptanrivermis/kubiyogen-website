DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ItemType') THEN
    CREATE TYPE "ItemType" AS ENUM ('COURSE', 'EVENT', 'PRODUCT');
  END IF;
END $$;

ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paymentRef" TEXT;

ALTER TABLE "OrderItem" ADD COLUMN IF NOT EXISTS "itemType" "ItemType" NOT NULL DEFAULT 'PRODUCT';
ALTER TABLE "OrderItem" ADD COLUMN IF NOT EXISTS "unitPrice" DOUBLE PRECISION;
ALTER TABLE "OrderItem" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
UPDATE "OrderItem" SET "unitPrice" = COALESCE("unitPrice", "price", 0);
ALTER TABLE "OrderItem" ALTER COLUMN "unitPrice" SET NOT NULL;

ALTER TABLE "AccessCode" ADD COLUMN IF NOT EXISTS "orderId" TEXT;
ALTER TABLE "AccessCode" ADD COLUMN IF NOT EXISTS "courseId" TEXT;
ALTER TABLE "AccessCode" ADD COLUMN IF NOT EXISTS "eventId" TEXT;
ALTER TABLE "AccessCode" ADD COLUMN IF NOT EXISTS "usedAt" TIMESTAMP(3);

CREATE TABLE IF NOT EXISTS "CartItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemType" "ItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "CartItem_userId_itemType_itemId_key" ON "CartItem"("userId", "itemType", "itemId");

CREATE TABLE IF NOT EXISTS "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'CartItem_userId_fkey') THEN
    ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PasswordResetToken_userId_fkey') THEN
    ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'AccessCode_orderId_fkey') THEN
    ALTER TABLE "AccessCode" ADD CONSTRAINT "AccessCode_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'AccessCode_courseId_fkey') THEN
    ALTER TABLE "AccessCode" ADD CONSTRAINT "AccessCode_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'AccessCode_eventId_fkey') THEN
    ALTER TABLE "AccessCode" ADD CONSTRAINT "AccessCode_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
