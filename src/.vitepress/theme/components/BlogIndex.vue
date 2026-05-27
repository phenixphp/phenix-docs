<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../blog.data.js'

const searchQuery = ref('')
const activeTag = ref('all')

const tags = computed(() => {
  const values = posts.flatMap((post) => post.tags)

  return [...new Set(values)].sort((first, second) => first.localeCompare(second))
})

const filteredPosts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return posts.filter((post) => {
    const matchesQuery = !query || [
      post.title,
      post.description,
      post.author,
      ...post.tags
    ].some((value) => value.toLowerCase().includes(query))

    const matchesTag = activeTag.value === 'all' || post.tags.includes(activeTag.value)

    return matchesQuery && matchesTag
  })
})

function formatDate (date) {
  if (!date) {
    return ''
  }

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(`${date}T00:00:00`))
}
</script>

<template>
    <section class="blog-index" aria-labelledby="blog-title">
        <div class="blog-index__header">
            <p class="blog-index__eyebrow">PhenixPHP Blog</p>
            <h1 id="blog-title">Updates, notes, and framework articles</h1>
            <p>
                Follow development notes, release context, and practical articles about building
                concurrent PHP applications with PhenixPHP.
            </p>
        </div>

        <div class="blog-index__filters" aria-label="Blog filters">
            <label class="blog-index__search">
                <span>Search posts</span>
                <input
                    v-model="searchQuery"
                    type="search"
                    placeholder="Search by title, tag, or author"
                >
            </label>

            <div v-if="tags.length" class="blog-index__tags" aria-label="Filter by tag">
                <button
                    type="button"
                    :class="{ active: activeTag === 'all' }"
                    @click="activeTag = 'all'"
                >
                    All
                </button>
                <button
                    v-for="tag in tags"
                    :key="tag"
                    type="button"
                    :class="{ active: activeTag === tag }"
                    @click="activeTag = tag"
                >
                    {{ tag }}
                </button>
            </div>
        </div>

        <div v-if="filteredPosts.length" class="blog-index__posts">
            <article v-for="post in filteredPosts" :key="post.url" class="blog-card">
                <div class="blog-card__meta">
                    <time v-if="post.date" :datetime="post.date">{{ formatDate(post.date) }}</time>
                    <span v-if="post.author">{{ post.author }}</span>
                </div>

                <h2>
                    <a :href="withBase(post.url)">{{ post.title }}</a>
                </h2>

                <p v-if="post.description">{{ post.description }}</p>
                <div
                    v-else-if="post.excerpt"
                    class="blog-card__excerpt"
                    v-html="post.excerpt"
                />

                <ul v-if="post.tags.length" class="blog-card__tags" aria-label="Post tags">
                    <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
                </ul>
            </article>
        </div>

        <p v-else class="blog-index__empty">No posts matched the current filters.</p>
    </section>
</template>
