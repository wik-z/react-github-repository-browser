import React, { Component } from 'react';

export default class Spinner extends Component {
    render() {
        return (
            <div className="spinner">
                <style jsx global>{`
                    @import '../scss/variables';

                    .spinner {
                        width: 100%;
                        text-align: center;

                        &:before {
                            content: '';
                            display: inline-block;
                            width: 80px;
                            height: 80px;
                            border-radius: 50%;
                            border: 10px solid $gray-lighter;
                            border-top-color: transparent;

                            animation-name: spin;
                            animation-iteration-count: infinite;
                            animation-duration: .7s;
                            animation-timing-function: linear;
                        }
                    }

                    @keyframes spin {
                        from {transform:rotate(0deg);}
                        to {transform:rotate(360deg);}
                    }
                `}</style>
            </div>
        );
    }
}