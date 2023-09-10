import { fetchingCharacterList } from "@/api";
import useFetch from "@/hooks/useFetch";
import { Character, Response } from "@/types";
import { Link } from "react-router-dom";

export default function CharacterList() {
  const response = useFetch<Response<Character[]>>(fetchingCharacterList);
  const characterList = response.data;

  return (
    <div>
      {characterList?.results.map((character) => (
        <Link to={`character/${character.id}`} key={character.id}>
          <h2>{character.name}</h2>
        </Link>
      ))}
    </div>
  );
}
