//actionTypes
const SET_YEAR = "SET_YEAR"
const SET_GOAL = "SET_GOAL"
const SET_CHART = "SET_CHART"

//actions
export const setYear =(year)=>({
    type: SET_YEAR,
    year
})

export const setGoal = (goal) => ({
    type: SET_GOAL,
    goal
})

export const setChart = (chartDataValues) => ({
    type: SET_CHART,
    chartDataValues
})

//initial state values
const initialState = {
    year: undefined,
    goal: undefined,
    chartDataValues: undefined
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

        default:
            return state
    }
}