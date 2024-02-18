import Link from 'next/link';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[1280px] mx-auto my-2 bg-main">
      <div className="w-11/12 mx-auto">
        <header className="flex justify-between items-center mb-4 mt-2">
          <Link href="/" className="text-4xl font-bold">
            ブログ
          </Link>
          <div></div>
        </header>
        {children}
      </div>
    </div>
  );
};
