import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityParam = searchParams.get('city');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '21');
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    // Supabase માંથી ડેટા અને કાઉન્ટ બંને એકસાથે લાવવા માટે
    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' });

    // જો સીટી ફિલ્ટર હોય તો
    if (cityParam && cityParam.trim() !== '' && cityParam.toLowerCase() !== 'all') {
      const cleanCity = cityParam.trim();
      query = query.or(`location.ilike.%${cleanCity}%,title.ilike.%${cleanCity}%`);
    }

    // ઓર્ડર અને પેજિનેશન
    const { data: projects, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Supabase Query Error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const totalProjects = count || 0;
    const totalPages = Math.ceil(totalProjects / limit);

    return NextResponse.json({
      projects: projects || [],
      pagination: {
        totalProjects,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error: any) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}