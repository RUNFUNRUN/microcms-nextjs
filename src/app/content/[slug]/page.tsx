import { Content } from '@/app/types';
import { client } from '@/lib/microcms';

export default async function Home({ params }: { params: { slug: string } }) {
  const post: Content = await client.get({ endpoint: 'blog', contentId: params.slug });
  console.log(post);

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${post.content}`,
        }}
      />
      <p>{post.revisedAt}</p>
    </main>
  );
}

export async function generateStaticParams() {
  const ids = await client.getAllContentIds({ endpoint: 'blog' });
  return ids.map((id) => ({ params: { id } }));
}
