import { buildQueryString } from "@/utils/common";

import type {
  PaginatedAPiResponse,
  UserApiData,
  UsersApiRequestParams,
} from "../types";
import { client } from "../config";
import { mapUserApiDataToUser } from "../utils";

const cache: Record<string, PaginatedAPiResponse<UserApiData>> = {};

function seedUserScores(data: UserApiData[]) {
  return data.map((user) => ({
    ...user,
    score: Math.floor(Math.random() * 100),
  }));
}

function sortMockUsers(data: UserApiData[]) {
  return [...data].sort((a, b) => {
    const result = b.score - a.score;

    if (result === 0) {
      return (
        mapUserApiDataToUser(b).name.length -
        mapUserApiDataToUser(a).name.length
      );
    }

    return result;
  });
}

export async function getMockUsers(params?: UsersApiRequestParams) {
  if (!cache["100"]) {
    const { data } = await client.get<PaginatedAPiResponse<UserApiData>>(
      `https://randomuser.me/api/${buildQueryString({
        results: 100,
      })}`
    );

    cache["100"] = {
      results: sortMockUsers(seedUserScores(data.results)),
      info: data.info,
    };
  }

  const lastPage = Math.ceil(
    cache["100"].results.length / (params?.results ?? 10)
  );

  return {
    results: cache["100"].results.slice(
      (params?.page ?? 1) * (params?.results ?? 10) -
        (params?.results ?? 10) +
        1,
      (params?.page ?? 1) * (params?.results ?? 10) + 1
    ),
    info: { ...cache["100"].info, hasMore: (params?.page ?? 1) < lastPage },
    top: cache["100"].results[0] ?? null,
  };
}

export async function updateMockUserScoreAsynchronously(id: string, score = 1) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = cache["100"].results.find((user) => user.login.uuid === id);

  if (!user) {
    throw new Error(`User ${id} not found`);
  }

  if (user) {
    user.score = user.score + score;
  }

  cache["100"] = {
    ...cache["100"],
    results: sortMockUsers(cache["100"].results),
  };

  return user;
}
