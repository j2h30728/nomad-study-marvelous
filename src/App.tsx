import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import { CacheContextProvider } from "./contexts/CacheContext";

function App() {
  return (
    <CacheContextProvider>
      <Layout>
        <Outlet />
      </Layout>
    </CacheContextProvider>
  );
}

export default App;
