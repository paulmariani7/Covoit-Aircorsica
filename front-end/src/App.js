import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import './App.css';
import Home from './views/home';
import Chat from './views/chat';
import Login from './views/login';
function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path='/home' exact>
        <Home/>
      </Route>
      <Route path='/chat' exact>
        <Chat/> 
      </Route>
      <Route path={['/','/login']}>
        <Login/> 
      </Route>
    </Switch>
    </BrowserRouter>
    
  );
}

export default App;
