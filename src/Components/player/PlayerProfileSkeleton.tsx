export default function PlayerProfileSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-pulse text-black">
      <div className="bg-blue-600 h-32 md:h-48"></div>
      <div className="px-6 py-12 md:px-8 md:flex">
        <div className="md:w-1/3 flex justify-center md:justify-start">
          <div className="w-48 h-48 rounded-full bg-gray-200 border-4 border-white shadow-lg -mt-24 md:-mt-32" />
        </div>
        <div className="md:w-2/3 mt-6 md:mt-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-6 bg-gray-300 rounded w-48 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-32" />
            </div>
            <div className="bg-gray-300 w-16 h-16 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="flex items-center" key={i}>
                <div className="w-5 h-5 mr-3 bg-gray-300 rounded" />
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded w-24 mb-1" />
                  <div className="h-4 bg-gray-300 rounded w-40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
