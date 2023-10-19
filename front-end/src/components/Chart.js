import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, LineChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie } from 'recharts';



const Chart = ({ typeOfChart, content }) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [YAxisMin, setYAxisMin] = useState(null)
    const [YAxisMax, setYAxisMax] = useState(null)
    const legendBarChartStyle = () => {
        if (window.clientWidth > 1200) {
            return { top: "-50px", fontSize: "14px", fontWeight: 500 }
        } else {
            return { top: "-20px", fontSize: "14px", fontWeight: 500 }
        }
    }

    let allKg = []
    let allKcal = []

    let displayRadar = <Radar dataKey='value' stroke='#FF0101' fill='#FF0101' fillOpacity={0.7} />

    useEffect(() => {
        if (typeOfChart === 'bar') {
            content.map((session, index) => {
                setData(state => [...state, { name: index + 1, day: session.day, kg: session.kilogram, Kcal: session.calories }])
            })
        }
        if (typeOfChart === 'line') {
            content.map((session) => {
                const day = (day) => {
                    switch (day) {
                        case 1:
                            return "L"
                        case 2:
                            return "M"
                        case 3:
                            return "M"
                        case 4:
                            return "J"
                        case 5:
                            return "V"
                        case 6:
                            return "S"
                        case 7:
                            return "D"
                        default:
                            break;
                    }
                }
                setData(state => [...state, { name: day(session.day), min: session.sessionLength }])
            })
        }
        if (typeOfChart === 'radar') {
            const getKind = (number) => {
                switch (number) {
                    case 1:
                        return 'Cardio'
                    case 2:
                        return 'Energie'
                    case 3:
                        return 'Endurance'
                    case 4:
                        return 'Force'
                    case 5:
                        return 'Vitesse'
                    case 6:
                        return 'Intensité'
                    default:
                        break;
                }
            }
            content.data.sort((a, b) => a.value - b.value).map((session) => {
                setData(state => [...state, { value: session.value, kind: getKind(session.kind) }])
            })
        }
        if (typeOfChart === 'pie') {
            if (content.score !== undefined) {
                setData([{ value: content.score * 100, fill: '#FF0101' }, { value: 100 - content.score * 100, fill: '#FFFFFF' }])
            }
            if (content.todayScore !== undefined) {
                setData([{ value: content.todayScore * 100, fill: '#FF0101' }, { value: 100 - content.todayScore * 100, fill: '#FFFFFF' }])
            }


        }
    }, [])

    useEffect(() => {

        if (typeOfChart === 'bar') {
            content.map((session) => {
                allKg.push(session.kilogram)
                allKcal.push(session.calories)
            })
            allKg.sort((a, b) => a - b)
            setYAxisMin(allKg[0])
            setYAxisMax(allKcal[allKcal.length - 1])
        }

        if (typeOfChart === 'radar' && data.length > 0) {
            displayRadar = () => <Radar dataKey='value' stroke='#FF0101' fill='#FF0101' fillOpacity={0.7} />
            setIsLoading(false)
        }

        if (typeOfChart === 'pie' && data.length > 0) {
            setIsLoading(false)
        }

    }, [data])

    useEffect(() => {
        if (YAxisMin !== null && YAxisMax !== null) {
            setIsLoading(false)
        }
    }, [YAxisMin, YAxisMax])

    const displayChart = (typeOfChart) => {
        switch (typeOfChart) {
            case 'bar':
                return (
                    <article className='bar-chart'>
                        <h3>Activité quotidienne</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 20 }} >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fill: '#9B9EAC', fontSize: '14px', fontWeight: 500 }} />
                                {!isLoading && <YAxis orientation='right' tickCount={4} tick={{ fill: '#9B9EAC', fontSize: '14px', fontWeight: 500 }} domain={[YAxisMin - 10, YAxisMax + 10]} />}
                                <Tooltip content={<CustomTooltip />} />
                                <Legend iconType='circle' verticalAlign='top' iconSize={8} wrapperStyle={legendBarChartStyle()} align='right' formatter={(value, entry, index) => <span className="grey-text">{value}</span>} />
                                <Bar name='Poids (kg)' dataKey="kg" fill="#282D30" radius={[5, 5, 0, 0]} barSize={7} />
                                <Bar name='Calories brûlées (kCal)' dataKey="Kcal" fill="#E60000" radius={[5, 5, 0, 0]} barSize={7} margin={{ top: 0, right: 4, bottom: 0, left: 4 }} />
                            </BarChart>
                        </ResponsiveContainer>
                    </article>
                )
            case 'line':
                return (
                    <article className='line-chart'>
                        <h3>Durée moyenne des sessions</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 80, right: 20, left: 20, bottom: 10 }} onMouseMove={(e) => {
                                if (e.isTooltipActive === true) {
                                    let windowWidth = document.querySelector('.line-chart').clientWidth
                                    let mouseXpercentage = Math.round(
                                        (e.activeCoordinate.x / windowWidth) * 100
                                    )
                                    document.querySelector('.line-chart').style.background = `linear-gradient(90deg, rgba(255,0,0,1) ${mouseXpercentage}%, rgba(200,0,0,1.5) ${mouseXpercentage}%, rgba(200,0,0,1.5) 100%)`
                                }
                            }}>
                                <XAxis dataKey="name" tick={{ fontSize: "12px", fontWeight: 500, fill: "#fff" }} tickLine={false} axisLine={false} />
                                <YAxis hide />
                                <Tooltip content={<CustomTooltip />} />
                                <Line type="monotone" dataKey="min" stroke="#fff" dot={false} activeDot={{ stroke: "rgba(255,255,255, 0.6)", strokeWidth: 10, r: 5 }} strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </article>
                )
            case 'radar':
                return (
                    <article className='radar-chart'>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart outerRadius={80} data={data}>
                                <PolarGrid gridType='polygon' radialLines={false} polarRadius={[0, 10, 20, 40, 60, 80]} />
                                {!isLoading ? <><PolarAngleAxis dataKey="kind" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#fff' }} />
                                    <PolarRadiusAxis angle={45} domain={[0, data[data.length - 1].value + 50]} tick={false} axisLine={false} /> </> : null}
                                {displayRadar}
                            </RadarChart>
                        </ResponsiveContainer>
                    </article>
                )
            case 'pie':
                return (!isLoading &&
                    <article className='pie-chart'>
                        <h3><span className='score'>{data[0].value}%</span> de votre objectif</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    startAngle={210}
                                    endAngle={-150}
                                    innerRadius={70}
                                    outerRadius={80}
                                    cornerRadius={50}
                                    fill="#8884d8"
                                    dataKey="value"
                                > </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </article>)


            default:
                break;
        }
    }

    const CustomTooltip = ({ active, payload }) => {
        if (typeOfChart === 'bar') {
            if (active && payload && payload.length) {
                return (
                    <div className="custom-tooltip__activity">
                        <p>{`${payload[0].value}kg`}</p>
                        <p>{`${payload[1].value}Kcal`}</p>
                    </div>
                );
            }
        }
        if (typeOfChart === 'line') {
            if (active && payload && payload.length) {
                return (
                    <div className="custom-tooltip__length">
                        <p>{`${payload[0].value}min`}</p>
                    </div>
                );
            }
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