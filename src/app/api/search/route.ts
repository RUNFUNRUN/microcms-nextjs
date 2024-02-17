import { Content } from '@/app/types';
import { client } from '@/lib/microcms';
import { MicroCMSListResponse } from 'microcms-js-sdk';
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
  return NextResponse.json(result);
};
