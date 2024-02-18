import { Toc } from '@/app/_components/Toc';
import { parseToc } from '@/app/_utils/parseToc';
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
  const tocData = parseToc(post.content);
  const $ = load(post.content);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  let contentStyle = 'w-full';
  if (tocData.length > 0) {
    contentStyle = 'w-[950px]';
  }

  return (
    <main className="flex gap-8">
      <div className={contentStyle}>
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          <p className="text-right text-lg">投稿日 {publishedAtString}</p>
        </div>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{
            __html: `${$.html()}`,
          }}
        />
        <p className="text-right text-lg">最終更新日 {revisedAtString}</p>
      </div>
      {tocData.length > 0 && (
        <div className="w-max relative">
          <div className="sticky top-0 right-0 h-[95dvh] overflow-y-auto pt-4">
            <Toc tocData={tocData} />
          </div>
        </div>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const ids = await client.getAllContentIds({ endpoint: 'blog' });
  return ids.map((id) => ({ params: { id } }));
}
