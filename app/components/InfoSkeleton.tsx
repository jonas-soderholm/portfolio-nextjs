export function InfoSkeleton() {
  return (
    <>
      <div>
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
          <div className="h-6 w-full bg-gray-300 rounded"></div>
          <div className="h-6 w-full bg-gray-300 rounded"></div>
          <div className="h-6 w-5/6 bg-gray-300 rounded"></div>
        </div>
      </div>
    </>
  );
}
