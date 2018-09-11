import React, { Component } from 'react';

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
        })
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

                </aside>
                <style jsx global>{`
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
                            position: fixed;
                            top: 0;
                            bottom: 0;
                            right: -250%;
                            width: 320px;
                            background: white;
                            box-shadow: 0 0 15px rgba(0,0,0,0.3);
                            transition: right 0.25s;
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