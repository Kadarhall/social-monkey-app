import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
})

// Only chrome can handle the redux dev tool
// redux compose cannot handle a null or undefined middleware
if (window.navigator.userAgent.includes('Chrome')) {
    var store = createStore(
      reducers,
      initialState,
      compose(
        applyMiddleware(
            ...middleware
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    );
  } else {
    var store = createStore(
      reducers,
      initialState,
      compose(
        applyMiddleware(
          ...middleware
        )
      )
    );
  }

export default store;