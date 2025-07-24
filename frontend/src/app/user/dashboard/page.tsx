const UserDashboard = () => {
    return (
        <div className="flex flex-col w-full space-y-16 my-8">
            {/* Input Section */}
            <div className="flex flex-col items-center space-y-6">
                {/* Topic Input */}
                <div className="w-full max-w-4xl text-center space-y-6">
                    <div className="flex flex-col sm:flex-row items-baseline justify-center gap-4 text-2xl sm:text-3xl">
                        <span className="text-foreground font-semibold">I want to know about</span>
                        <div className="relative flex-1 min-w-0 max-w-lg">
                            <input
                                type="text"
                                placeholder="type in any topic..."
                                className="w-full bg-transparent border-0 border-b-2 border-border focus:border-primary text-primary outline-none py-4 text-2xl sm:text-3xl placeholder:text-muted-foreground transition-colors"
                            />
                        </div>
                    </div>
                </div>
                {/* Divider */}
                <div className="flex items-center gap-4 text-muted-foreground">
                    {`(OR)`}
                </div>
                {/* File Input */}
                <div className="w-full max-w-2xl text-center space-y-3">
                    <p className="text-lg text-foreground">Upload a file to learn more about it</p>
                    <div className="space-y-2">
                        <div className="relative">
                            <input
                                type="file"
                                accept=".pdf"
                                className="w-full p-4 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">Only PDF files are supported.</p>
                    </div>
                </div>
            </div>
            {/* Trending Blocks Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Trending Blocks</h2>
                {/* Skeleton Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="bg-card border border-neutral-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            {/* Image Skeleton */}
                            <div className="w-full h-72 bg-neutral-200 animate-pulse"></div>
                            {/* Content Skeleton */}
                            <div className="p-4 space-y-3">
                                {/* Title Skeleton */}
                                <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
                                <div className="h-4 bg-neutral-200 rounded w-3/4 animate-pulse"></div>
                                {/* Text Skeleton - simulating ~150 characters */}
                                <div className="space-y-2 pt-2">
                                    <div className="h-3 bg-neutral-200 rounded animate-pulse"></div>
                                    <div className="h-3 bg-neutral-200 rounded animate-pulse"></div>
                                    <div className="h-3 bg-neutral-200 rounded animate-pulse"></div>
                                    <div className="h-3 bg-neutral-200 rounded w-2/3 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;