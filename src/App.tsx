import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import { CacheContextProvider } from "./contexts/CacheContext";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <CacheContextProvider>
        <Layout>
          <Outlet />
        </Layout>
      </CacheContextProvider>
    </ErrorBoundary>
  );
}

export default App;
