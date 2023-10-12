import React, { useEffect, useState } from 'react';

const Nutriments = ({ label, value }) => {

    const [title, setTitle] = useState(null)
    const [number, setNumber] = useState(null)

    useEffect(() => {
        switch (label) {
            case 'calorieCount':
                setNumber(Number(value).toLocaleString('en-US') + 'kCal')
                setTitle('Calories')
                break;
            case 'proteinCount':
                setNumber(Number(value).toLocaleString('en-US') + 'g')
                setTitle('Proteines')
                break;
            case 'carbohydrateCount':
                setNumber(Number(value).toLocaleString('en-US') + 'g')
                setTitle('Glucides')
                break;
            case 'lipidCount':
                setNumber(Number(value).toLocaleString('en-US') + 'g')
                setTitle('Lipides')
                break;
            default:
                break;
        }
    }, [])

    return (
        <article className='nutriment'>
            <div className='nutriment__image'>
            </div>
            <div className='nutriment__text'>
                <h3>{number}</h3>
                <h4>{title}</h4>
            </div>
        </article>
    );
};

export default Nutriments;