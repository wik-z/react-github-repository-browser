import React, { Component } from 'react';

import RepositorySearch from './RepositorySearch';
import RepositoryList from './RepositoryList';
import RepositoryDetails from './RepositoryDetails';

import GithubRepository from '../repositories/GithubRepository';

class App extends Component {
    state = {
        states: {
            isSearching: false, // is there anything in the input?
            isLoading: false, // are we in the middle of a search API request?
            error: false, // has the request failed?
        },
        repositories: [], // list of repositories
        selectedRepository: null,
        totalCount: 0,
        totalPages: 0,
        perPage: 0,
        page: 1,
    }

    handleSearchQueryChange(query) {
        if (!query || (query && query.length < 1)) {
            // if the input is empty, clear the repositories list
            this.setState({
                states: {
                    ...this.state.states,
                    isSearching: false,
                },
                repositories: [],
            });

            return;
        }

        this.setState({
            states: {
                ...this.state.states,
                isLoading: true,
                isSearching: true,
            },
        })

        GithubRepository
            .search(query)
            .then((response) => {
                this.setState({
                    states: {
                        ...this.state.states,
                        isLoading: false,
                    },
                    repositories: response.data.items,
                    totalCount: response.data.total_count,
                    totalPages: Math.ceil(response.data.total_count / response.data.items.length),
                    perPage: response.data.items.length,
                    page: 1, // reset page to 1 by default on search
                });
            })
    }

    handleRepositorySelect(repository) {
        this.setState({
            selectedRepository: repository,
        });
    }

    handleRepositoryDetailsClose() {
        this.setState({
            selectedRepository: null,
        });
    }

    render() {
        return (
            <div className="app">
                <RepositorySearch isLoading={this.state.states.isLoading} onChange={this.handleSearchQueryChange.bind(this)} />
                <div className="container">
                    <If condition={this.state.states.isSearching}>

                        <If condition={!this.state.states.isLoading}>
                            <div className="repositories-count">
                                <p>
                                    Found {this.state.totalCount} repositories matching your criteria.
                                </p>
                            </div>
                        </If>

                        <RepositoryList onRepositorySelect={this.handleRepositorySelect.bind(this)} repositories={this.state.repositories} isLoading={this.state.states.isLoading} />
                    </If>
                </div>

                <RepositoryDetails onClose={this.handleRepositoryDetailsClose.bind(this)} repository={this.state.selectedRepository} />

                <style jsx global>{`
                    .app {
                        padding-top: 132px;
                        padding-bottom: 80px;

                        .repositories-count {
                            padding-bottom: 20px;
                            text-align: center;

                            p {
                                margin: 0 0 2px;
                            }
                        }
                    }
                `}</style>
            </div>
        );
    }
}

export default App;
