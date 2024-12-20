const Loader = () => {
  return (
    <div className="absolute top-0 left-0 right-0 h-full flex items-center justify-center bg-white dark:bg-black dark:bg-opacity-75 bg-opacity-75 z-50">
      <div className="h-30 w-30 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
