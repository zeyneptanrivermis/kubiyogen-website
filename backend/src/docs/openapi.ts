import swaggerJSDoc from 'swagger-jsdoc';

export const openApiSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Kubiyogen API',
      version: '1.0.0',
      description:
        'Kubiyogen backend API for auth, catalog, cart, orders, PayTR payments, access codes, users, and admin CRUD.',
    },
    servers: [{ url: '/api', description: 'Local API' }],
    tags: [
      { name: 'Auth' },
      { name: 'Catalog' },
      { name: 'Cart' },
      { name: 'Orders' },
      { name: 'Payment' },
      { name: 'Access Codes' },
      { name: 'Users' },
      { name: 'Visual Studio' },
      { name: 'Admin' },
      { name: 'Contact' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Credentials: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8 },
          },
        },
        CatalogList: {
          type: 'object',
          properties: {
            items: { type: 'array', items: { type: 'object' } },
            total: { type: 'number' },
            limit: { type: 'number' },
            offset: { type: 'number' },
          },
        },
        CartItemInput: {
          type: 'object',
          required: ['itemType', 'itemId'],
          properties: {
            itemType: { type: 'string', enum: ['COURSE', 'EVENT', 'PRODUCT'] },
            itemId: { type: 'string' },
            quantity: { type: 'integer', minimum: 1, default: 1 },
          },
        },
        OrderInput: {
          type: 'object',
          required: ['items'],
          properties: {
            items: {
              type: 'array',
              items: { $ref: '#/components/schemas/CartItemInput' },
            },
          },
        },
      },
    },
    paths: {
      '/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Create an account',
          requestBody: { required: true, content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Credentials' }] } } } },
          responses: { 201: { description: 'Registered' }, 409: { description: 'Email exists' } },
        },
      },
      '/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login and receive JWT',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Credentials' } } } },
          responses: { 200: { description: 'Authenticated' }, 401: { description: 'Invalid credentials' } },
        },
      },
      '/events': { get: { tags: ['Catalog'], summary: 'List events', responses: { 200: { description: 'Event list' } } } },
      '/events/upcoming': { get: { tags: ['Catalog'], summary: 'List upcoming events', responses: { 200: { description: 'Upcoming events' } } } },
      '/events/recent': { get: { tags: ['Catalog'], summary: 'List recent events', responses: { 200: { description: 'Recent events' } } } },
      '/events/{slug}': {
        get: {
          tags: ['Catalog'],
          summary: 'Get event by slug',
          parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Event' }, 404: { description: 'Not found' } },
        },
      },
      '/courses': { get: { tags: ['Catalog'], summary: 'List courses', responses: { 200: { description: 'Course list' } } } },
      '/courses/{slug}': {
        get: {
          tags: ['Catalog'],
          summary: 'Get course by slug',
          parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Course' }, 404: { description: 'Not found' } },
        },
      },
      '/products': { get: { tags: ['Catalog'], summary: 'List products', responses: { 200: { description: 'Product list' } } } },
      '/products/{slug}': {
        get: {
          tags: ['Catalog'],
          summary: 'Get product by slug',
          parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Product' }, 404: { description: 'Not found' } },
        },
      },
      '/categories': { get: { tags: ['Catalog'], summary: 'List categories', responses: { 200: { description: 'Categories' } } } },
      '/cart': {
        get: { tags: ['Cart'], security: [{ bearerAuth: [] }], summary: 'Get user cart', responses: { 200: { description: 'Cart' } } },
        post: {
          tags: ['Cart'],
          security: [{ bearerAuth: [] }],
          summary: 'Add item to cart',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CartItemInput' } } } },
          responses: { 201: { description: 'Added' } },
        },
      },
      '/orders': {
        get: { tags: ['Orders'], security: [{ bearerAuth: [] }], summary: 'List user orders', responses: { 200: { description: 'Orders' } } },
        post: {
          tags: ['Orders'],
          security: [{ bearerAuth: [] }],
          summary: 'Create order',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/OrderInput' } } } },
          responses: { 201: { description: 'Created' } },
        },
      },
      '/payment/paytr/token': { post: { tags: ['Payment'], security: [{ bearerAuth: [] }], summary: 'Create PayTR iframe token payload', responses: { 200: { description: 'PayTR payload' } } } },
      '/payment/paytr/webhook': { post: { tags: ['Payment'], summary: 'PayTR webhook callback', responses: { 200: { description: 'OK' } } } },
      '/access-codes/validate': { post: { tags: ['Access Codes'], summary: 'Validate access code', responses: { 200: { description: 'Valid' }, 403: { description: 'Invalid' } } } },
      '/users/profile': { get: { tags: ['Users'], security: [{ bearerAuth: [] }], summary: 'Get profile', responses: { 200: { description: 'Profile' } } }, patch: { tags: ['Users'], security: [{ bearerAuth: [] }], summary: 'Update profile', responses: { 200: { description: 'Profile' } } } },
      '/visual-studio/credits': { get: { tags: ['Visual Studio'], security: [{ bearerAuth: [] }], summary: 'Get visual export credits', responses: { 200: { description: 'Credits' } } } },
      '/visual-studio/projects': { get: { tags: ['Visual Studio'], security: [{ bearerAuth: [] }], summary: 'List visual projects', responses: { 200: { description: 'Projects' } } }, post: { tags: ['Visual Studio'], security: [{ bearerAuth: [] }], summary: 'Create visual project', responses: { 201: { description: 'Created' } } } },
      '/visual-studio/projects/{id}/export': { post: { tags: ['Visual Studio'], security: [{ bearerAuth: [] }], summary: 'Export visual project and consume free credit if needed', responses: { 200: { description: 'Export created' }, 402: { description: 'Free export limit reached' } } } },
      '/admin/events': { post: { tags: ['Admin'], security: [{ bearerAuth: [] }], summary: 'Create event', responses: { 201: { description: 'Created' } } } },
      '/admin/courses': { post: { tags: ['Admin'], security: [{ bearerAuth: [] }], summary: 'Create course', responses: { 201: { description: 'Created' } } } },
      '/admin/products': { post: { tags: ['Admin'], security: [{ bearerAuth: [] }], summary: 'Create product', responses: { 201: { description: 'Created' } } } },
      '/admin/orders': { get: { tags: ['Admin'], security: [{ bearerAuth: [] }], summary: 'List orders', responses: { 200: { description: 'Orders' } } } },
      '/admin/users': { get: { tags: ['Admin'], security: [{ bearerAuth: [] }], summary: 'List users', responses: { 200: { description: 'Users' } } } },
      '/contact': { post: { tags: ['Contact'], summary: 'Send contact email', responses: { 202: { description: 'Accepted' } } } },
    },
  },
  apis: [],
});
