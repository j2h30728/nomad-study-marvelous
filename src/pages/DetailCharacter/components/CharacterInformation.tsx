import { useParams } from "react-router-dom";

import makeImagePathname from "@/utils/makeImagePathname";
import useDetailCharacter from "@/hooks/characters/useDetailCharacter";

export default function CharacterInformation() {
  const { id } = useParams();
  const characterDetail = useDetailCharacter(id!);

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
