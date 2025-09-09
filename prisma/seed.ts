import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories
  const categories = await prisma.category.createMany({
    data: [
      {
        name_en: 'Electronics',
        name_ru: 'Электроника',
        name_uz: 'Elektronika',
        slug: 'electronics',
        icon: '📱'
      },
      {
        name_en: 'Vehicles',
        name_ru: 'Транспорт',
        name_uz: 'Transport',
        slug: 'vehicles',
        icon: '🚗'
      },
      {
        name_en: 'Real Estate',
        name_ru: 'Недвижимость',
        name_uz: 'Ko\'chmas mulk',
        slug: 'real-estate',
        icon: '🏠'
      },
      {
        name_en: 'Fashion',
        name_ru: 'Мода',
        name_uz: 'Moda',
        slug: 'fashion',
        icon: '👔'
      },
      {
        name_en: 'Home & Garden',
        name_ru: 'Дом и сад',
        name_uz: 'Uy va bog\'',
        slug: 'home-garden',
        icon: '🏡'
      },
      {
        name_en: 'Sports',
        name_ru: 'Спорт',
        name_uz: 'Sport',
        slug: 'sports',
        icon: '⚽'
      }
    ]
  });

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      name: 'John Doe',
      phone: '+998901234567'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice Smith',
      phone: '+998907654321'
    }
  });

  // Get created categories
  const electronicsCategory = await prisma.category.findFirst({
    where: { slug: 'electronics' }
  });
  
  const vehiclesCategory = await prisma.category.findFirst({
    where: { slug: 'vehicles' }
  });

  // Create sample listings
  if (electronicsCategory && vehiclesCategory) {
    const listing1 = await prisma.listing.create({
      data: {
        title_en: 'iPhone 15 Pro Max',
        title_ru: 'iPhone 15 Pro Max',
        title_uz: 'iPhone 15 Pro Max',
        description_en: 'Brand new iPhone 15 Pro Max, 256GB, Titanium Blue. Never used, still in box with all accessories.',
        description_ru: 'Новый iPhone 15 Pro Max, 256ГБ, Титановый синий. Никогда не использовался, в коробке со всеми аксессуарами.',
        description_uz: 'Yangi iPhone 15 Pro Max, 256GB, Titan ko\'k. Hech qachon ishlatilmagan, barcha aksessuarlar bilan qutida.',
        price: 15000000,
        currency: 'UZS',
        condition: 'NEW',
        location: 'Tashkent, Yunusobod',
        userId: user1.id,
        categoryId: electronicsCategory.id
      }
    });

    // Add images for listing1
    await prisma.listingImage.createMany({
      data: [
        {
          url: '/images/iphone-1.jpg',
          alt: 'iPhone 15 Pro Max Front',
          order: 0,
          listingId: listing1.id
        },
        {
          url: '/images/iphone-2.jpg',
          alt: 'iPhone 15 Pro Max Back',
          order: 1,
          listingId: listing1.id
        }
      ]
    });

    const listing2 = await prisma.listing.create({
      data: {
        title_en: 'Toyota Camry 2020',
        title_ru: 'Toyota Camry 2020',
        title_uz: 'Toyota Camry 2020',
        description_en: 'Excellent condition Toyota Camry 2020, 2.5L engine, automatic transmission. One owner, full service history.',
        description_ru: 'Toyota Camry 2020 в отличном состоянии, двигатель 2.5л, автоматическая коробка передач. Один владелец, полная история обслуживания.',
        description_uz: 'Ajoyib holatdagi Toyota Camry 2020, 2.5L dvigatel, avtomatik uzatma qutisi. Bitta egasi, to\'liq xizmat ko\'rsatish tarixi.',
        price: 350000000,
        currency: 'UZS',
        condition: 'EXCELLENT',
        location: 'Tashkent, Mirabad',
        userId: user2.id,
        categoryId: vehiclesCategory.id
      }
    });

    // Add images for listing2
    await prisma.listingImage.create({
      data: {
        url: '/images/camry-1.jpg',
        alt: 'Toyota Camry Exterior',
        order: 0,
        listingId: listing2.id
      }
    });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
