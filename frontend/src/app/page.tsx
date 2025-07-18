import Footer from "./components/Footer";
import TopBar from "./components/TopBar";

const Home = () => {
  return (
    <>
      <main className="min-h-screen flex flex-col relative overflow-hidden">
        <TopBar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 z-10">
          {/* Motto */}
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold text-center animate-fade-in">
              Learning, <span className="text-primary italic">redefined</span>.
            </h1>
          </div>
          {/* Details */}
          <div className="max-w-2xl flex flex-col items-center justify-center text-center gap-6 animate-slide-up">
            <p className="text-xl text-foreground/80">
              Transform any topic into an engaging, interactive learning
              experience tailored just for you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="animate-bounce-in py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-primary/25 bg-background">
                <span className="font-semibold text-foreground">
                  Quick Quizzes
                </span>
              </div>
              <div className="animate-bounce-in py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 animation-delay-200 border border-primary/25 bg-background">
                <span className="font-semibold text-foreground">
                  Engaging Polls
                </span>
              </div>
              <div className="animate-bounce-in py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 animation-delay-400 border border-primary/25 bg-background">
                <span className="font-semibold text-foreground">
                  Reordering exercises
                </span>
              </div>
              <div className="animate-bounce-in py-2 sm:py-3 animation-delay-600">
                <span className="font-semibold text-foreground italic">
                  and more...
                </span>
              </div>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-background rounded-full hover:shadow-lg transition-all hover:scale-105 shadow-md animate-pulse-slow w-fit">
              Start Learning!
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
