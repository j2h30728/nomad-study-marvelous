import { Suspense } from "react";
import CharacterDetail from "./CharacterDetail";

export default function Detail() {
  return (
    <Suspense fallback={<div>로딩</div>}>
      <CharacterDetail />
    </Suspense>
  );
}
