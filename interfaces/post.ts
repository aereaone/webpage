import type Author from './author'

type PostType = {
  slug: string
  title: string
  date: string
  tag: Array<string>
  wordCount: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
}

export default PostType
