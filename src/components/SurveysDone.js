import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useAuth0 } from "../react-auth0-spa";
import {Line} from 'react-chartjs-2';

const SurveyDone = () => {
    const [survey, setSurvey] = useState([]);
    const { user } = useAuth0();

    useEffect(() => {
        const survey = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/${user.email}/survey`);
                setSurvey(res.data);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };
        survey();
    }, [user]);

    const lineChart = (
        <Line
            data={{
                labels: survey.map(({ language }) => language),
                datasets: [
                    {
                        data: survey.map(({ rating }) => rating),
                        label: 'statistic',
                        borderColor: '#3333ff',
                        fill: true,
                    },
                ],
            }}
        />
    );

    if (!survey) {
        return (
            <h1>Nowthing !</h1>
        );
    }

    return (
        <>
        <div>
            {survey.map((sur, index) => {
                return (
                    <ul key={index}>
                        <li> {sur.firstname} </li>
                        <li> {sur.language} </li>
                        <li> {sur.rating} </li>
                    </ul>
                )
            })}
        </div>
        <div style={{width: "50%"}} >
            {lineChart}
        </div>
        </>
    );
}

export default SurveyDone;