const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center m-20 space-y-32 ">
      <svg className="w-24 h-5 mr-3 text-red-600 bg-red-700 animate-spin " viewBox="0 0 24 24"></svg>
      <span className="text-3xl font-bold">로딩중...</span>
    </div>
  );
};
export default Loader;
