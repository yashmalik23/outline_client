import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import EmployeeReducer from './reducer'

const store = createStore(EmployeeReducer, applyMiddleware(thunk))

export default store