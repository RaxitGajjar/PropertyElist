import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityParam = searchParams.get('city');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '21'); // 1 Page par 21 projects
  const offset = (page - 1) * limit;

  try {
    let query = 'SELECT * FROM rera_projects';
    let countQuery = 'SELECT COUNT(*) as total FROM rera_projects';
    const values: any[] = [];
    const countValues: any[] = [];

    if (cityParam && cityParam.trim() !== '' && cityParam.toLowerCase() !== 'all') {
      const cleanCity = cityParam.trim().toLowerCase();
      const whereClause = ' WHERE LOWER(city) LIKE ? OR LOWER(location) LIKE ?';
      
      query += whereClause;
      countQuery += whereClause;
      
      values.push(`%${cleanCity}%`, `%${cleanCity}%`);
      countValues.push(`%${cleanCity}%`, `%${cleanCity}%`);
    }

    query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
    values.push(limit, offset);

    const [rows]: any = await db.execute(query, values);
    const [countResult]: any = await db.execute(countQuery, countValues);

    const totalProjects = countResult[0]?.total || 0;
    const totalPages = Math.ceil(totalProjects / limit);

    return NextResponse.json({
      projects: rows,
      pagination: {
        totalProjects,
        totalPages,
        currentPage: page,
        limit,
      }
    });
  } catch (error: any) {
    console.error('Database Query Error:', error);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}