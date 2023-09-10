import { ROUTE_PATH } from "@/router";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isRootPath = pathname === ROUTE_PATH.ROOT;

  return (
    <div className="w-full flex flex-col items-center bg-slate-200 h-[200vh] px-10">
      <div className="text-5xl font-extrabold flex justify-between w-full p-10">
        {isRootPath ? (
          <div></div>
        ) : (
          <Link className="self-start" to={ROUTE_PATH.ROOT}>
            &lt;
          </Link>
        )}
        <Link to={ROUTE_PATH.HOME} className="text-red-700">
          MARVELOUS CHARACTER
        </Link>
        <div> </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
