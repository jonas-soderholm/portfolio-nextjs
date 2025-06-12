export function InfoSkeleton({
  children,
  builtWith,
  url,
  gitsource,
}: {
  children?: React.ReactNode;
  builtWith: { logoSrc: string; name: string }[];
  url?: string;
  gitsource?: string;
}) {
  return (
    <div className="info-skeleton flex flex-col lg:flex-row gap-2 w-screen px-4">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col gap-4 w-[25rem] shrink-0 sticky top-2 self-start">
        {/* Built with logos */}
        <div className="flex flex-wrap gap-2 bg-slate-200 text-black text-lg py-3 px-4 rounded-2xl">
          <div className="w-full font-semibold mb-2">Built with:</div>
          {builtWith.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 shadow-sm"
            >
              <img src={tool.logoSrc} alt={tool.name} className="w-5 h-5" />
              <span className="text-sm">{tool.name}</span>
            </div>
          ))}
        </div>

        {/* Buttons desktop */}
        {url && (
          <button
            onClick={() => window.open(url, "_blank")}
            className="flex justify-between bg-slate-200 text-black text-xl py-2 px-6 rounded-full"
          >
            Visit website
          </button>
        )}
        {gitsource && (
          <button
            onClick={() => window.open(gitsource, "_blank")}
            className="flex justify-between bg-slate-200 text-black text-xl py-2 px-6 rounded-full"
          >
            Github
          </button>
        )}
      </div>

      {/* Main content takes remaining space */}
      <div>
        <div className="flex-1 p-5 bg-slate-200 rounded-xl">
          {/* Populate */}
          {children}
          <div className="lg:hidden ">
            {/* Buttons desktop */}
            <div className="flex flex-wrap gap-2 bg-slate-200 text-black text-lg py-3 rounded-2xl">
              {builtWith.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 shadow-sm"
                >
                  <img src={tool.logoSrc} alt={tool.name} className="w-5 h-5" />
                  <span className="text-xs">{tool.name}</span>
                </div>
              ))}
            </div>
            <div className="flex lg:flex-row gap-4 mt-2">
              <button
                onClick={() => window.open(url, "_blank")}
                className="btn-small flex bg-blue-600 text-center text-slate-200 text-xs py-2 px-6 rounded-full"
              >
                Visit website
              </button>

              <button
                onClick={() => window.open(gitsource, "_blank")}
                className="btn-small flex bg-blue-600 text-center text-slate-200 text-xs py-2 px-6 rounded-full"
              >
                Github
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
