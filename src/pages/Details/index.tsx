import { Suspense } from "react";

import CharacterDetail from "./CharacterDetail";
import Loader from "@/components/Loader";

export default function Details() {
  return (
    <Suspense fallback={<Loader />}>
      <CharacterDetail />
    </Suspense>
  );
}
