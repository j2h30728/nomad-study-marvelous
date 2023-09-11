import { Link } from "react-router-dom";

import { fetchingCharacterList } from "@/api";
import makeImagePathname from "@/helpers/makeImagePathname";
import useFetch from "@/hooks/useFetch";
import { Character, Response } from "@/types";
import { ROUTE_PATH } from "@/router/routePath";

export default function CharacterList() {
  const response = useFetch<Response<Character[]>>(fetchingCharacterList, ROUTE_PATH.HOME);
  const characterList = response.data;

  return (
    <div className="grid w-full grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {characterList?.results.map((character) => (
        <Link
          to={`character/${character.id}`}
          key={character.id}
          className="flex flex-col items-center justify-start p-3 space-y-3 transition-all duration-300 ease-in-out bg-white shadow-xl min-w-72 hover:scale-105">
          <h2 className="text-xl font-bold">{character.name}</h2>
          <img
            className="object-cover h-56 w-80"
            src={makeImagePathname(character.thumbnail.path, character.thumbnail.extension)}
          />
        </Link>
      ))}
    </div>
  );
}
