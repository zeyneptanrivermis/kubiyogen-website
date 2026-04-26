import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seed starting...');

  // 1. Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kubiyogen.com' },
    update: {},
    create: {
      email: 'admin@kubiyogen.com',
      name: 'Kubiyogen Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('Admin user created');

  // 2. Instructors
  const instructor1 = await prisma.instructor.create({
    data: {
      name: 'Dr. Ahmet Yılmaz',
      title: 'Kariyer Koçu',
      bio: '15 yıllık eğitim tecrübesiyle binlerce gence yol gösterdi.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
  });

  const instructor2 = await prisma.instructor.create({
    data: {
      name: 'Zeynep Kaya',
      title: 'Dijital Tasarım Uzmanı',
      bio: 'UI/UX tasarımında öncü projelerde yer aldı.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
  });
  console.log('Instructors created');

  // 3. Courses
  await prisma.course.createMany({
    data: [
      {
        title: 'Sıfırdan Kariyer Planlama',
        slug: 'sifirdan-kariyer-planlama',
        description: 'Kendi yeteneklerinizi keşfedin ve doğru kariyer yolunu çizin.',
        price: 299.90,
        category: 'Dijital',
        language: 'TR',
        instructorId: instructor1.id,
      },
      {
        title: 'Modern UI/UX Design Masterclass',
        slug: 'ui-ux-design-masterclass',
        description: 'Professional design principles for modern web applications.',
        price: 450.00,
        category: 'Dijital',
        language: 'EN',
        instructorId: instructor2.id,
      },
      {
        title: 'Liderlik ve Yönetim Atölyesi',
        slug: 'liderlik-ve-yonetim-atolyesi',
        description: 'Yüz yüze interaktif grup çalışması.',
        price: 1200.00,
        category: 'Yüz Yüze',
        language: 'TR',
        instructorId: instructor1.id,
      },
    ],
  });
  console.log('Courses created');

  // 4. Events
  await prisma.event.createMany({
    data: [
      {
        title: 'Geleceğin Meslekleri Zirvesi 2026',
        slug: 'gelecegin-meslekleri-2026',
        description: 'Teknoloji dünyasındaki değişimleri uzmanlarından dinleyin.',
        date: new Date('2026-06-15'),
        location: 'İstanbul Kongre Merkezi',
        price: 150.00,
        isUpcoming: true,
      },
      {
        title: 'Networking Brunch',
        slug: 'networking-brunch-ankara',
        description: 'Profesyonellerle tanışma ve iş birliği fırsatı.',
        date: new Date('2026-05-20'),
        location: 'Ankara Hilton',
        price: 200.00,
        isUpcoming: true,
      },
    ],
  });
  console.log('Events created');

  // 5. Products (Accessories)
  await prisma.product.createMany({
    data: [
      {
        name: 'Kubiyogen Motivasyon Defteri',
        slug: 'kubiyogen-motivasyon-defteri',
        description: 'Hedeflerini yazman için özel tasarım defter.',
        price: 85.00,
        stock: 100,
      },
      {
        name: 'Bez Çanta - "Kariyer Yolculuğu"',
        slug: 'bez-canta-kariyer',
        description: 'Sürdürülebilir ve şık tasarım.',
        price: 45.00,
        stock: 50,
      },
    ],
  });
  console.log('Products created');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
