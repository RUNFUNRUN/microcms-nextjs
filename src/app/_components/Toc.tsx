import { TocItem } from '@/app/types';

export const Toc = ({ tocData }: { tocData: TocItem[] }) => {
  const paddingClasses = ['pl-0', 'pl-2', 'pl-4', 'pl-6', 'pl-8'];

  const renderTocItems = (items: TocItem[], level = 0) => {
    const paddingLeftClass = paddingClasses[level] || paddingClasses[paddingClasses.length - 1];
    return items.map((item) => (
      <li key={item.id} className={paddingLeftClass}>
        <a href={`#${item.id}`} className="inline-block hover:text-blue-500 text-lg">
          {item.text}
        </a>
        {item.children.length > 0 && (
          <ul className="list-inside ml-2">{renderTocItems(item.children, level + 1)}</ul>
        )}
      </li>
    ));
  };

  return (
    <div>
      <h2 className="text-xl font-bold">{tocData.length > 0 ? '目次' : ''}</h2>
      <ul>{renderTocItems(tocData)}</ul>
    </div>
  );
};
