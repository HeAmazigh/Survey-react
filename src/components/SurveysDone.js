import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useAuth0 } from "../react-auth0-spa";

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

    return (
        <div>
            {survey.map((sur, index) => {
                return (
                    <ul key={index}>
                        <li> {JSON.stringify(sur)} </li>
                    </ul>
                )
            })}
        </div>
    );
}

export default SurveyDone;