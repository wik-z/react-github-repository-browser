import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown-github';
import withSpinner from './HOC/withSpinner';
import GithubRepository from '../repositories/GithubRepository';

export default class RepositoryReadme extends Component {
    state = {
        states: {
            isLoading: false,
            error: false,
        },
        readme: null,
    }
    
    componentDidMount() {
        GithubRepository
            .readme(this.props.repository.owner.login, this.props.repository.name)
            .then((response) => {
                this.setState({
                    states: {
                        error: false,
                        isLoading: false,
                    },
                    readme: response.data,
                })
            })
            .catch((error) => {
                this.setState({
                    states: {
                        error: true,
                        isLoading: false,
                    }
                })
            });
    }

    render() {
        return (
            <div className="readme-markdown">
                <div className="inner">
                    <Choose>
                        <When condition={(this.state.states.isLoading && !this.state.readme) || this.state.states.error}>
                            This Repository doesn't seem to have a Readme file.
                        </When>
                        <Otherwise>
                            {React.createElement(withSpinner(ReactMarkdown), { isLoading: this.state.states.isLoading, source: this.state.readme })}
                        </Otherwise>
                    </Choose>
                </div>

                <style jsx>{`
                    @import '../scss/variables';
                    
                    .readme-markdown {
                        width: 100%;
                        overflow-x: scroll;

                        :global(pre) {
                            background: $gray-lighter;
                            padding: 0.8rem;
                            border: 1px solid $gray; 
                            display: inline-block;
                        }

                        :global(code) {
                            background: $gray-lighter;
                        }
                    }
                `}</style>
            </div>
        )
    }
}