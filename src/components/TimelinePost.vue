<template>
  <div class="posts">
    <div
        v-for="post in posts"
        :key="post.id"
        class="post"
    >
      <div class="post-container">
        <p>{{ post.title }}</p>
        <div class="post-description">{{ post.created.format('Do MMM') }}</div>
      </div>
    </div>
  </div>
</template>

<script
    setup
    lang="ts"
>
import {defineProps} from 'vue';
import {today, thisWeek, thisMonth, Post} from "@/mocks";

defineProps({
  posts: {
    type: Object as () => Post[],
    required: true,
  }
})
</script>

<style
    lang="postcss"
    scoped
>

.posts {
  @apply grid grid-cols-3 gap-5;
}

.post-container {
  @apply border-4;

  p {
    @apply text-center font-bold;
  }
}

.post-description {
  @apply bg-gray-50;
}
</style>