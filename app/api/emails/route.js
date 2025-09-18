import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Email from '@/models/Email';

const API_SECRET = process.env.API_SECRET || 'your-secret-key-here';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const apiKey = searchParams.get('key') || request.headers.get('x-api-key');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 50;
    const search = searchParams.get('search') || '';

    if (!apiKey || apiKey !== API_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid API key' },
        { status: 401 }
      );
    }

    await dbConnect();

    const skip = (page - 1) * limit;
    
    let query = {};
    if (search) {
      query.email = { $regex: search, $options: 'i' };
    }

    const [emails, totalCount] = await Promise.all([
      Email.find(query)
        .select('email consent ipAddress createdAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Email.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: {
        emails,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          limit
        }
      }
    });

  } catch (error) {
    console.error('Emails API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 