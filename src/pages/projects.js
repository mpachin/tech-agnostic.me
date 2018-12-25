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
                One of projects deserved to be mentioned is this blog itself, its repository placed on <a target="_blank" href="https://github.com/mpachin/tech-agnostic.me">GitHub</a>.
            </p>
            <p>
                Another one is my <a target="_blank" href="https://codepen.io/misha_pachin/pen/OZWjZr">Game of Life</a> implementation,
                created as part of <a target="_blank" href="https://www.freecodecamp.org/">freeCodeCamp</a> tasks.
            </p>
            <p>
                Currently I'm looking into contributing to open source, I'll update this page with relevant info. For the time of writing PR's worth mentioning is:
            </p>
            <ul>
                <li><a target="_blank" href="https://github.com/react-cosmos/react-cosmos/pull/689">react-cosmos's support for node_modules subdirectories</a></li>
            </ul>
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
