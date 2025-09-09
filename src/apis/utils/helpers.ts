import type { User } from "@/entities";

import type { UserApiData } from "../types";

export function mapUserApiDataToUser(user: UserApiData): User {
  return {
    id: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`,
    score: user.score,
    avatar: user.picture.medium,
  };
}
