import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If user is authenticated, navigate to dashboard page
  if (session) {
    redirect("/user/dashboard");
  }

  return (
    <div className="my-8 flex flex-col w-full gap-6">
      {/* Motto */}
      <h1 className="text-5xl/tight lg:text-6xl/tight font-bold text-center animate-fade-in">
        Learning, <span className="text-primary italic">redefined</span>.
      </h1>
      {/* Details */}
      <div className="flex flex-col items-center justify-center text-center gap-6 animate-slide-up">
        <p className="text-xl/relaxed text-foreground/80">
          Transform any topic into an engaging, interactive learning experience tailored just for you.
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
        <Link href="/auth/login">
          <Button size="xl" className="rounded-full hover:shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-primary/25 shadow-sm animate-pulse-slow hover:animate-glow">
            Start Learning!
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
