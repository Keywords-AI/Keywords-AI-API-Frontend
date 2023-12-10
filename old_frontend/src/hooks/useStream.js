import { useState } from 'react';
import apiConfig from 'src/services/apiConfig';
import { getCookie } from 'src/services/getCookie';

const useStream = (path, method="POST", handleError, apiKey) => {
    // generic hook for posting data to apis
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const postData = async (postData) => {
        setLoading(true);
        setError(null);
        setResponse(null);
        try {
            const response = await fetch(apiConfig.apiURL + path, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie("csrftoken"),
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
                body: JSON.stringify(postData),
            });
            if (!response.ok) {
                    const responseJson = await response.json();
                    console.log(responseJson);
                    setError(responseJson);
                    handleError(responseJson);
            }
            setResponse(response);
        } catch (error) {
            setError(error.message);
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, response, postData };
};

export default useStream;