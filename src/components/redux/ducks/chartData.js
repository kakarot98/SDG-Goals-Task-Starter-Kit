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
    states: {
        "Andhra Pradesh": "IND028",
        "Arunachal Pradesh": "IND012",
        "Assam":"IND018",
        "Bihar":"IND010",
        "Chhattisgarh":"IND022",
        "Goa":"IND030",
        "Gujarat":"IND024",
        "Haryana":"IND006",
        "Himachal Pradesh": "IND002",
        "Jharkhand":"IND020",
        "Karnataka": "IND029",
        "Kerala":"IND032",
        "Madhya Pradesh":"IND023",
        "Maharashtra":"IND027",
        "Manipur":"IND014",
        "Meghalaya":"IND017",
        "Mizoram":"IND015",
        "Nagaland":"IND013",
        "Odisha":"IND021",
        "Punjab":"IND003",
        "Rajasthan":"IND008",
        "Sikkim":"IND011",
        "Tamil Nadu":"IND033",
        "Telangana":"IND036",
        "Tripura":"IND016",
        "Uttar Pradesh":"IND009",
        "Uttarakhand":"IND005",
        "West Bengal":"IND019"
    },
    unionTerritories : {
        "Andaman and Nicobar Islands": "IND035",
        "Chandigarh": "IND004",
        "Dadra and Nagar Haveli":"IND026",
        "Daman and Diu":"IND025",
        "Delhi": "IND007",
        "Jammu and Kashmir": "IND001",
        "Ladakh": "IND037",
        "Lakshadweep":"IND031",
        "Puducherry":"IND034",
    }
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