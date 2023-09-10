import { fetchingCharacterList } from "@/api";
import makeImagePathname from "@/helpers/makeImagePathname";
import useFetch from "@/hooks/useFetch";
import { ROUTE_PATH } from "@/router";
import { Character, Response } from "@/types";
import { Link } from "react-router-dom";

export default function CharacterList() {
  const response = useFetch<Response<Character[]>>(fetchingCharacterList, ROUTE_PATH.HOME);
  const characterList = response.data;

  return (
    <div className="w-full grid-cols-2 grid sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {characterList?.results.map((character) => (
        <Link
          to={`character/${character.id}`}
          key={character.id}
          className="bg-white p-3 min-w-72 shadow-xl space-y-3 flex flex-col justify-start items-center hover:scale-105 transition-all duration-300 ease-in-out">
          <h2 className="text-xl font-bold">{character.name}</h2>
          <img
            className="object-cover w-80 h-56"
            src={makeImagePathname(character.thumbnail.path, character.thumbnail.extension)}
          />
        </Link>
      ))}
    </div>
  );
}
