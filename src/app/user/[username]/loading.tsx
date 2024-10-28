export default function Loading() {
    return (
      <div className="w-full animate-pulse">
        <div className="px-5 sm:px-10 pb-10">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Profile Header Skeleton */}
            <div className="w-full sm:w-2/3 h-48 bg-gray-200 rounded-2xl"/>
            {/* Stats Skeleton */}
            <div className="w-full sm:w-1/3 h-48 bg-gray-200 rounded-2xl"/>
          </div>
        </div>
      </div>
    )
  }