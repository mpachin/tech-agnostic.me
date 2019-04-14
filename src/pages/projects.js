import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { rhythm } from '../utils/typography';

const PortfolioPage = ({
    location,
    data: {
        site: {
            siteMetadata: {
                title,
            },
        },
    },
}) => (
    <Layout
        location={location}
        title={title}
    >

        <div style={{ marginTop: rhythm(2) }}>
            <p>
                Currently, I'm working on <a target="_blank" href="https://github.com/react-ref-groupie">react-ref-groupie</a> project. This is a React refs manager library which allows you to handle complex animations/ref manipulation logic independently from component nesting.
            </p>
            <p>
                One of projects deserved to be mentioned is this blog itself, its repository placed on <a target="_blank" href="https://github.com/mpachin/tech-agnostic.me">GitHub</a>.
            </p>
        </div>
    </Layout>
);

export default PortfolioPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
