import React, { Component } from 'react';

export default class Pagination extends Component {
    render() {
        return (
            <div className="pagination">
                <If condition={this.props.canGoToPreviousPage}>
                    <button className="previousPage" onClick={this.props.onPreviousPageClick}>
                        <i className="fa fa-angle-left"></i>
                        Back
                    </button>
                </If>
                <If condition={this.props.canGoToNextPage}>
                    <button className="nextPage" onClick={this.props.onNextPageClick}>
                        Next
                        <i className="fa fa-angle-right"></i>
                    </button>
                </If>
                <div className="pages-count">
                    Page {this.props.page} of {this.props.totalPages}
                </div>

                <style jsx>{`
                    .pagination {
                        margin: 30px 0;
                        text-align: center;

                        button {
                            background: none;
                            padding: 0;
                            border: none;
                            cursor: pointer;
                            outline: none;
                            vertical-align: middle;
                            position: relative;
                            top: 3px;

                            &.previousPage {
                                float: left;
                            }

                            &.nextPage {
                                float: right;
                            }

                            i {
                                margin: 0 5px;
                            }
                        }

                        .pages-count {
                            display: inline;
                        }
                    }
                `}</style>
            </div>
        );
    }
}