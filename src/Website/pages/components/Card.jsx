import React from 'react';
import './css/Card.css';

const Card = ({ image, title, para }) => {
    return (
        <div className="card">
            <img src={image} alt={title} className="card-image" />
            <div className="card-content">
                <h1 className="card-title">{title}</h1>
                <p className="card-description">{para}</p>
            </div>
        </div>
    );
};

export default Card;
