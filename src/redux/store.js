//To avoid "createStore deprecated" message, legacy_creatStore was used
import { legacy_createStore as createStore, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducers';
import { composeWithDevTools } from 'redux-devtools-extension';


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
