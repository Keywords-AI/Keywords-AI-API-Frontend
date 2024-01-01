import { keywordsFetch } from "src/services/apiConfig";
import { sliceChartData,formatDate } from "src/utilities/objectProcessing";
export const GET_DASHBOARD_DATA = "GET_DASHBOARD_DATA";
export const SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA";
export const SET_COST_DATA = "SET_COST_DATA";
export const SET_TOKEN_COUNT_DATA = "SET_TOKEN_COUNT_DATA";
export const SET_LATENCY_DATA = "SET_LATENCY_DATA";
export const SET_REQUEST_COUNT_DATA = "SET_REQUEST_COUNT_DATA";
export const SET_DATE_DATA = "SET_DATE_DATA";

// export const aggregateData = (data, timePeriod) => {
//   const formattedData = [];
//   data.forEach(item => {
    
//     switch (timePeriod) {
//       case 'daily':
        
//         break;
//       case 'weekly':
        
//         break;
//       case 'monthly':
        
//         break;
//       case 'yearly':
//         // dateGroup = date.startOf('year').format('YYYY-MM-DD');
//         break;
//       default:
//         dateGroup = date.format('YYYY-MM-DD');
//     }

//     if (!groupedData[dateGroup]) {
//       // groupedData[dateGroup] = { ...item, [dateKey]: dateGroup, [valueKey]: 0 };
//     }
//     // groupedData[dateGroup][valueKey] += item[valueKey];
//   });

//   return Object.values(groupedData);
// };


export const setDashboardData = (data) => {
  return {
    type: SET_DASHBOARD_DATA,
    payload: data,
  };
};

export const setCostData = (data) => {
  return {
    type: SET_COST_DATA,
    payload: data,
  };
}

export const setTokenCountData = (data) => {
  return {
    type: SET_TOKEN_COUNT_DATA,
    payload: data,
  };
}

export const setLatencyData = (data) => {
  return {
    type: SET_LATENCY_DATA,
    payload: data,
  };
}

export const setRequestCountData = (data) => {
  return {
    type: SET_REQUEST_COUNT_DATA,
    payload: data,
  };
}

export const setDateData = (data) => {
  return {
    type: SET_DATE_DATA,
    payload: data, 
  };
}

export const getDashboardData = () => {
  return (dispatch) => {
    const params=new URLSearchParams(window.location.search);
    const date = new Date();
    params.set("date", date.toLocaleDateString()); // format: MM/DD/YYYY
    // Yes, Fuck JS. They don't provide native formatter to convert to YYYY-mm-dd

    keywordsFetch({
      path: `api/dashboard?${params.toString()}`,
  })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        } else {
          return response.json();
          
        }
      })
      .then((data) => {
        dispatch(setDashboardData(data));
        const dataList = fillMissingDate(data?.data, params.get("summary_type"));
        console.log("here, ", dataList);
        dispatch(setCostData(sliceChartData(dataList, "date_group", "total_cost")));
        dispatch(setTokenCountData(sliceChartData(dataList, "date_group", "total_tokens")));
        dispatch(setLatencyData(sliceChartData(dataList, "date_group", "average_latency")));
        dispatch(setRequestCountData(sliceChartData(dataList, "date_group", "number_of_requests")));
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};

export const fillMissingDate = (data, dateGroup) => {
  console.log("date: ", dateGroup);
    //Date group is data grouped by summary type
    //Filtered by "daily": one date_group is requests summed across hours
    //All the request data aggregated by hours across the day
    const newDataArray = [];
    switch (dateGroup) {
      
      case "daily":
        Array.from({length:24}).map((_, hour)=> {
          const dataPiece = data.find(dataPiece=>  {         
            return dataPiece.date_group === hour
          })
          if (dataPiece) {
            newDataArray.push({
              ...dataPiece,
              date_group: `${hour}:00`,
            });
          } else {
            newDataArray.push({
              date_group: `${hour}:00`,
              number_of_requests: 0,
              total_cost: 0,
              total_tokens: 0,
              average_latency: 0,
            })
          }

        })

        break;
        case "weekly": // ????
          const today = new Date();
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));

          Array.from({length:7}).map((_, day)=> {
            const dayDate = new Date(startOfWeek);
            dayDate.setDate(startOfWeek.getDate() + day);
            // const dayDate = new Date(today);
            // dayDate.setDate(today.getDate() - 6 + day);

            const dayOfMonth = dayDate.getDate();

            const dataPiece = data.find(dataPiece=>  {         
              return new Date(dataPiece.date_group).getDate() === dayOfMonth;
            })
            if (dataPiece) {
              newDataArray.push({
                ...dataPiece,
                date_group: dayOfMonth,
              });
            } else {
            newDataArray.push({
              date_group: dayOfMonth,
              number_of_requests: 0,
              total_cost: 0,
              total_tokens: 0,
              average_latency: 0,
            })
          }
          })
          break;
          case "monthly":
            Array.from({length:31}).map((_, day)=> {
              const dataPiece = data.find(dataPiece=>  {         
                return dataPiece.date_group === (day+1)
              })
              if (dataPiece) {
                newDataArray.push({
                  ...dataPiece,
                  date_group: `${day+1}`,
                });
              } else {
                newDataArray.push({
                date_group: `${day + 1}`,
                number_of_requests: 0,
                total_cost: 0,
                total_tokens: 0,
                average_latency: 0,
              })
            }
            })
            break;
            case "yearly":
              Array.from({length:12}).map((_, month)=> {
                const dataPiece = data.find(dataPiece=>  {         
                  return dataPiece.date_group === (month+1)
                })
                if (dataPiece) {
                  newDataArray.push({
                    ...dataPiece,
                    date_group: `${month+1}`,
                  });
                } else {
                  newDataArray.push({
                  date_group: `${month + 1}`,
                  number_of_requests: 0,
                  total_cost: 0,
                  total_tokens: 0,
                  average_latency: 0,
                })
              }
              })
              break;
              default:
                Array.from({length:24}).map((_, hour)=> {
                  const dataPiece = data.find(dataPiece=>  {         
                    return dataPiece.date_group === hour
                  })
                  if (dataPiece) {
                    newDataArray.push({
                      ...dataPiece,
                      date_group: `${hour}:00`,
                    });
                  } else {
                    newDataArray.push({
                      date_group: `${hour}:00`,
                      number_of_requests: 0,
                      total_cost: 0,
                      total_tokens: 0,
                      average_latency: 0,
                    })
                  }
        
                })
              
    }
    return newDataArray;
}
