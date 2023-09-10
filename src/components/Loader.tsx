const Loader = () => {
  return (
    <div className="m-20 flex flex-col items-center justify-center space-y-32">
      <svg className="animate-spin h-5 w-24 mr-3 text-red-600 bg-red-700 " viewBox="0 0 24 24"></svg>
      <span className="text-3xl font-bold">로딩중...</span>
    </div>
  );
};
export default Loader;
