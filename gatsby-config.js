module.exports = {
  siteMetadata: {
    title: 'Tech Agnostic',
    author: 'Misha Pachin',
    description: 'Blog about programming and informational technology.',
    siteUrl: '',
    social: {
      twitter: 'misha_pachin',
      codewars: 'mpachin',
      github: 'mpachin',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        // trackingId: 'ADD YOUR TRACKING ID HERE',
      },
    },
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Tech Agnostic Blog',
        short_name: 'TechAgnostic',
        start_url: '/',

        // icon generated with https://favicon.io/
        icon: 'content/assets/icon.png',

        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone'
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },

    {
      resolve: `@andrew-codes/gatsby-plugin-elasticlunr-search`,
      options: {
          // Fields to index
          fields: [
              'title',
              'tags',
          ],
          // How to resolve each field's value for a supported node type
          resolvers: {
              // For any node of type MarkdownRemark, list how to resolve the fields' values
              MarkdownRemark: {
                  title: node => node.frontmatter.title,
                  tags: node => node.frontmatter.tags,
                  path: node => node.frontmatter.path,
              },
          },
      },
    },
  ],
}
