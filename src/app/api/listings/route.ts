import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET /api/listings - Get all listings with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const condition = searchParams.get('condition');
    const location = searchParams.get('location');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    // Build where clause
    const where: any = {
      status: 'ACTIVE'
    };

    if (category) {
      where.category = { slug: category };
    }

    if (search) {
      where.OR = [
        { title_en: { contains: search, mode: 'insensitive' } },
        { title_ru: { contains: search, mode: 'insensitive' } },
        { title_uz: { contains: search, mode: 'insensitive' } },
        { description_en: { contains: search, mode: 'insensitive' } },
        { description_ru: { contains: search, mode: 'insensitive' } },
        { description_uz: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (condition) {
      where.condition = condition;
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    // Get listings with pagination
    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          },
          category: {
            select: {
              id: true,
              name_en: true,
              name_ru: true,
              name_uz: true,
              slug: true,
              icon: true
            }
          },
          images: {
            orderBy: { order: 'asc' }
          },
          _count: {
            select: {
              favorites: true,
              reviews: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.listing.count({ where })
    ]);

    return NextResponse.json({
      listings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

// POST /api/listings - Create new listing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      title_en,
      title_ru,
      title_uz,
      description_en,
      description_ru,
      description_uz,
      price,
      currency = 'UZS',
      condition,
      location,
      latitude,
      longitude,
      categoryId,
      userId,
      images = []
    } = body;

    // Validate required fields
    if (!title_en || !description_en || !price || !location || !categoryId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create listing
    const listing = await prisma.listing.create({
      data: {
        title_en,
        title_ru,
        title_uz,
        description_en,
        description_ru,
        description_uz,
        price: parseFloat(price),
        currency,
        condition,
        location,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        userId,
        categoryId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        category: true
      }
    });

    // Add images if provided
    if (images.length > 0) {
      await prisma.listingImage.createMany({
        data: images.map((image: any, index: number) => ({
          url: image.url,
          alt: image.alt || `Listing image ${index + 1}`,
          order: index,
          listingId: listing.id
        }))
      });
    }

    return NextResponse.json(listing, { status: 201 });

  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}
