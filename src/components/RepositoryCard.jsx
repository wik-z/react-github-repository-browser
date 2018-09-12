import React, { Component } from 'react';

import RepositoryStars from './RepositoryStars';

import ellipsis from '../filters/ellipsis';
import datetime from '../filters/datetime';

export default class RepositoryCard extends Component {
    handleClick() {
        // send back the repository on click
        this.props.onClick(this.props.repository);
    }

    render() {
        return (
            <div className="repository-card" onClick={this.handleClick.bind(this)}>
                <div className="repository-card-inner row">
                    <div className="avatar col">
                        <img src={this.props.repository.owner.avatar_url} alt={this.props.repository.owner.login}></img>
                    </div>
                    <div className="details col">
                        <RepositoryStars stars={this.props.repository.stargazers_count} />
                        <h3>{this.props.repository.full_name}</h3>
                        <p className="description">{ellipsis(this.props.repository.description)}</p>
                        <div className="date">
                            Updated: {datetime(this.props.repository.pushed_at, 'DD/MM/YYYY')}
                        </div>
                    </div>
                </div>
                <style jsx global>{`
                    @import "../scss/variables";

                    .repository-card {
                        border: 1px solid $gray-lighter;
                        margin-bottom: $gutter-width;
                        border-radius: $border-radius;
                        display: flex;
                        flex-direction: column;
                        padding: 1em;
                        width: 100%;
                        transition: box-shadow 0.25s;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                        cursor: pointer;

                        .repository-card-inner {
                            flex: 1 0 auto;
                        }

                        .avatar {
                            width: 20%;
                            text-align: center;
                            
                            img {
                                border-radius: 50%;
                                width: 85%;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.33);
                            }
                        }

                        .details {
                            width: 80%;
                        }

                        h3 {
                            word-break: break-all;
                            font-size: 1.2rem;
                            margin-top: 8px;
                            margin-bottom: 0;
                        }

                        .stars {
                            padding-top: 10px;
                            padding-left: 4px;
                            float: right;
                        }

                        p.description {
                            margin-top: 3px;
                        }

                        .date {
                            font-size: 0.7rem;
                            opacity: 0.8;
                        }
                    }
                `}</style>
            </div>
        );
    }
}