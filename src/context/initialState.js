import { fetchUser } from "@component/utils/fetchLocalStorageData";

const userInfo = fetchUser()

export const initialState = {
  user: userInfo,
};