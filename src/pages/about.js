import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';

import Layout from '../components/layout';
import { rhythm } from '../utils/typography';
import SEO from '../components/seo';

const AboutPage = ({
    location,
    data: {
        site: {
            siteMetadata: {
                title,
                author,
                social: {
                    twitter,
                    codewars,
                    github,
                }
            },
        },

        avatar: {
            childImageSharp: {
                fixed,
            },
        },
    },
}) => (
    <Layout
        location={location}
        title={title}
    >
        <SEO
          title="About"
          keywords={[
            'blog',
            'react',
            'frontend',
            'javascript',
            'programming',
          ]}
        />
        <h1>About Tech Agnostic</h1>
        <div>
            <p>
                Tech Agnostic is a blog about programming languages and web development. This blog was started in November 04, 2017.
            </p>
            <p>
                Term "technology agnostic" means person/approach quality: unbiased towards the use of different technology tools to solve different problems.
            </p>
        </div>

        <h1>About me</h1>
        <div style={{ marginTop: rhythm(2) }}>
            <Image
                fixed={fixed}
                alt={author}
                style={{
                    float: 'right',
                    marginLeft: rhythm(0.5),
                    marginBottom: rhythm(0.5),
                }}
            />
            <p>
                My name is Misha. I love programming in all its aspects, and I believe that programmer in one's career should actively develop a technical outlook and curiosity, and not dwell on learning a single language or technology.
            </p>
            <p>
                I created this blog to share my thoughts with the community in hope to give back any value I can.
            </p>
        </div>

        <h1>Contact</h1>
        <div>
        <p>You can find me on:</p>
            <ul>
                <li>
                    <a target='_blank' href={`https://twitter.com/${twitter}`}>
                        twitter
                    </a>
                </li>
                <li>
                    <a target='_blank' href={`https://www.codewars.com/users/${codewars}`}>
                        codewars
                    </a>
                </li>
                <li>
                    <a target='_blank' href={`https://github.com/${github}`}>
                        github
                    </a>
                </li>
            </ul>
        </div>

        <h1>Colophon</h1>
        <div>
            <p>
                This website is powered by <a target="_blank" href="https://www.gatsbyjs.org/">GatsbyJS</a> and uses its official <a target="_blank" href="https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/">blog starter</a>.
            </p>
            <p>
                <a target="_blank" href="https://www.netlify.com/">Netlify</a> is used for hosting.
            </p>
            <p>
                Icons generated with <a target="_blank" href="https://favicon.io/">favicon</a>.
            </p>
            <p>
                The source code of the site is freely available at <a target="_blank" href="https://github.com/mpachin/tech-agnostic.me">GitHub</a>.
            </p>
        </div>
    </Layout>
);

export default AboutPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
        social {
            twitter
            codewars
            github
        }
      }
    }
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 250, height: 250) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
