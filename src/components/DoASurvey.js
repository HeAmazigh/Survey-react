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
                    "name": "firstname",
                    "text": "First Name",
                    "isRequired": true,
                    "placeHolder": "First Name"
                },
                {
                    "type": "dropdown",
                    "name": "language",
                    "text": "language",
                    "isRequired": true,
                    "choices": [{
                            "value": "englich",
                            "text": "English"
                        },
                        {
                            "value": "kabyle",
                            "text": "Kabyle"
                        },
                        {
                            "value": "francais",
                            "text": "Francais"
                        }
                    ],
                    "choicesMin": 1
                },
                {
                    "type": "rating",
                    "name": "rating",
                    "text": "rating",
                    "isRequired": true,
                    "placeHolder": "First Name"
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