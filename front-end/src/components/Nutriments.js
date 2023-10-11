import React from 'react';

const Nutriments = ({ text, title, image, color }) => {

    console.log(color)

    return (
        <article className='nutriment'>
            <div className={'nutriment__image ' + color}>
                {image}
            </div>
            <div className='nutriment__text'>
                <h3>{text}</h3>
                <h4>{title}</h4>
            </div>
        </article>
    );
};

export default Nutriments;