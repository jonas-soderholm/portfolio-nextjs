export function InfoSkeleton({ children }: { children?: React.ReactNode }) {
  return (
    <div className="info-skeleton flex flex-col lg:flex-row gap-4">
      {/* Button box – hidden on mobile and medium screens */}
      <div className="hidden lg:flex flex-col gap-4">
        <div>
          <div className="w-[25rem] bg-white text-black text-2xl py-2 px-4 rounded whitespace-nowrap text-start">
            Project State
          </div>
        </div>
        <button className="w-[25rem] bg-white text-black text-2xl py-2 px-4 rounded whitespace-nowrap text-start">
          Go to website
        </button>
        <button className="w-[25rem] bg-white text-black text-2xl py-2 px-4 rounded whitespace-nowrap text-start">
          yoyo
        </button>
        <button className="w-[25rem] bg-white text-black text-2xl py-2 px-4 rounded whitespace-nowrap text-start">
          yoyo2
        </button>
      </div>

      {/* Main content box fills remaining horizontal space */}
      <div className="flex-1 p-5 bg-gray-300 rounded-xl animate-pulse">
        {children}
      </div>
    </div>
  );
}
