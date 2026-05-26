import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { accessCodesRouter } from './routes/accessCodes';
import { adminRouter } from './routes/admin';
import { authRouter } from './routes/auth';
import { cartRouter } from './routes/cart';
import { contactRouter } from './routes/contact';
import { contentRouter } from './routes/content';
import { ordersRouter } from './routes/orders';
import { paymentRouter } from './routes/payment';
import { usersRouter } from './routes/users';
import { visualStudioRouter } from './routes/visualStudio';
import { openApiSpec } from './docs/openapi';
import { errorHandler } from './utils/http';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Kubiyogen API', docs: '/api-docs' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(openApiSpec, {
    customSiteTitle: 'Kubiyogen API Docs',
    customCss: '.swagger-ui .topbar { display: none } .swagger-ui .info { margin: 32px 0 }',
  }),
);
app.get('/api/openapi.json', (_req, res) => res.json(openApiSpec));

app.use('/api/auth', authRouter);
app.use('/api', contentRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/access-codes', accessCodesRouter);
app.use('/api/users', usersRouter);
app.use('/api/visual-studio', visualStudioRouter);
app.use('/api/admin', adminRouter);
app.use('/api/contact', contactRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
