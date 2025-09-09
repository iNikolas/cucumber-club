import { toValue, type MaybeRef } from "vue";
import { useQuery, keepPreviousData } from "@tanstack/vue-query";

import { getUsersList, type UsersApiRequestParams } from "@/apis";

export function useUsersQuery(params?: MaybeRef<UsersApiRequestParams>) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsersList(toValue(params)),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });
}
