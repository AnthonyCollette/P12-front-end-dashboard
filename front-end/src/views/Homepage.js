import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

const Homepage = ({mocked, setMocked}) => {

    const [firstUserData, setFirstUserData] = useState(null);
    const [secondUserData, setSecondUserData] = useState(null);

    const handleDataClick = (data) => {
        if (data === 'api') {
            setMocked(false);
        }
        if (data === 'locales') {
            setMocked(true);
        }
    }

    const displaySelectedData = () => {
        if (mocked !== null) {
            if (mocked === true) {
                return <h3>Vous avez choisi <span>les données locales !</span></h3>
            }
            if (mocked === false) {
                return <h3>Vous avez choisi <span>les données de l'API !</span></h3>
            }
        }
    }

    const displaySelectUser = () => {
        if (mocked !== null) {
            if (mocked === true) {
                return <>
                    <h2>Merci de choisir un utilisateur</h2>
                    <Link to="/user/12">Karl Mocked</Link>
                    <Link to="/user/18">Mocky Ratorez</Link>
                </>
            }
            if (mocked === false && firstUserData !== null && secondUserData !== null) {
                return <>
                    <h2>Merci de choisir un utilisateur</h2>
                    <Link to="/user/12">{firstUserData?.userInfos?.firstName} {firstUserData?.userInfos?.lastName}</Link>
                    <Link to="/user/18">{secondUserData?.userInfos?.firstName} {secondUserData?.userInfos?.lastName}</Link>
                </>
            }
        }
    }

    const getFirstUserData = () => {
        axios.get('http://localhost:3000/user/12').then((res) => setFirstUserData(res.data.data))
        axios.get('http://localhost:3000/user/18').then((res) => setSecondUserData(res.data.data))
    }

    useEffect(() => {
        getFirstUserData()
    }, [])

    return (
        <div className='homepage'>
            <Header />
            <Sidebar />
            <main>
                <h1>Bonjour !</h1>
                <div className='data-selector'>
                    <h2>Souhaitez-vous les données de l'Api ou les données locales ?</h2>
                    <button onClick={() => handleDataClick('api')}>API</button>
                    <button onClick={() => handleDataClick('locales')} >Locales</button>
                    {displaySelectedData()}
                </div>
                <div className='user-selector'>
                    {displaySelectUser()}
                </div>
            </main>
        </div>
    );
};

export default Homepage;