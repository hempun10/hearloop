import type { Post } from '#/db/schema'

const STOP_WORDS = new Set([
  'the',
  'and',
  'for',
  'with',
  'add',
  'make',
  'can',
  'when',
  'from',
  'that',
  'this',
  'should',
  'would',
  'please',
  'able',
])
const words = (s: string) =>
  s
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))

/** Existing posts sharing words with a draft title, best match first. */
export function findSimilarPosts(title: string, posts: Post[], limit = 3) {
  const wanted = new Set(words(title))
  if (title.trim().length < 4 || !wanted.size) return []
  return posts
    .map((post) => ({ post, score: words(post.title).filter((w) => wanted.has(w)).length }))
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score || b.post.votes - a.post.votes)
    .slice(0, limit)
    .map((m) => m.post)
}
