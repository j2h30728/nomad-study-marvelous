import { Suspense } from "react";

import CharacterList from "./CharacterList";
import Loader from "@/components/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <CharacterList />
      </Suspense>
    </ErrorBoundary>
  );
}
