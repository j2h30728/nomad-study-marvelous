import { fetchingCharacter } from "@/api";
import useFetch from "@/hooks/useFetch";
import { ROUTE_PATH } from "@/router/routePath";

const useCharacter = (id: number) => {
  const response = useFetch(() => fetchingCharacter(`${id}`), `${ROUTE_PATH.DETAIL}/${id}`);
  const characterDetail = response?.data?.results[0];
  return characterDetail;
};

export default useCharacter;
