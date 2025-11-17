import { groq } from 'next-sanity'

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedAt
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedAt,
    content,
    seo
  }
`
