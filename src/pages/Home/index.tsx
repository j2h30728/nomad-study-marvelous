import { Suspense } from "react";

import CharacterList from "./CharacterList";
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <Suspense fallback={<Loader />}>
      <CharacterList />
    </Suspense>
  );
}
