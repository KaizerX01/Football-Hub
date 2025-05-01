export default function PlayerMatchesSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-48 mb-4" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-gray-100 p-4 rounded"
          >
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-32 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-24" />
            </div>
            <div className="h-6 w-20 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
