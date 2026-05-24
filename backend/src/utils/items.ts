import type { ItemType, PrismaClient } from '@prisma/client';
import { HttpError } from './http';

export type ResolvedItem = {
  itemType: ItemType;
  itemId: string;
  title: string;
  price: number;
  stock?: number;
};

export const resolveCatalogItem = async (
  prisma: PrismaClient,
  itemType: ItemType,
  itemId: string,
): Promise<ResolvedItem> => {
  if (itemType === 'COURSE') {
    const course = await prisma.course.findUnique({ where: { id: itemId } });
    if (!course) throw new HttpError(404, 'Course not found');
    return { itemType, itemId, title: course.title, price: course.price };
  }

  if (itemType === 'EVENT') {
    const event = await prisma.event.findUnique({ where: { id: itemId } });
    if (!event) throw new HttpError(404, 'Event not found');
    return { itemType, itemId, title: event.title, price: event.price };
  }

  const product = await prisma.product.findUnique({ where: { id: itemId } });
  if (!product) throw new HttpError(404, 'Product not found');
  return { itemType, itemId, title: product.name, price: product.price, stock: product.stock };
};

export const orderItemRelation = (itemType: ItemType, itemId: string) => {
  if (itemType === 'COURSE') return { courseId: itemId };
  if (itemType === 'EVENT') return { eventId: itemId };
  return { productId: itemId };
};
