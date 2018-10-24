import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

//TODO: Split the files

// Initial state
const initialState = {
  email: '', password: '', errorMessage: null
}

// Reducer
const reducer = (state = initialState, action) => {

}

// Store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };
