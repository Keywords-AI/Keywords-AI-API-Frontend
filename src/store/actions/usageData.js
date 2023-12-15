import apiConfig from 'src/services/apiConfig';
import { getDateStr } from '../../utilities/stringProcessing';
import { retrieveAccessToken } from "src/utilities/authorization";

const formatData = (datalist) => {
    const formattedData = [];
    for (var i = 0; i < datalist.length; i++) {
        const data = datalist[i];
        formattedData.push({
            name: getDateStr(data?.date),
            usage: data?.total_cost,
        });
    }
    return formattedData;
}

export const fetchUsageData = (month) => {
    return async (dispatch) => {
        const response = await fetch(`${apiConfig.apiURL}api/get-usage?month=${month}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${retrieveAccessToken()}`,
            }
        });
        const data = await response.json();
        const formattedData = formatData(data);
        dispatch({
            type: 'FETCH_USAGE_DATA',
            payload: formattedData,
        });
        
    };
};