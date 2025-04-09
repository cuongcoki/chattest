
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto max-w-full shadow-2xl  bg-blue-100 flex flex-col h-screen overflow-y-auto scrollbar-thin md:scrollbar-none scroll-smooth justify-between">
      <div className="w-full  dark:bg-slate-800 bg-white rounded-lg p-4 shadow-md ">
        {children}
      </div>
    </main>

  );
}