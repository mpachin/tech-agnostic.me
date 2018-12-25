import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import TagsListing from '../components/tags-listing';

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
      >
        <SEO
          title="Blog"
          keywords={[
            'blog',
            'react',
            'frontend',
            'javascript',
            'programming',
          ]}
        />
        {
          posts.map(({ node }) => {
            const {
              excerpt,

              frontmatter: {
                title,
                date,
                tags,
              },

              fields: {
                slug,
              },
            } = node;

            const postTitle = title || slug;

            return (
              <div key={slug}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link
                    style={{
                      boxShadow: 'none',
                      display: 'inline-block',
                      background: 'rgba(0, 122, 204, 0.23)',
                      padding: rhythm(0.2),
                    }}
                    to={slug}
                  >
                    {postTitle}
                  </Link>
                </h3>
                <small>{date}</small>
                <TagsListing tags={tags} />
                <p dangerouslySetInnerHTML={{ __html: excerpt }} />
              </div>
            );
          })
        }
      </Layout>
    );
  }
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`;
