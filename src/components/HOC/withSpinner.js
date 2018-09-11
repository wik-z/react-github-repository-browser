import React from 'react';
import Spinner from '../Spinner';

/**
 * withSpinner Higher Order Component
 * Returns a loading spinner if isLoading prop is present
 * @param {React.Component} Component 
 * @returns {React.Component}
 */
export default function withSpinner(Component) {
    return function composedComponent({ isLoading, ...props }) {
        return isLoading ? <Spinner /> : <Component {...props} />;
    }
}