import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
  const errorInLoader = useRouteError() as Error;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <h2 className="text-4xl font-bold">{errorInLoader ? errorInLoader.message : "잘못된 요청입니다."}</h2>
      <Link to={"/"} className="text-xl button">
        메인페이지로 돌아가기
      </Link>
    </div>
  );
}
