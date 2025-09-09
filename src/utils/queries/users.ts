import { toValue, type MaybeRef } from "vue";
import { useQuery, keepPreviousData } from "@tanstack/vue-query";

import { getUsersLeaderboard, type UsersApiRequestParams } from "@/apis";

export function useUsersQuery(params?: MaybeRef<UsersApiRequestParams>) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsersLeaderboard(toValue(params)),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });
}
