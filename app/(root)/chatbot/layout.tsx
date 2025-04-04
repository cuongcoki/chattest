import History from "@/components/chatbot/history";
import InforExam from "@/components/chatbot/infor-exam";
import CardVideo from "@/components/shared/card-video";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto max-w-full shadow-2xl bg-blue-100 flex flex-col h-screen overflow-y-auto scrollbar-thin md:scrollbar-none scroll-smooth justify-between">
      <Header />
          <div className="px-4 py-1 flex flex-col md:flex-row gap-4">
            <History />
            <div className="w-full md:w-2/4  h-full bg-white rounded-lg p-4 shadow-md flex-grow">
              {children}
            </div>
            <InforExam />
          </div>
          <div className="pt-2">
            <CardVideo />
          </div>
      <Footer />
    </main>
  );
}