import { createContentLoader } from 'vitepress'

function normalizeTags (tags) {
  return Array.isArray(tags) ? tags.filter((tag) => typeof tag === 'string') : []
}

function readTimestamp (date) {
  const timestamp = Date.parse(date)

  return Number.isNaN(timestamp) ? 0 : timestamp
}

export default createContentLoader('blog/posts/**/*.md', {
  excerpt: true,
  transform (posts) {
    return posts
      .filter(({ frontmatter }) => frontmatter.published !== false)
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title ?? 'Untitled post',
        description: frontmatter.description ?? '',
        date: frontmatter.date ?? '',
        author: frontmatter.author ?? 'PhenixPHP',
        tags: normalizeTags(frontmatter.tags),
        url,
        excerpt
      }))
      .sort((first, second) => readTimestamp(second.date) - readTimestamp(first.date))
  }
})
