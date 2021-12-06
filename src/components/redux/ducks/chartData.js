//actionTypes
const SET_YEAR = "SET_YEAR"
const SET_GOAL = "SET_GOAL"
const SET_CHART = "SET_CHART"
const SET_MAP = "SET_MAP"

//actions
export const setYear =(year)=>({
    type: SET_YEAR,
    year
})

export const setGoal = (goal) => ({
    type: SET_GOAL,
    goal
})

export const setMap = (mapDataValues) => ({
    type: SET_MAP,
    mapDataValues
})


export const setChart = (chartDataValues) => ({
    type: SET_CHART,
    chartDataValues
})

//initial state values
const initialState = {
    year: undefined,
    goal: undefined,
    chartDataValues: undefined,
    statesAndUT: {
        "Andhra Pradesh": "STATE",
        "Arunachal Pradesh": "STATE",
        "Assam":"STATE",
        "Bihar":"STATE",
        "Chhattisgarh":"STATE",
        "Goa":"STATE",
        "Gujarat":"STATE",
        "Haryana":"STATE",
        "Himachal Pradesh": "STATE",
        "Jharkhand":"STATE",
        "Karnataka": "STATE",
        "Kerala":"STATE",
        "Madhya Pradesh":"STATE",
        "Maharashtra":"STATE",
        "Manipur":"STATE",
        "Meghalaya":"STATE",
        "Mizoram":"STATE",
        "Nagaland":"STATE",
        "Odisha":"STATE",
        "Punjab":"STATE",
        "Rajasthan":"STATE",
        "Sikkim":"STATE",
        "Tamil Nadu":"STATE",
        "Telangana":"STATE",
        "Tripura":"STATE",
        "Uttar Pradesh":"STATE",
        "Uttarakhand":"STATE",
        "West Bengal":"STATE",
        "Andaman and Nicobar Islands": "UT",
        "Chandigarh": "UT",
        "Dadra and Nagar Haveli":"UT",
        "Daman and Diu":"UT",
        "Delhi": "UT",
        "Jammu and Kashmir": "UT",
        "Ladakh": "UT",
        "Lakshadweep":"UT",
        "Puducherry":"UT",
    },
    // unionTerritories : {
    //     "Andaman and Nicobar Islands": "IND035",
    //     "Chandigarh": "IND004",
    //     "Dadra and Nagar Haveli":"IND026",
    //     "Daman and Diu":"IND025",
    //     "Delhi": "IND007",
    //     "Jammu and Kashmir": "IND001",
    //     "Ladakh": "IND037",
    //     "Lakshadweep":"IND031",
    //     "Puducherry":"IND034",
    // }
}

export default (state=initialState, action) => {
    switch (action.type) {
        case SET_YEAR:
            // console.log(action.year)
            return action.year = undefined ? {...state, chartDataValues:undefined} : {...state, year: action.year}

        case SET_GOAL:
            // console.log(action.goal)
            return action.goal = undefined ? {...state, chartDataValues:undefined} : {...state, goal: action.goal}

        case SET_CHART:
            console.log(action.chartDataValues)
            return action.chartDataValues = undefined ? state : {...state, chartDataValues: action.chartDataValues}

        case SET_MAP:
            console.log(action.mapDataValues)
            return action.mapDataValues = undefined ? state : {...state, mapDataValues: action.mapDataValues}

        default:
            return state
    }
}