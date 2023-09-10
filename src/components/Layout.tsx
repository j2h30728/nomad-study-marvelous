import { ROUTE_PATH } from "@/router";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isRootPath = pathname === ROUTE_PATH.ROOT;

  return (
    <div className="w-full flex flex-col items-center bg-slate-200 h-screen px-10">
      <div className=" fixed bg-white  font-extrabold flex justify-between w-full p-8 shadow-xl">
        {isRootPath ? (
          <div></div>
        ) : (
          <Link className="self-start text-2xl md:text-5xl sm:text-3xl" to={ROUTE_PATH.ROOT}>
            &lt;
          </Link>
        )}
        <Link to={ROUTE_PATH.HOME} className="text-red-700 text-2xl md:text-5xl sm:text-3xl">
          MARVELOUS CHARACTER
        </Link>
        <div> </div>
      </div>
      <div className="mt-32">{children}</div>
    </div>
  );
};

export default Layout;
