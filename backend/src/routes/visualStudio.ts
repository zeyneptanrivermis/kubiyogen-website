import { Router } from 'express';
import { z } from 'zod';
import { Prisma, VisualExportFormat } from '@prisma/client';
import { authenticate, type AuthenticatedRequest } from '../lib/auth';
import { prisma } from '../lib/db';
import { asyncHandler, HttpError, parseBody } from '../utils/http';

export const visualStudioRouter = Router();
visualStudioRouter.use(authenticate);

const sceneSchema = z.record(z.string(), z.unknown()).default({});

const projectSchema = z.object({
  title: z.string().min(2).max(120),
  template: z.string().min(2).max(80),
  sceneJson: sceneSchema,
  exportFormat: z.nativeEnum(VisualExportFormat).default(VisualExportFormat.PNG),
});

const creditForUser = async (userId: string) => {
  return prisma.visualCredit.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
};

visualStudioRouter.get('/credits', asyncHandler(async (req: AuthenticatedRequest, res) => {
  res.json(await creditForUser(req.user!.id));
}));

visualStudioRouter.get('/projects', asyncHandler(async (req: AuthenticatedRequest, res) => {
  res.json(await prisma.visualProject.findMany({
    where: { userId: req.user!.id },
    orderBy: { updatedAt: 'desc' },
  }));
}));

visualStudioRouter.post('/projects', asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = parseBody(projectSchema, req.body);
  const project = await prisma.visualProject.create({
    data: {
      title: body.title,
      template: body.template,
      sceneJson: body.sceneJson as Prisma.InputJsonValue,
      exportFormat: body.exportFormat,
      userId: req.user!.id,
    },
  });
  res.status(201).json(project);
}));

visualStudioRouter.patch('/projects/:id', asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = parseBody(projectSchema.partial(), req.body);
  const project = await prisma.visualProject.findFirst({
    where: { id: String(req.params.id), userId: req.user!.id },
  });
  if (!project) throw new HttpError(404, 'Visual project not found');

  const data: Prisma.VisualProjectUpdateInput = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.template !== undefined) data.template = body.template;
  if (body.sceneJson !== undefined) data.sceneJson = body.sceneJson as Prisma.InputJsonValue;
  if (body.exportFormat !== undefined) data.exportFormat = body.exportFormat;

  res.json(await prisma.visualProject.update({
    where: { id: project.id },
    data,
  }));
}));

visualStudioRouter.post('/projects/:id/export', asyncHandler(async (req: AuthenticatedRequest, res) => {
  const project = await prisma.visualProject.findFirst({
    where: { id: String(req.params.id), userId: req.user!.id },
  });
  if (!project) throw new HttpError(404, 'Visual project not found');

  const credit = await creditForUser(req.user!.id);
  const hasPro = credit.isPro && (!credit.proExpiresAt || credit.proExpiresAt > new Date());
  const canUseFreeExport = credit.freeExportsUsed < credit.freeExportsLimit;
  if (!hasPro && !canUseFreeExport) {
    throw new HttpError(402, 'Free export limit reached');
  }

  const updated = await prisma.$transaction(async (tx) => {
    if (!hasPro) {
      await tx.visualCredit.update({
        where: { userId: req.user!.id },
        data: { freeExportsUsed: { increment: 1 } },
      });
    }

    return tx.visualProject.update({
      where: { id: project.id },
      data: {
        exportedAt: new Date(),
        isWatermarked: !hasPro,
      },
    });
  });

  res.json({
    project: updated,
    export: {
      format: updated.exportFormat,
      watermarked: updated.isWatermarked,
      downloadUrl: null,
    },
  });
}));
