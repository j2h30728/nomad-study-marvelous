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
      <div className="flex flex-col items-center p-10 space-y-10 w-full">
        <h2 className="font-bold text-4xl">{characterDetail?.name}</h2>
        <img
          className="w-80"
          src={makeImagePathname(characterDetail.thumbnail.path, characterDetail.thumbnail.extension)}
        />

        <h3 className="font-bold text-2xl self-center">
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
