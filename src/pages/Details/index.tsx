import { Suspense } from "react";

import CharacterDetail from "./CharacterDetail";
import Loader from "@/components/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Details() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <CharacterDetail />
      </Suspense>
    </ErrorBoundary>
  );
}
