import { useParams } from "react-router-dom";

import { fetchingCharacter } from "@/api";
import makeImagePathname from "@/helpers/makeImagePathname";
import useFetch from "@/hooks/useFetch";
import { Character, Response } from "@/types";

export default function CharacterDetail() {
  const { id } = useParams();
  const response = useFetch<Response<Character[]>>(() => fetchingCharacter(`${id}`));
  const characterDetail = response?.data?.results[0];

  return (
    characterDetail && (
      <div>
        <h2>{characterDetail?.name}</h2>
        <img src={makeImagePathname(characterDetail.thumbnail.path, characterDetail.thumbnail.extension)} />
      </div>
    )
  );
}
