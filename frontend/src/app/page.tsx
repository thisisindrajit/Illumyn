import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="my-24 flex flex-col gap-6">
      {/* Motto */}
      <div className="relative">
        <h1 className="text-5xl lg:text-6xl font-bold text-center animate-fade-in">
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
        <Link href="/login">
          <Button size="xl" className="bg-gradient-to-r from-primary to-secondary rounded-full hover:shadow-xl transition-all hover:scale-105 shadow-sm animate-pulse-slow">
            Start Learning!
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
