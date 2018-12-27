import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import Search from '../components/search';

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
    siteSearchIndex: {
      index,
    },
  },
  location,
}) => (
  <Layout
    location={location}
    title={title}
  >
    <Helmet title={title} />

    <div>
      <h2>Search</h2>
      <Search index={index} />
    </div>

    <div>
      <h2>All Tags</h2>
      <ul>
        {
          group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  </Layout>
);

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
    siteSearchIndex {
      index
    }
  }
`;