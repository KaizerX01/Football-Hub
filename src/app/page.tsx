import HeroSection from "@/Components/HomePage/HeroSection";
import MatchesSection from "@/Components/HomePage/MatchSection";
import NewsSection from "@/Components/HomePage/NewsSection";
import StatsSection from "@/Components/HomePage/StatsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 opacity-80"></div>

        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-purple-600 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full bg-indigo-400 opacity-10 blur-3xl"></div>
        <div className="absolute top-3/4 right-1/3 w-64 h-64 rounded-full bg-violet-500 opacity-15 blur-3xl"></div>

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
      </div>

      <div className="relative z-10">
        <main className="space-y-24 px-6 md:px-12 lg:px-16 xl:px-24 py-16">
          <section className="max-w-7xl mx-auto">
            <HeroSection />
          </section>
          <section className="max-w-7xl mx-auto">
            <MatchesSection />
          </section>
          <section className="max-w-7xl mx-auto">
            <NewsSection />
          </section>
          <section className="max-w-7xl mx-auto">
            <StatsSection />
          </section>
        </main>
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none z-0"></div>
    </div>
  );
}
