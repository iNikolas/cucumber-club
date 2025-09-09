import type { User } from "@/entities";

import type { UserApiData } from "../types";

export function mapUsersApiResponseToUsers(data: UserApiData[]): User[] {
  return data.map((user) => {
    return {
      id: user.id.value,
      name: `${user.name.first} ${user.name.last}`,
      score: Math.floor(Math.random() * 100),
      avatar: user.picture.medium,
    };
  });
}
