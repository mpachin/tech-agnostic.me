import React from 'react';
import { Link } from 'gatsby';
import { Location } from '@reach/router';

const NavigationLink = ({
    path,
    children,
}) => (
    <Location>
        {({ location }) => (
            <Link
                style={{
                    padding: '5px',
                    backgroundColor: path === location.pathname || path === `${location.pathname}/`
                        ? '#007acc3b'
                        : 'transparent',
                    boxShadow: 'none',
                }}
                to={path}
            >
                {children}
            </Link>
        )}
    </Location>
);

const Navigation = () => (
    <ul
        style={{
            listStyle: 'none',
            display: 'flex',
        }}
    >
        <li>
            <NavigationLink path={'/about/'}>
                About
            </NavigationLink>
        </li>
        <li>
            <NavigationLink path={'/blog/'}>
                Blog
            </NavigationLink>
        </li>
        <li>
            <NavigationLink path={'/tags/'}>
                Search
            </NavigationLink>
        </li>
        <li>
            <NavigationLink path={'/projects/'}>
                Projects
            </NavigationLink>
        </li>
    </ul>
);

export default Navigation;