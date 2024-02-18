import Link from 'next/link';
import { SearchBox } from './SearchBox';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white w-[1280px] mx-auto bg-main">
      <header className="flex justify-between items-center">
        <Link href="/" className="text-4xl font-bold ml-8">
          ブログ
        </Link>
        <div>
          <SearchBox />
        </div>
      </header>
      {children}
    </div>
  );
};
