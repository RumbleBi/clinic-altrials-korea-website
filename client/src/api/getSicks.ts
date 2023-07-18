import { SickList } from "../types/types";
import { api } from "./config";

export const getSickByName = async (name: string): Promise<SickList[] | []> => {
  try {
    const res = await api.get("/sick", { params: { q: name } });
    return res;
  } catch (e) {
    throw e;
  }
};
