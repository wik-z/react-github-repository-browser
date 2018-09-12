import React from 'react';

export default function RepositoryStars(props) {
    return (
        <div className="forks">
            <i className="fa fa-code-fork"></i>
            {props.forks}
            <style jsx>{`
                .forks {
                    font-size: 0.8rem;

                    i {
                        margin-right: 4px;
                        color: #9b01e1;
                    }
                }
            `}</style>
        </div>
    );
}