import { getMockUsers, updateMockUserScoreAsynchronously } from "./mocks";
import type { UsersApiRequestParams } from "./types";
import { mapUserApiDataToUser } from "./utils";

export async function getUsersLeaderboard(params?: UsersApiRequestParams) {
  const data = await getMockUsers(params);

  return {
    results: data.results.map(mapUserApiDataToUser),
    info: data.info,
    top: data.top ? mapUserApiDataToUser(data.top) : null,
  };
}

export async function updateUserScore(id: string, score = 1) {
  const data = await updateMockUserScoreAsynchronously(id, score);

  return mapUserApiDataToUser(data);
}
