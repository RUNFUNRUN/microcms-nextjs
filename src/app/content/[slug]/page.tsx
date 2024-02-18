import { Toc } from '@/app/_components/Toc';
import { Content } from '@/app/types';
import { client } from '@/lib/microcms';
import { load } from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/night-owl.css';

export default async function Home({ params }: { params: { slug: string } }) {
  const post: Content = await client.get({ endpoint: 'blog', contentId: params.slug });
  const publishedAt = new Date(post.publishedAt);
  const publishedAtString = `${publishedAt.getFullYear()}年${publishedAt.getMonth() + 1}月${publishedAt.getDate()}日`;
  const revisedAt = new Date(post.revisedAt);
  const revisedAtString = `${revisedAt.getFullYear()}年${revisedAt.getMonth() + 1}月${revisedAt.getDate()}日`;
  const $ = load(post.content);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  return (
    <main>
      <h1>{post.title}</h1>
      <div>
        <p>投稿日</p>
        <p>{publishedAtString}</p>
      </div>
      <div>
        <Toc content={post.content} />
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: `${$.html()}`,
        }}
      />
      <div>
        <p>最終更新日</p>
        <p>{revisedAtString}</p>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const ids = await client.getAllContentIds({ endpoint: 'blog' });
  return ids.map((id) => ({ params: { id } }));
}
