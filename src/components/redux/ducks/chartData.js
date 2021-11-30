//actionTypes
const SET_YEAR = "SET_YEAR"
const SET_GOAL = "SET_GOAL"

//actions
export const setYear =(year)=>({
    type: SET_YEAR,
    year
})

export const setGoal = (goal) => ({
    type: SET_GOAL,
    goal
})

//initial state values
const initialState = {
    year: undefined,
    goal: undefined
}

export default (state=initialState, action) => {
    switch (action.type) {
        case SET_YEAR:
            console.log(action.year)
            return action.year = undefined ? state : {...state, year: action.year}

        case SET_GOAL:
            console.log(action.goal)
            return action.goal = undefined ? state : {...state, goal: action.goal}

        default:
            return state
    }
}