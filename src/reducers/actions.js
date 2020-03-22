const api = 'http://localhost:6969/';

function getData(model) {
	return fetch(api + model).then(handleErrors).then((res) => {
		return res.json();
	});
}

function updateSurvey(data) {
	return fetch(api + 'survey', {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(handleErrors)
		.then((res) => {
			return res.json();
		});
}

export function fetchData(model) {
	return (dispatch) => {
		dispatch(fetchBegin());
		return getData(model)
			.then((res) => {
				dispatch(fetchSuccess([ res, model ]));
				return res;
			})
			.catch((error) => dispatch(fetchFailure(error)));
	};
}

export function updateData(data) {
	return (dispatch) => {
		return updateSurvey(data)
			.then((res) => dispatch(updateSuccess(res)))
			.catch((error) => dispatch(fetchFailure(error)));
	};
}

function handleErrors(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

export const FETCH_BEGIN = 'FETCH_BEGIN';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const UPDATE_SURVEY = 'UPDATE_SURVEY';

export const fetchBegin = () => ({
	type: FETCH_BEGIN
});

export const fetchSuccess = (data) => ({
	type: FETCH_SUCCESS,
	payload: { data }
});
export const updateSuccess = (data) => ({
	type: UPDATE_SURVEY,
	payload: { data }
});

export const fetchFailure = (error) => ({
	type: FETCH_FAILURE,
	payload: { error }
});
