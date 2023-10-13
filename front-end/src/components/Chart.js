import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const Chart = ({typeOfChart}) => {

    const data = [
        {
            name: '1',
            kg: 4000,
            Kcal: 2400,
        },
        {
            name: '2',
            kg: 3000,
            Kcal: 1398,
        },
        {
            name: '3',
            kg: 2000,
            Kcal: 9800,
        },
        {
            name: '4',
            kg: 2780,
            Kcal: 3908,
        },
        {
            name: '5',
            kg: 1890,
            Kcal: 4800,
        },
        {
            name: '6',
            kg: 2390,
            Kcal: 3800,
        },
        {
            name: '7',
            kg: 3490,
            Kcal: 4300,
        },
        {
            name: '8',
            kg: 3490,
            Kcal: 4300,
        },
        {
            name: '9',
            kg: 3490,
            Kcal: 4300,
        },
        {
            name: '10',
            kg: 3490,
            Kcal: 4300,
        },
    ];

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
                                <XAxis dataKey="name" tick={{fill: '#9B9EAC', fontSize: '14px', fontWeight: 500}} />
                                <YAxis orientation='right' interval={1} tick={{fill: '#9B9EAC', fontSize: '14px', fontWeight: 500}} />
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