import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const Chart = ({ typeOfChart, sessions }) => {

    const [data, setData] = useState([sessions])

    useEffect(() => {
        sessions.map((session, index) => {
            setData(state => [...state, { name: index, day: session.day, kg: session.kilogram, Kcal: session.calories }])
        })
    }, [])

    const displayChart = (typeOfChart) => {
        switch (typeOfChart) {
            case 'bar':
                return (
                    <div className='bar-chart'>
                        <h3>Activité quotidienne</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data}

                            >
                                <CartesianGrid strokeDasharray="2" vertical={false} />
                                <XAxis dataKey="name" tick={{ fill: '#9B9EAC', fontSize: '14px', fontWeight: 500 }} />
                                <YAxis orientation='right' interval={1} tick={{ fill: '#9B9EAC', fontSize: '14px', fontWeight: 500 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend iconType='circle' verticalAlign='top' iconSize={8} fontSize={14} wrapperStyle={{ top: "-50px", fontSize: "14px", fontWeight: 500 }} align='right' formatter={(value, entry, index) => <span className="grey-text">{value}</span>} />
                                <Bar name='Poids (kg)' dataKey="kg" fill="#282D30" radius={[5, 5, 0, 0]} barSize={7} />
                                <Bar name='Calories brûlées (kCal)' dataKey="Kcal" fill="#E60000" radius={[5, 5, 0, 0]} barSize={7} margin={{ top: 0, right: 4, bottom: 0, left: 4 }} />

                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )

            default:
                break;
        }
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip__activity">
                    <p>{`${payload[0].value}kg`}</p>
                    <p>{`${payload[1].value}Kcal`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <>
            {displayChart(typeOfChart)}
        </>
    );
};

export default Chart;