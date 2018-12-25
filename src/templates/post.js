import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';
import TagsListing from '../components/tags-listing';

class BlogPostTemplate extends React.Component {
  render() {
    const {
      data: {
        markdownRemark: {
          html,
          excerpt,
          frontmatter: {
            tags,
            title,
            date,
          },
        },
        site: {
          siteMetadata: {
            title: siteTitle,
          },
        },
      },

      pageContext: {
        previous,
        next,
      },

      location,
    } = this.props;

    return (
      <Layout
        location={location}
        title={siteTitle}
      >
        <SEO
          title={title}
          description={excerpt}
        />
        <h1>{title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {date}
        </p>
        <TagsListing tags={tags} />
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {
              previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )
            }
          </li>
          <li>
            {
              next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )
            }
          </li>
        </ul>
      </Layout>
    );
  }
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        tags
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;