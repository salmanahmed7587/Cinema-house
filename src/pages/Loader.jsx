function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-[60vh]">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-blue-400 border-t-transparent animate-spin"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-sm tracking-widest">
            LOADING...
          </span>
        </div>
      </div>
    </div>
  );
}

export default Loader;
