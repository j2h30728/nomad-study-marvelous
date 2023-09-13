import { Character, Response } from "@/types";

const BASE_URL = "https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters";

type FetchType = <T>(url: string) => Promise<Response<T>>;
const fetchData: FetchType = async (url) => {
  const response = await (await fetch(url)).json();
  return response.data;
};

export const fetchingCharacterList = () => fetchData<Character[]>(BASE_URL);
export const fetchingCharacter = (id: string) => fetchData<Character[]>(BASE_URL + "/" + id);
