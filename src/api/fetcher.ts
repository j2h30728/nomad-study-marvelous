import { CharacterResponse } from "@/types/characters";
import { ApiError } from "./customError";

export const BASE_URL = "https://jttiazmtv9.execute-api.ap-northeast-2.amazonaws.com/api";

type CharacterFetchType = (url: string) => Promise<CharacterResponse>;

export const characterFetcher: CharacterFetchType = async (endpoint: string) => {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new ApiError(`HTTP error! Status: ${response.status}`);
  }
  const characterResponse = await response.json();
  return characterResponse.data;
};
