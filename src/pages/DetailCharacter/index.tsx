import { Suspense } from "react";

import Loader from "@/components/Loader";
import APIErrorBoundary from "@/components/ErrorBoundary/APIErrorBoundary";
import CharacterInformation from "./components/CharacterInformation";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Details() {
  return (
    <ErrorBoundary>
      <APIErrorBoundary>
        <Suspense fallback={<Loader />}>
          <CharacterInformation />
        </Suspense>
      </APIErrorBoundary>
    </ErrorBoundary>
  );
}
