import { FETCH_BEGIN, FETCH_FAILURE, FETCH_SUCCESS,UPDATE_SURVEY } from './actions';

const EmployeeReducer = (state = {emp : [], count: 0}, { type, payload }) => {
	switch (type) {
		case FETCH_SUCCESS:
            let newstate = {...state, fetched: (payload.data[1] == "survey")? true : false}
            newstate[payload.data[1]] = payload.data[0]
			return newstate

		case FETCH_BEGIN:
            return { ...state, emp: [], fetched : false };
            
		case FETCH_FAILURE:
            return { ...state, emp: [], fetched: false };
            
        case UPDATE_SURVEY:
            let surveys = [...state.survey]
            for(let i = 0; i< surveys.length;i++){
                if(surveys[i]._id == payload.data._id){
                    surveys[i] = payload.data
                    break
                }
            }
            return {...state,survey:surveys,fetched:true}

		default:
			return state;
	}
};

export default EmployeeReducer;
