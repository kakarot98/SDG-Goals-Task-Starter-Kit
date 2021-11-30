//actionTypes
const SET_YEAR = "SET_YEAR"

//actions
export const setYear =()=>({
    type: SET_YEAR
})

//initial state values
const initialState = {
    year: 0
}

export default (state=initialState, action) => {
    switch (action.type) {
        case SET_YEAR:
            const {year} = action
            console.log(year)
            return {...state, year }
        default:
            return state
    }
}