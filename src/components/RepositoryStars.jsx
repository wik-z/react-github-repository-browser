import React from 'react';

export default function RepositoryStars(props) {
    return (
        <div className="stars">
            <i className="fa fa-star"></i>
            {props.stars}
            <style jsx>{`
                .stars {
                    font-size: 0.8rem;

                    i {
                        margin-right: 2px;
                        color: #ff9800;
                    }
                }
            `}</style>
        </div>
    );
}