import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { updateUserScore } from "@/apis";

export function useUpdateUserScoreMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => updateUserScore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
