
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto max-w-full bg-blue-100 flex items-center justify-center h-screen overflow-y-auto scrollbar-thin md:scrollbar-none scroll-smooth">
      <div className="w-full md:w-2/4 dark:bg-slate-800 bg-white rounded-lg p-4 shadow-md">
        {children}
      </div>
    </main>

  );
}