import { Suspense } from "react";

import CharacterList from "./CharacterList";

export default function Home() {
  return (
    <Suspense fallback={<div>로딩</div>}>
      <CharacterList />
    </Suspense>
  );
}
