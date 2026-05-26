import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kubiyogen.com' },
    update: {},
    create: {
      name: 'Kubiyogen Admin',
      email: 'admin@kubiyogen.com',
      password: await hashPassword('Admin12345'),
      role: 'ADMIN',
    },
  });

  await prisma.course.upsert({
    where: { slug: 'biyolojiye-giris' },
    update: {},
    create: {
      title: 'Biyolojiye Giris',
      slug: 'biyolojiye-giris',
      description: 'Temel biyoloji kavramlari ve uygulamali ders akisi.',
      price: 750,
      category: 'Dijital',
      language: 'TR',
    },
  });

  await prisma.event.upsert({
    where: { slug: 'genetik-atolyesi' },
    update: {},
    create: {
      title: 'Genetik Atolyesi',
      slug: 'genetik-atolyesi',
      description: 'Yuz yuze genetik uygulama atolyesi.',
      date: new Date('2026-06-20T10:00:00.000Z'),
      location: 'Istanbul',
      price: 1250,
      isUpcoming: true,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'laboratuvar-defteri' },
    update: {},
    create: {
      name: 'Laboratuvar Defteri',
      slug: 'laboratuvar-defteri',
      description: 'Deney notlari icin spiral ciltli laboratuvar defteri.',
      price: 180,
      stock: 50,
    },
  });

  await prisma.visualCredit.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      freeExportsLimit: 3,
      isPro: true,
    },
  });

  await prisma.visualProject.upsert({
    where: { id: 'seed-visual-project' },
    update: {},
    create: {
      id: 'seed-visual-project',
      userId: admin.id,
      title: 'Ornek Molekul Sahnesi',
      template: 'Molekul Sahnesi',
      sceneJson: {
        labels: ['DNA', 'Protein', 'Pathway'],
        palette: ['#6b16e2', '#0f766e', '#f59e0b'],
      },
      isWatermarked: false,
    },
  });

  console.log(`Seed completed. Admin user: ${admin.email} / Admin12345`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
