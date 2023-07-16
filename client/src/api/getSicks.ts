import { SickList } from "../types/types";
import { api } from "./config";

export const getSickByName = async (name: string): Promise<SickList[] | []> => {
  const res = await api.get("/sick", { params: { q: name } });
  return res;
};
