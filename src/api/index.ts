const BASE_URL = "https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters";

const fetchData: typeof fetch = async (url) => await fetch(url);

export const fetchingCharacterList = () => fetchData(BASE_URL);
export const fetchingCharacter = (id: string) => fetchData(BASE_URL + "/" + id);
