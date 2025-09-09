import { useRoute, useRouter } from "vue-router";
import { computed, defineComponent, getCurrentInstance } from "vue";

import type { UsersApiRequestParams } from "@/apis";
import { useUsersQuery } from "@/utils/queries/users";
import { useUpdateUserScoreMutation } from "@/utils/mutations/users";

import UserCard from "./components/user-card";
import CucumberChampion from "./components/cucumber-champion";

export default defineComponent({
  name: "HomePage",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const updateUserScoreMutation = useUpdateUserScoreMutation();

    const page = computed({
      get: () => {
        const raw = Number(route.query.page);
        return Number.isNaN(raw) || raw < 1 ? 1 : raw;
      },
      set: (val: number) => {
        router.replace({
          query: { ...route.query, page: String(val) },
        });
      },
    });

    const params = computed<UsersApiRequestParams>(() => ({
      page: page.value,
    }));

    const { data, isPending, isError, isPlaceholderData } =
      useUsersQuery(params);

    const prevPage = () => {
      page.value = Math.max(page.value - 1, 1);
    };

    const nextPage = () => {
      if (!isPlaceholderData.value) {
        page.value = page.value + 1;
      }
    };

    const vm = getCurrentInstance();

    const onAddCucumber = (id: string) => {
      if (updateUserScoreMutation.isPending.value) {
        return;
      }
      updateUserScoreMutation.mutateAsync(id).then((user) => {
        if (user.score % 100 === 0) {
          vm?.proxy?.$confetti.start();

          setTimeout(() => {
            vm?.proxy?.$confetti.stop();
          }, 5000);
        }
      });
    };

    return () => (
      <section>
        <button
          disabled={!params.value.page || params.value.page <= 1}
          onClick={prevPage}
        >
          Prev Page
        </button>{" "}
        <button
          disabled={!data.value || !data.value.info.hasMore}
          onClick={nextPage}
        >
          Next Page
        </button>
        <p>Current Page: {params.value.page}</p>
        {isPending.value && <div>Loading...</div>}
        {isError.value && <div>An error has occurred</div>}
        {!!data.value?.top && (
          <div>
            <CucumberChampion
              data={data.value.top}
              onAddCucumber={onAddCucumber}
              isUpdating={updateUserScoreMutation.isPending.value}
            />
          </div>
        )}
        {!!data.value?.results && (
          <div>
            {data.value.results.map((item) => (
              <UserCard
                key={item.id}
                data={item}
                isUpdating={updateUserScoreMutation.isPending.value}
                onAddCucumber={onAddCucumber}
              />
            ))}
          </div>
        )}
      </section>
    );
  },
});
