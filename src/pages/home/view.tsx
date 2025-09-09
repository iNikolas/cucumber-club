import { defineComponent, ref } from "vue";

import type { UsersApiRequestParams } from "@/apis";
import { useUsersQuery } from "@/utils/queries/users";

import UserCard from "./components/user-card";

export default defineComponent({
  name: "HomePage",
  setup() {
    const params = ref<UsersApiRequestParams>({ page: 1 });

    const { data, isPending, isError, isPlaceholderData } =
      useUsersQuery(params);

    const prevPage = () => {
      params.value = {
        ...params.value,
        page: Math.max((params.value.page ?? 1) - 1, 1),
      };
    };

    const nextPage = () => {
      if (!isPlaceholderData.value) {
        params.value = {
          ...params.value,
          page: (params.value.page ?? 1) + 1,
        };
      }
    };

    return () => (
      <section>
        <p>
          Current Page: {params.value.page} | Previous data:{" "}
          {String(isPlaceholderData.value)}
        </p>
        <button onClick={prevPage}>Prev Page</button>
        <button onClick={nextPage}>Next Page</button>

        {isPending.value && <div>Loading...</div>}
        {isError.value && <div>An error has occurred</div>}
        {!!data.value?.results && (
          <div>
            {data.value.results.map((item) => (
              <UserCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </section>
    );
  },
});
