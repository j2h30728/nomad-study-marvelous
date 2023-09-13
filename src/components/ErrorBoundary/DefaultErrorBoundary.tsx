import { ROUTE_PATH } from "@/router/routePath";
import { Link } from "react-router-dom";

interface ErrorBoundaryProps {
  error: Error;
}

const DefaultErrorBoundary = ({ error }: ErrorBoundaryProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] space-y-8 w-full">
      <h2 className="text-3xl font-extrabold">오류가 발생했습니다!</h2>
      <span className="text-xl font-semibold">아래의 버튼을 눌러 홈으로 이동 해주세요.</span>
      <span className="font-semibold text-md text-slate-600">{error.message}</span>
      <button className="px-5 py-4 border border-black rounded-lg hover:bg-slate-100 active:bg-slate-300">
        <Link to={ROUTE_PATH.ROOT}>홈으로 이동</Link>
      </button>
    </div>
  );
};

export default DefaultErrorBoundary;
