import { imageFields, seoMetaTagsFields, gql } from '~/lib/datocms'

export const ALL_POSTS_QUERY = gql`
  {
    site: _site {
      favicon: faviconMetaTags {
        ...seoMetaTagsFields
      }
    }

    posts: allPosts(first: 10, orderBy: _firstPublishedAt_DESC) {
      id
      title
      slug
      publicationDate: _firstPublishedAt
      excerpt
      coverImage {
        responsiveImage(imgixParams: { fit: crop, ar: "16:9", w: 860 }) {
          ...imageFields
        }
      }
      author {
        name
        picture {
          responsiveImage(imgixParams: { fit: crop, ar: "1:1", w: 40 }) {
            ...imageFields
          }
        }
      }
    }
  }

  ${imageFields}
  ${seoMetaTagsFields}
`

export const POST_BY_SLUG = gql`
  query BlogPostQuery($slug: String!) {
    site: _site {
      favicon: faviconMetaTags {
        ...seoMetaTagsFields
      }
    }

    post(filter: { slug: { eq: $slug } }) {
      seo: _seoMetaTags {
        ...seoMetaTagsFields
      }
      id
      title
      slug
      publicationDate: _firstPublishedAt
      content
      coverImage {
        responsiveImage(imgixParams: { fit: crop, ar: "16:9", w: 860 }) {
          ...imageFields
        }
      }
      author {
        name
        picture {
          responsiveImage(imgixParams: { fit: crop, ar: "1:1", w: 40 }) {
            ...imageFields
          }
        }
      }
    }
  }

  ${imageFields}
  ${seoMetaTagsFields}
`
