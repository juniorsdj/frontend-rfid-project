import React, { useEffect } from 'react';
import Routes from './routes';
import { useDispatch } from 'react-redux';
import { checkToken } from './actions/systemActions';

// import { ptBR} from 'date-fns/locale'

import './styles/global.css';
import 'semantic-ui-css/semantic.min.css'


export default function App() {
const dispatch = useDispatch()

useEffect(() => {
  dispatch(checkToken())
  
}, [])
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

