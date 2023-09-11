import { useParams } from "react-router-dom";

import { fetchingCharacter } from "@/api";
import makeImagePathname from "@/helpers/makeImagePathname";
import useFetch from "@/hooks/useFetch";
import { Character, Response } from "@/types";

export default function CharacterDetail() {
  const { id } = useParams();
  const response = useFetch<Response<Character[]>>(() => fetchingCharacter(`${id}`), `${id}`);
  const characterDetail = response?.data?.results[0];

  return (
    characterDetail && (
      <div className="flex flex-col items-center w-full p-10 space-y-10">
        <h2 className="text-4xl font-bold">{characterDetail?.name}</h2>
        <img
          className="w-80"
          src={makeImagePathname(characterDetail.thumbnail.path, characterDetail.thumbnail.extension)}
        />

        <h3 className="self-center text-2xl font-bold">
          SERIES <span className="text-sm">{`(${characterDetail.series.available})`}</span>
        </h3>
        <div className="flex flex-col space-y-2">
          {characterDetail.series.items.map((item) => (
            <a key={item.resourceURI} className="hover:text-blue-700 active:text-red-900" href={item.resourceURI}>
              {item.name}
            </a>
          ))}
        </div>
      </div>
    )
  );
}
