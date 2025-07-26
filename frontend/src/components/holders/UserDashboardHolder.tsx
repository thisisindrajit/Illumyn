"use client";

import { 
  Sidebar,
  MainNavigation,
  LearningInputCard,
  BlockCard,
  PremiumCard,
  TrendingSection,
  MobileNavigation
} from "@/components";

const UserDashboardHolder = () => {
    const handleGenerate = async (data: any) => {
        console.log("Generating content with:", data);
        // TODO: Implement content generation logic
    };

    const handleSubscribe = () => {
        console.log("Subscribe to premium");
        // TODO: Implement subscription logic
    };

    const handleShowMore = () => {
        console.log("Show more trending items");
        // TODO: Implement show more logic
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen my-4">
            {/* Left Sidebar - Hidden on mobile, visible on tablet+ */}
            <Sidebar position="left">
                <MainNavigation />
            </Sidebar>

            {/* Main Content - Full width on mobile, constrained on larger screens */}
            <div className="flex-1 xl:border-r xl:border-border pb-20 md:pb-0">
                <div className="w-full max-w-none xl:max-w-2xl mx-auto p-4 space-y-6">
                    {/* Input Section */}
                    <LearningInputCard onGenerate={handleGenerate} />

                    {/* Trending Blocks Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-foreground">Trending Blocks</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <BlockCard
                                    key={index}
                                    id="1"
                                    isLoading={true}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar - Only visible on desktop (xl+) */}
            <Sidebar position="right">
                <PremiumCard onSubscribe={handleSubscribe} />
                <TrendingSection onShowMore={handleShowMore} />
            </Sidebar>

            {/* Mobile Bottom Navigation - Only visible on mobile */}
            <MobileNavigation />
        </div>
    );
}

export default UserDashboardHolder;