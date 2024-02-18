import { Content } from '@/app/types';
import { client } from '@/lib/microcms';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('q');
  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  const result: Content[] = await client.getAllContents({
    endpoint: 'blog',
    queries: { q: query },
  });
  if (result.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(result);
};
