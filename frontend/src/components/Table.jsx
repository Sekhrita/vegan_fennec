import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment-timezone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table = () => {
    const [data, setData] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [minThreshold, setMinThreshold] = useState(0);
    const [maxThreshold, setMaxThreshold] = useState(1);

    const fetchData = () => {
        if (startDate && endDate) {
            axios.get(`http://localhost:8000/vegan_fennec/influxdata/?start_date=${(new Date(startDate)).toISOString()}&end_date=${(new Date(endDate)).toISOString()}&min_threshold=${minThreshold}&max_threshold=${maxThreshold}`)
                .then(response => {
                    setData(response.data.data);
                    setAlerts(response.data.alerts);
                })
                .catch(error => {
                    console.error("Error fetching the data: ", error);
                });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        alerts.forEach(alert => {
            toast.error(`Alerta: Valor ${alert.value} fuera del rango en ${moment(alert.time).format('YYYY-MM-DD HH:mm:ss')}`);
        });
    }, [alerts]);

    const formatDate = (timestamp) => {
        if (!timestamp) {
            return "No disponible";
        } else {
            return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
        }
    };

    const isOutOfRange = (value) => {
        return value < minThreshold || value > maxThreshold;
    };

    return (
        <div>
            <ToastContainer />
            <h1 className="mb-5">Soil Moisture Data</h1>
            <div className="bg-green-950 border-4 border-green-700 p-2 m-1 mb-3">
                <label>
                    Start Date:
                    <input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                <label>
                    Min Threshold:
                    <input
                        type="number"
                        value={minThreshold}
                        onChange={(e) => setMinThreshold(e.target.value)}
                    />
                </label>
                <label>
                    Max Threshold:
                    <input
                        type="number"
                        value={maxThreshold}
                        onChange={(e) => setMaxThreshold(e.target.value)}
                    />
                </label>
                <button onClick={fetchData}>Fetch Data</button>
            </div>

            <div className='min-w-full py-2 align-middle inline-block'>
                <div className='overflow-hidden shadow ring-1 ring-gray-800 ring-opacity-1 rounded-lg hidden md:flex md:flex-col'>
                    <table className='min-w-full divide-y divide-gray-800'>
                        <thead className='bg-gray-900'>
                            <tr>
                                <th scope='col' className='text-md p-3 tracking-wide text-left'>MEASUREMENT</th>
                                <th scope='col' className='text-md p-3 tracking-wide text-left'>TYPE</th>
                                <th scope='col' className='text-md p-3 tracking-wide text-left'>FIELD</th>
                                <th scope='col' className='text-md p-3 tracking-wide text-left'>VALUE</th>
                                <th scope='col' className='text-md p-3 tracking-wide text-left'>TIMESTAMP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td scope='col' className={`text-md p-3 tracking-wide text-left ${isOutOfRange(item.value) ? 'bg-red-900' : 'bg-gray-900'}`}>{item.measurement}</td>
                                    <td scope='col' className={`text-md p-3 tracking-wide text-left ${isOutOfRange(item.value) ? 'bg-red-900' : 'bg-gray-900'}`}>{item.soil_type}</td>
                                    <td scope='col' className={`text-md p-3 tracking-wide text-left ${isOutOfRange(item.value) ? 'bg-red-900' : 'bg-gray-900'}`}>{item.field}</td>
                                    <td scope='col' className={`text-md p-3 tracking-wide text-left ${isOutOfRange(item.value) ? 'bg-red-900' : 'bg-gray-900'}`}>{item.value}</td>
                                    <td scope='col' className={`text-md p-3 tracking-wide text-left ${isOutOfRange(item.value) ? 'bg-red-900' : 'bg-gray-900'}`}>{formatDate(item.time)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;
