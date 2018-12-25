import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

class BlogIndex extends React.Component {
  render() {
    const {
      data: {
        site: {
          siteMetadata: {
            title: siteTitle,
          },
        },
      },
      location,
    } = this.props;

    return (
      <Layout
        location={location}
        title={siteTitle}
      >
        <SEO
          title="Home"
          keywords={[
            'blog',
            'react',
            'frontend',
            'javascript',
            'programming',
          ]}
        />
        <ul style={{ listStyle: 'none' }}>
          {
            [{
              path: '/about/',
              text: 'About',
            }, {
              path: '/blog/',
              text: 'Blog',
            }, {
              path: '/tags/',
              text: 'Search',
            }, {
              path: '/projects',
              text: 'Projects',
            }].map(({ path, text }) => (
              <li>
                <Link
                  to={path}
                  style={{
                    ...scale(0.6),
                    display: 'block',
                    boxShadow: 'none',
                  }}
                >
                  {text}
                </Link>
              </li>
            ))
          }
        </ul>
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
  }
`;
