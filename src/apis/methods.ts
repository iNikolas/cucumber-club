import type {
  PaginatedAPiResponse,
  UserApiData,
  UsersApiRequestParams,
} from "./types";
import { client } from "./config";
import { buildQueryString } from "../utils/common";
import { mapUsersApiResponseToUsers } from "./utils";

export async function getUsersList(params?: UsersApiRequestParams) {
  const { data } = await client.get<PaginatedAPiResponse<UserApiData>>(
    `https://randomuser.me/api/${buildQueryString({
      ...params,
      results: params?.results ?? 10,
    })}`
  );
  return { results: mapUsersApiResponseToUsers(data.results), info: data.info };
}
