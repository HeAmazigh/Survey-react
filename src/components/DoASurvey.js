import React from "react";
import axios from 'axios';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import { useAuth0 } from "../react-auth0-spa";

const DoASurvey = () => {
    const { user } = useAuth0();

    let surveyJSON = {
        "pages": [{
            "name": "page1",
            "elements": [{
                    "type": "text",
                    "name": "What is your name ?",
                    "isRequired": true,
                    "placeHolder": "Name"
                },
                {
                    "type": "dropdown",
                    "name": "Whesh language you speek ?",
                    "isRequired": true,
                    "choices": [{
                            "value": "item1",
                            "text": "Anglish"
                        },
                        {
                            "value": "item2",
                            "text": "Kabyle"
                        },
                        {
                            "value": "item3",
                            "text": "French"
                        }
                    ],
                    "choicesMin": 1
                }
            ]
        }]
    }

    localStorage.setItem('userEmail', user.email);

    const sendDataToServer = async (survey) => {
        try {
            const res = await axios.post('http://localhost:5000/survey', {
                data: survey.data,
                email: user.email
            });
            console.log('front ',res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Survey.Survey json={ surveyJSON } onComplete={sendDataToServer} />
        </div>
    );
};

export default DoASurvey;