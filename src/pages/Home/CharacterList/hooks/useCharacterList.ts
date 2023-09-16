import { fetchingCharacterList } from "@/api";
import useFetch from "@/hooks/useFetch";
import { ROUTE_PATH } from "@/router/routePath";

const useCharacterList = () => {
  const response = useFetch(fetchingCharacterList, ROUTE_PATH.HOME);
  return response.data?.results;
};

export default useCharacterList;
