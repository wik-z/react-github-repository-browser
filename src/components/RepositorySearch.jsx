import React, { Component } from 'react';

export default class RepositorySearch extends Component {
    timeout = null;
    
    state = {
        searchQuery: '',
    };

    onSearchQueryChange(e) {
        this.setState({
            searchQuery: e.target.value,
        });
        
        if (e.target.value === '') {
            if (this.props.onChange) {
                this.props.onChange('');
            }
        }

        // The script will wait for the input for one second to make sure
        // that the user stopped typing before sending the API request

        // if there's already a timeout going, clear it
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        // wait some more time for input
        this.timeout = setTimeout(() => {
            if (this.props.onChange) {
                this.props.onChange(this.state.searchQuery);
            }
        }, 400);
    }

    render() {
        return (
            <div className={`repository-search ${this.state.searchQuery && this.state.searchQuery.length >= 1 ? 'has-query' : ''}`}>
                <div className="input-group">
                    <i className="fa fa-github"></i>
                    <input 
                        type="text"
                        placeholder="Search Github..."
                        className="form-control"
                        value={this.state.searchQuery}
                        onChange={this.onSearchQueryChange.bind(this)}
                    />
                </div>

                <style jsx global>{`
                    .repository-search {
                        position: absolute;
                        top: 40%;
                        left: 0;
                        right: 0;
                        width: 100%;
                        text-align: center;
                        padding: 2.1rem 0;
                        transition: top 0.25s;
                        
                        &.has-query {
                            top: 0;
                        }

                        .input-group {
                            display: inline-block;
                            max-width: 380px;
                            position: relative;

                            i.fa-github {
                                position: absolute;
                                top: 0;
                                left: 14px;
                                bottom: 0;
                                height: 36px;
                                font-size: 2.2rem;
                                margin: auto 0;
                            }
                            
                            input {
                                font-size: 1.2rem;
                                padding: 1rem 2rem;
                                border-radius: 35px;
                                text-align: center;
                            }
                        }
                    }
                `}</style>
            </div>
        );
    }
}