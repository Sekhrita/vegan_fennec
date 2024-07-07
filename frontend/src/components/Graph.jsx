import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import moment from "moment-timezone";
import 'chart.js/auto';

const Graph = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [fields, setFields] = useState([]); // Estado para todos los fields disponibles
    const [selectedFields, setSelectedFields] = useState([{ id: 1, value: '' }]); // Estado para los fields seleccionados

    const fetchData = () => {
        if (startDate && endDate) {
            axios.get(`http://localhost:8000/vegan_fennec/influxdata/?start_date=${(new Date(startDate)).toISOString()}&end_date=${(new Date(endDate)).toISOString()}`)
                .then(response => {
                    const fetchedData = response.data.data;
                    setData(fetchedData);
                    const uniqueFields = [...new Set(fetchedData.map(item => item.field))];
                    setFields(uniqueFields);
                })
                .catch(error => {
                    console.error("Error fetching the data: ", error);
                });
        }
    };

    useEffect(() => {
        if (startDate && endDate) {
            fetchData();
        }
    }, [startDate, endDate]);

    const handleFieldChange = (id, value) => {
        setSelectedFields(prevSelectedFields => 
            prevSelectedFields.map(field => 
                field.id === id ? { ...field, value } : field
            )
        );
    };

    const addFieldSelector = () => {
        setSelectedFields(prevSelectedFields => [
            ...prevSelectedFields,
            { id: prevSelectedFields.length + 1, value: '' }
        ]);
    };

    const formatChartData = () => {
        const labels = [...new Set(data.map(item => moment(item.time).format('YYYY-MM-DD HH:mm:ss')))].sort();

        const datasets = selectedFields.map((field, index) => {
            const filteredData = data.filter(item => item.field === field.value);
            const values = labels.map(label => {
                const item = filteredData.find(item => moment(item.time).format('YYYY-MM-DD HH:mm:ss') === label);
                return item ? item.value : null;
            });
            return {
                label: `Soil Moisture (${field.value})`,
                data: values,
                fill: false,
                backgroundColor: `rgba(${75 + index * 30}, ${192 - index * 30}, ${192 - index * 30}, 0.4)`,
                borderColor: `rgba(${75 + index * 30}, ${192 - index * 30}, ${192 - index * 30}, 1)`,
            };
        });

        return {
            labels: labels,
            datasets: datasets,
        };
    };

    return (
        <div>
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
                {selectedFields.map((field, index) => (
                    <label key={field.id}>
                        Field {index + 1}:
                        <select value={field.value} onChange={(e) => handleFieldChange(field.id, e.target.value)}>
                            <option value="">Select a field</option>
                            {fields.map((fieldOption, index) => (
                                <option key={index} value={fieldOption}>
                                    {fieldOption}
                                </option>
                            ))}
                        </select>
                    </label>
                ))}
                <button onClick={addFieldSelector}>Add Field</button>
                <button onClick={fetchData}>Fetch Data</button>
            </div>
            <div className="bg-black p-4 rounded-lg shadow-lg">
                <Line data={formatChartData()} />
            </div>
        </div>
    );
};

export default Graph;
