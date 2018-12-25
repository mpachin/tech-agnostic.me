import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';

const Tag = ({
  pageContext: {
    tag,
  },
  data: {
    allMarkdownRemark: {
      edges,
      totalCount,
    },
    site: {
      siteMetadata: {
        title,
      },
    },
  },
  location,
}) => {
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`;

  return (
    <Layout
      title={title}
      location={location}
    >
      <h1>{tagHeader}</h1>
      <ul>
        {
            edges.map(({ node }) => {
                const { path, title } = node.frontmatter
                return (
                  <li key={path}>
                    <Link to={path}>{title}</Link>
                  </li>
                )
            })
        }
      </ul>
      <Link to="/tags">All tags</Link>
    </Layout>
  );
};

export default Tag;

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;