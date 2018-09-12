import React from 'react';

export default function RepositoryStars(props) {
    return (
        <div className="issues">
            <i className="fa fa-exclamation-circle"></i>
            {props.issues}
            <style jsx>{`
                .issues {
                    font-size: 0.8rem;

                    i {
                        margin-right: 4px;
                        color: #ff0000;
                    }
                }
            `}</style>
        </div>
    );
}