<template>
  <nav>
    <a
        v-for="(period, key) in periods"
        :key="key"
        :class="{'is-active': activePeriod === period}"
        :data-test="period"
        class="tab"
        @click="setPeriod(period)"
    >
      {{ period }}
    </a>
  </nav>

  <TimelinePost
      :posts="posts"
  />
</template>

<script
    setup
    lang="ts"
>
import TimelinePost from "@/components/TimelinePost.vue";
import moment from "moment";
import {ref, computed, onMounted} from 'vue';
import {Post} from "@/mocks";
import {useStore} from "@/Store";

type Period = 'Сегодня' | 'Неделя' | 'Месяц';

const $store = useStore();
const allPosts: Post[] = $store.getState().posts.ids.reduce<Post[]>((result, item) => {
  const thePost = $store.getState().posts.all.get(item);
  if (!thePost) {
    throw Error('not found')
  }

  return result.concat(thePost)
}, [])
const periods = ref(['Сегодня', 'Неделя', 'Месяц']);
const activePeriod = ref<Period>(periods.value[0] as Period);

const posts = computed(() => {
  return allPosts.filter(post => {
    if (activePeriod.value === 'Сегодня') {
      return post.created.isAfter(moment().subtract(1, 'day'))
    }
    if (activePeriod.value === 'Неделя') {
      return post.created.isAfter(moment().subtract(5, 'day'))
    }
    if (activePeriod.value === 'Месяц') {
      return post.created.isAfter(moment().subtract(1, 'month'))
    }
    return []
  })
})


const setPeriod = (period: string) => {
  activePeriod.value = period as Period
}

onMounted(async () => {
  await $store.fetchPosts()
  console.log($store.getState(), '123123')
})
</script>

<style
    lang="postcss"
    scoped
>
nav {
  @apply flex justify-center items-center;
}

.tab {
  @apply mx-2 font-bold text-gray-800 cursor-pointer mb-10 transition-colors duration-200;

  &.is-active {
    @apply text-blue-800;
  }
}
</style>
