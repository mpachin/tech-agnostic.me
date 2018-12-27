import React, { Component } from 'react';
import { Index } from 'elasticlunr';
import { Link } from 'gatsby';

import TagsListing from './tags-listing';
import { rhythm } from '../utils/typography';

const SearchResult = ({
    path,
    title,
    tags,
}) => (
    <li
        style={{
            padding: rhythm(0.4),
            backgroundColor: 'rgba(0, 122, 204, 0.23)',
        }}
    >
        <Link
            to={path}
            style={{
                display: 'inline-block',
                marginLeft: rhythm(1),
                marginTop: rhythm(0.5),
            }}
        >
            {title}
        </Link>

        <TagsListing tags={tags} />
    </li>
);

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: [],
        };
        this.getOrCreateIndex = this.getOrCreateIndex.bind(this);
        this.search = this.search.bind(this);
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Search for blog posts"
                    value={this.state.query}
                    onChange={this.search}
                    style={{ marginBottom: rhythm(0.5)}}
                />
                <ul style={{ listStyle: 'none' }}>
                    {
                        this.state.results.map((result) => (
                            <SearchResult {...result} />
                        ))
                    }
                </ul>
            </div>
        );
    }

    getOrCreateIndex() {
        const { index } = this.props;

        return this.index
            ? this.index
            // Create an elastic lunr index and hydrate with graphql query results
            : Index.load(index);
    }

    search(evt) {
        const query = evt.target.value;
        this.index = this.getOrCreateIndex();

        this.setState({
            query,
            // Query the index with search string to get an [] of IDs
            results: this.index.search(query)
                // Map over each ID and return the full document
                .map(({ ref }) => {
                    const res = this.index.documentStore.getDoc(ref);
                    return res;
                }),
        });
    }
}
export default Search;