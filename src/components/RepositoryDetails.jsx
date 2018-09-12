import React, { Component } from 'react';
import RepositoryStars from './RepositoryStars';
import RepositoryForks from './RepositoryForks';
import RepositoryIssues from './RepositoryIssues';
import GithubRepository from '../repositories/GithubRepository';
import RepositoryReadme from './RepositoryReadme';

export default class RepositoryDetails extends Component {
    state = {
        open: false,
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.repository && !this.props.repository) {
            this.open();
        }
    }

    open() {
        this.setState({
            open: true,
            readme: null,
        });
    }

    close() {
        this.setState({
            open: false,
        });

        setTimeout(this.props.onClose, 500);
    }
    
    render() {
        return (
            <div className={`repository-details-sidebar ${this.state.open ? 'open' : ''}`}>
                <div className="backdrop" onClick={this.close.bind(this)}></div>
                <aside>
                    <button className="close" onClick={this.close.bind(this)}>
                        <i className="fa fa-times"></i>
                    </button>

                    <If condition={this.props.repository}>
                        <div className="statistics">
                            <RepositoryIssues issues={this.props.repository.open_issues} />
                            <RepositoryForks forks={this.props.repository.forks_count} />
                            <RepositoryStars stars={this.props.repository.stargazers_count} />
                        </div>
                        <section>
                            <h2>{this.props.repository.name}</h2>
                            <p>{this.props.repository.description}</p>
                            <a 
                                className="btn btn-primary btn-block" 
                                target="_blank"
                                href={GithubRepository.repositoryUrl(this.props.repository.owner.login, this.props.repository.name)}
                            >
                                <i className="fa fa-github"></i>
                                View on GitHub.com
                            </a>
                        </section>
                        <section>
                            <RepositoryReadme repository={this.props.repository} />
                        </section>
                    </If>
                </aside>
                <style jsx global>{`
                    @import '../scss/variables';

                    .repository-details-sidebar {
                        .backdrop {
                            position: fixed;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: rgba(0,0,0,0.6);
                            z-index: -100;
                            opacity: 0;
                            transition: opacity 0.25s;
                        }

                        aside {
                            overflow-y: scroll;
                            position: fixed;
                            top: 0;
                            bottom: 0;
                            right: -250%;
                            width: 320px;
                            background: white;
                            box-shadow: 0 0 15px rgba(0,0,0,0.3);
                            transition: right 0.25s;
                            padding: 2rem 1.5rem 1rem 1rem;

                            @media (min-width: $screen-sm) {
                                width: 550px;
                            }

                            @media (min-width: $screen-md) {
                                width: 650px;
                            }

                            section {
                                padding: 1rem 0;
                                border-bottom: 1px solid $gray-lighter;

                                &:last-child {
                                    border-bottom: none;
                                }
                            }

                            button.close {
                                font-size: 20px;
                                background: none;
                                border: none;
                                outline: none;
                                padding: 0;
                                position: absolute;
                                top: 12px;
                                left: 1rem;
                                opacity: 0.6;

                                &:hover {
                                    opacity: 1;
                                }
                            }

                            .statistics {
                                position: absolute;
                                right: 1.5rem;
                                top: 15px;

                                > div {
                                    display: inline-block;
                                    margin-left: 14px;
                                    font-size: 1rem;
                                }
                            }
                        }

                        &.open {
                            aside {
                                right: 0;
                                z-index: 501;
                            }

                            .backdrop {
                                opacity: 1;
                                z-index: 500;
                            }
                        }
                    }
                `}</style>
            </div>
        );
    }
}