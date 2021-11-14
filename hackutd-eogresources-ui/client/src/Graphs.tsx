import React from 'react';
import { ServerResponse } from './optimization';
import {
    LineChart, Line,
    XAxis, YAxis,
    CartesianGrid, Tooltip,
    Legend
} from 'recharts';

type GraphProp = {
    resultList: ServerResponse[],
};

function Graph({ resultList }: GraphProp) {

    const renderIncrementalRevenue = (
        <LineChart
            width={500}
            height={300}
            data={resultList}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="incrementalRevenue" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="incrementalRevenue" stroke="#8884d8" activeDot={{ r: 8 }} dot={{ r: 1 }} />
        </LineChart>
    );

    const renderFlowRateIn = (
        <LineChart
            width={500}
            height={300}
            data={resultList}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="flowRateIn" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="flowRateIn" stroke="#82ca9d" dot={{ r: 1 }} />
        </LineChart>
    );

    const renderPitChart = (
        <LineChart
            width={500}
            height={300}
            data={resultList}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="currentPitVolume" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="currentPitVolume" stroke="#8884d8" activeDot={{ r: 8 }} dot={{ r: 1 }} />
        </LineChart>
    );

    const renderRevenuePerDay = (
        <LineChart
            width={500}
            height={300}
            data={resultList}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="revenuePerDay" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenuePerDay" stroke="#8884d8" activeDot={{ r: 8 }} dot={{ r: 1 }} />
        </LineChart>
    );

    const renderFlowRateToOperations = (
        <LineChart
            width={500}
            height={300}
            data={resultList}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="flowRateToOperations" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="flowRateToOperations" stroke="#8884d8" activeDot={{ r: 8 }} dot={{ r: 1 }} />
        </LineChart>
    );

    const renderMaximizedOutput = (
        <LineChart
            width={500}
            height={300}
            data={resultList}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="maximized_output" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="maximized_output" stroke="#8884d8" activeDot={{ r: 8 }} dot={{ r: 1 }} />
        </LineChart>
    );

    return (
        <div>

            <div style={{ paddingTop: 20 }}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            {renderIncrementalRevenue}
                        </div>
                        <div className="col">
                            {renderFlowRateIn}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {renderPitChart}
                        </div>
                        <div className="col">
                            {renderRevenuePerDay}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        {renderFlowRateToOperations}
                        </div>
                        <div className="col">
                            {renderMaximizedOutput}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Graph;
