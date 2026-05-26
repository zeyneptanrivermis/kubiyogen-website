import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/db';
import { asyncHandler, HttpError, parseQuery } from '../utils/http';

export const contentRouter = Router();

const listQuery = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
  sort: z.enum(['newest', 'oldest', 'price-asc', 'price-desc']).default('newest'),
  category: z.string().optional(),
  language: z.string().optional(),
});

const orderBy = (sort: string) => {
  if (sort === 'oldest') return { createdAt: 'asc' as const };
  if (sort === 'price-asc') return { price: 'asc' as const };
  if (sort === 'price-desc') return { price: 'desc' as const };
  return { createdAt: 'desc' as const };
};

contentRouter.get(
  '/events',
  asyncHandler(async (req, res) => {
    const query = parseQuery(listQuery, req.query);
    const [items, total] = await prisma.$transaction([
      prisma.event.findMany({
        take: query.limit,
        skip: query.offset,
        orderBy: query.sort === 'oldest' ? { date: 'asc' } : { date: 'desc' },
      }),
      prisma.event.count(),
    ]);
    res.json({ items, total, limit: query.limit, offset: query.offset });
  }),
);

contentRouter.get('/events/upcoming', asyncHandler(async (_req, res) => {
  res.json(await prisma.event.findMany({ where: { isUpcoming: true }, orderBy: { date: 'asc' } }));
}));

contentRouter.get('/events/recent', asyncHandler(async (_req, res) => {
  res.json(await prisma.event.findMany({ where: { isUpcoming: false }, orderBy: { date: 'desc' } }));
}));

contentRouter.get('/events/:slug', asyncHandler(async (req, res) => {
  const event = await prisma.event.findUnique({ where: { slug: String(req.params.slug) } });
  if (!event) throw new HttpError(404, 'Event not found');
  res.json(event);
}));

contentRouter.get('/courses', asyncHandler(async (req, res) => {
  const query = parseQuery(listQuery, req.query);
  const where = {
    ...(query.category ? { category: query.category } : {}),
    ...(query.language ? { language: query.language } : {}),
  };
  const [items, total] = await prisma.$transaction([
    prisma.course.findMany({ where, take: query.limit, skip: query.offset, orderBy: orderBy(query.sort) }),
    prisma.course.count({ where }),
  ]);
  res.json({ items, total, limit: query.limit, offset: query.offset });
}));

contentRouter.get('/courses/:slug', asyncHandler(async (req, res) => {
  const course = await prisma.course.findUnique({ where: { slug: String(req.params.slug) } });
  if (!course) throw new HttpError(404, 'Course not found');
  res.json(course);
}));

contentRouter.get('/products', asyncHandler(async (req, res) => {
  const query = parseQuery(listQuery.omit({ language: true }), req.query);
  const [items, total] = await prisma.$transaction([
    prisma.product.findMany({ take: query.limit, skip: query.offset, orderBy: orderBy(query.sort) }),
    prisma.product.count(),
  ]);
  res.json({ items, total, limit: query.limit, offset: query.offset });
}));

contentRouter.get('/products/:slug', asyncHandler(async (req, res) => {
  const product = await prisma.product.findUnique({ where: { slug: String(req.params.slug) } });
  if (!product) throw new HttpError(404, 'Product not found');
  res.json(product);
}));

contentRouter.get('/categories', asyncHandler(async (_req, res) => {
  const [courseCategories, productCount, eventCount] = await prisma.$transaction([
    prisma.course.findMany({ distinct: ['category'], select: { category: true } }),
    prisma.product.count(),
    prisma.event.count(),
  ]);
  res.json({
    courses: courseCategories.map((item) => item.category),
    products: productCount > 0 ? ['Aksesuarlar'] : [],
    events: eventCount > 0 ? ['Etkinlikler'] : [],
  });
}));
