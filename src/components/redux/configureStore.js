import { combineReducers, createStore } from "redux";
import chartDataReducer from './ducks/chartData'

const reducers = combineReducers({
    chartData: chartDataReducer
})

const store = createStore(reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store