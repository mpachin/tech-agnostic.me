import React from 'react';
import { Link } from 'gatsby';

import { rhythm } from '../utils/typography';

const TagsListing = ({ tags }) => {
    if (!tags || tags.length && tags.length < 0) {
        return null;
    }

    return (
        <ul style={{ marginBottom: rhythm(0.5) }}>
            {
                tags.length > 0 && <b>Tags: </b>
            }
            {
                tags.map((tag, index) => (
                    <React.Fragment>
                        <Link to={`/tags/${tag}`}>{tag}</Link>
                        {index !== tags.length - 1 ? ' | ' : null}
                    </React.Fragment>
                ))
            }
        </ul>
    );
};

export default TagsListing;