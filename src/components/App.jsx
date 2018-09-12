import React, { Component } from 'react';

import RepositorySearch from './RepositorySearch';
import RepositoryList from './RepositoryList';
import RepositoryDetails from './RepositoryDetails';

import GithubRepository from '../repositories/GithubRepository';
import Pagination from './Pagination';

class App extends Component {
    state = {
        states: {
            isSearching: false, // is there anything in the input?
            isLoading: false, // are we in the middle of a search API request?
            error: false, // has the request failed?
        },
        searchQuery: '',
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
            searchQuery: query,
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
                    totalPages: response.data.items.length > 0 ? Math.ceil(response.data.total_count / response.data.items.length) : 0,
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

    goToPage(page) {
        this.setState({
            states: {
                ...this.state.states,
                isLoading: true,
                isSearching: true,
                error: false,
            },
        })

        // re-fetch data
        GithubRepository
            .search(this.state.searchQuery, page)
            .then((response) => {
                this.setState({
                    states: {
                        ...this.state.states,
                        isLoading: false,
                    },
                    repositories: response.data.items,
                    totalCount: response.data.total_count,
                    totalPages: response.data.items.length > 0 ? Math.ceil(response.data.total_count / response.data.items.length) : 0,
                    perPage: response.data.items.length,
                    page: page,
                });
            })
    }

    nextPage() {
        this.goToPage(this.state.page + 1);
    }
    
    previousPage() {
        this.goToPage(this.state.page - 1);
    }

    canGoToPreviousPage() {
        if (this.state.page === 1) {
            return false;
        }

        if (this.state.totalPages <= 1) {
            return false;
        }

        return true;
    }

    canGoToNextPage() {
        if (this.state.totalPages <= 1) {
            return false;
        }

        if (this.state.page === this.state.totalPages) {
            return false;
        }

        return true;
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
                                    We've found {this.state.totalCount} repositories matching your criteria.
                                </p>
                            </div>
                        </If>

                        <RepositoryList onRepositorySelect={this.handleRepositorySelect.bind(this)} repositories={this.state.repositories} isLoading={this.state.states.isLoading} />
                        
                        <If condition={!this.state.states.isLoading}>
                            <Pagination
                                page={this.state.page} 
                                totalPages={this.state.totalPages} 
                                canGoToNextPage={this.canGoToNextPage()} 
                                canGoToPreviousPage={this.canGoToPreviousPage()}
                                onNextPageClick={this.nextPage.bind(this)} 
                                onPreviousPageClick={this.previousPage.bind(this)} 
                            />
                        </If>
                    </If>
                </div>

                <RepositoryDetails 
                    onClose={this.handleRepositoryDetailsClose.bind(this)} 
                    repository={this.state.selectedRepository} 
                />

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
