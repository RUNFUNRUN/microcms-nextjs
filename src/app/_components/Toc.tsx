import { TocItem } from '@/app/types';
import { parseToc } from '@/app/_utils/parseToc';

export const Toc = ({ content }: { content: string }) => {
  const tocData = parseToc(content);

  const renderTocItems = (items: TocItem[]) => {
    return items.map((item) => (
      <li key={item.id}>
        <a href={`#${item.id}`}>{item.text}</a>
        {item.children.length > 0 && <ul>{renderTocItems(item.children)}</ul>}
      </li>
    ));
  };

  return (
    <div>
      <h2>{tocData.length > 0 ? '目次' : ''}</h2>
      <ul>{renderTocItems(tocData)}</ul>
    </div>
  );
};
