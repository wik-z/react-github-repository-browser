import React, { Component } from 'react';
import withSpinner from './HOC/withSpinner';

import RepositoryCard from './RepositoryCard';

class RepositoryList extends Component {
    render() {
        /* eslint-disable no-undef */
        return (
            <div className="repository-list">
                <ul className="row">
                    <For each="repository" of={this.props.repositories}>
                        <li key={repository.id}>
                            <RepositoryCard onClick={this.props.onRepositorySelect} repository={repository} />
                        </li>
                    </For>
                </ul>
                <style jsx global>{`
                    @import '../scss/variables';

                    .repository-list {
                        > ul {
                            display: flex;
                            flex-wrap: wrap;
                            padding: 0;
                            list-style: none;

                            > li {
                                display: flex;
                                width: 100%;
                                padding: 0 $gutter-width / 2;
                                transition: opacity 0.25s;

                                @media only screen and (min-width: $screen-sm) {
                                    width: 50%;
                                }
                                @media only screen and (min-width: $screen-lg) {
                                    width: 33.3333%;
                                }
                            }

                            &:hover {
                                > li {
                                    opacity: 0.8;

                                    &:hover {
                                        opacity: 1;

                                        .repository-card {
                                            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                `}</style>
            </div>
        );
    }
}

export default withSpinner(RepositoryList);