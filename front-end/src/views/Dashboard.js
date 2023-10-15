import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Nutriments from '../components/Nutriments';
import Chart from '../components/Chart';
import mockedData from '../data/data';
import { useParams } from 'react-router-dom';

const Dashboard = ({ mocked }) => {

    const navigate = useNavigate();
    const { id } = useParams()
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (mocked) {
            const mainData = mockedData.USER_MAIN_DATA.find(user => user.id == id)
            const activity = mockedData.USER_ACTIVITY.find(user => user.userId == id)
            const averageSessions = mockedData.USER_AVERAGE_SESSIONS.find(user => user.userId == id)
            const performance = mockedData.USER_PERFORMANCE.find(user => user.userId == id)
            setUserData({ mainData, activity, averageSessions, performance })
        }
        if (!mocked) {
            const mainData = axios.get(`http://localhost:3000/user/${id}`).then(res => res.data.data)
            const activity = axios.get(`http://localhost:3000/user/${id}/activity`).then(res => res.data.data)
            const averageSessions = axios.get(`http://localhost:3000/user/${id}/average-sessions`).then(res => res.data.data)
            const performance = axios.get(`http://localhost:3000/user/${id}/performance`).then(res => res.data.data)
            Promise.all([mainData, activity, averageSessions, performance]).then((res) => {
                setUserData({mainData: res[0], activity: res[1], averageSessions: res[2], performance: res[3]})
            })
        }
    }, [])

    useEffect(() => {
        if (mocked === null) {
            navigate('/');
        }
    }, [mocked])

    useEffect(() => {
        if (userData !== null && userData !== undefined) {
            setLoading(false)
        }
    }, [userData])

    return (
        <div className='homepage'>
            <Header />
            <Sidebar />
            <div className='container'>
                {!loading && <h1>Bonjour <span>{userData?.mainData?.userInfos?.firstName}</span></h1>}
                <h2>Félicitation ! Vous avez explosé vos objectifs hier 👏</h2>
                <div className='row'>
                    {!loading && <section className='charts'>
                        <div className='upper-chart'>
                            <Chart typeOfChart='bar' content={userData?.activity?.sessions} />
                        </div>
                        <div className='lower-charts'>
                            <Chart typeOfChart="line" content={userData?.averageSessions?.sessions} />
                            <Chart typeOfChart="radar" content={userData?.performance} />
                            <Chart typeOfChart="pie" content={userData?.mainData} />
                        </div>
                    </section>}
                    <section className='nutriments'>
                        {!loading && Object.entries(userData?.mainData?.keyData).map(([key, value], index) => {
                            return <Nutriments key={index} index={index} label={key} value={value} />
                        })}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;