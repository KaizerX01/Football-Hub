export function LiveIndicator() {
  return (
    <div className="flex items-center bg-red-600 px-4 py-2 rounded-full animate-pulse">
      <div className="h-3 w-3 bg-white rounded-full mr-2"></div>
      <span className="text-sm font-bold text-white">LIVE</span>
    </div>
  );
}
