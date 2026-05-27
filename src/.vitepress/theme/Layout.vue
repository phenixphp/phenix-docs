<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { data as blogPosts } from './blog.data.js'
import HomeCodeShowcase from './components/HomeCodeShowcase.vue'
import PhoenixLogo from './components/PhoenixLogo.vue'

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()

const isBlogPost = computed(() => frontmatter.value.blogPost === true)

const currentPostIndex = computed(() => {
  const relativePath = page.value.relativePath

  if (!relativePath) {
    return -1
  }

  const path = `/${relativePath}`.replace(/\.md$/, '')
  const normalizedPath = path.replace(/\/index$/, '/').replace(/\.html$/, '')

  return blogPosts.findIndex((post) => {
    const normalizedUrl = post.url.replace(/\.html$/, '').replace(/\/$/, '')
    const normalizedCurrentPath = normalizedPath.replace(/\/$/, '')

    return normalizedUrl === normalizedCurrentPath
  })
})

const currentPost = computed(() => {
  if (currentPostIndex.value < 0) {
    return null
  }

  return blogPosts[currentPostIndex.value]
})

const newerPost = computed(() => {
  if (currentPostIndex.value <= 0) {
    return null
  }

  return blogPosts[currentPostIndex.value - 1]
})

const olderPost = computed(() => {
  if (currentPostIndex.value < 0 || currentPostIndex.value >= blogPosts.length - 1) {
    return null
  }

  return blogPosts[currentPostIndex.value + 1]
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
    <Layout>
        <template #home-hero-image>
            <PhoenixLogo />
        </template>

        <template #home-features-before>
            <HomeCodeShowcase />
        </template>

        <template v-if="isBlogPost" #doc-before>
            <article class="blog-post-header">
                <p class="blog-post-header__eyebrow">
                    <a :href="withBase('/blog/')">Blog</a>
                </p>

                <h1>{{ frontmatter.title }}</h1>

                <p v-if="frontmatter.description" class="blog-post-header__description">
                    {{ frontmatter.description }}
                </p>

                <div class="blog-post-header__meta">
                    <span v-if="frontmatter.author">{{ frontmatter.author }}</span>
                    <time v-if="frontmatter.date" :datetime="frontmatter.date">
                        {{ formatDate(frontmatter.date) }}
                    </time>
                </div>

                <ul v-if="frontmatter.tags?.length" class="blog-post-header__tags">
                    <li v-for="tag in frontmatter.tags" :key="tag">{{ tag }}</li>
                </ul>
            </article>
        </template>

        <template v-if="isBlogPost && currentPost" #doc-after>
            <nav
                v-if="newerPost || olderPost"
                class="blog-post-nav"
                aria-label="Blog post navigation"
            >
                <a
                    v-if="newerPost"
                    class="blog-post-nav__link"
                    :href="withBase(newerPost.url)"
                >
                    <span>Newer</span>
                    {{ newerPost.title }}
                </a>
                <span v-else class="blog-post-nav__spacer" />

                <a
                    v-if="olderPost"
                    class="blog-post-nav__link next"
                    :href="withBase(olderPost.url)"
                >
                    <span>Older</span>
                    {{ olderPost.title }}
                </a>
            </nav>
        </template>
    </Layout>
</template>

<style scoped>
/* Layout specific styles */
</style>
