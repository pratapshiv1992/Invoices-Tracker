import React from 'react';
import Navbar from './Navbar'

import { 
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';


const MyComponent  = (props) =><h1><br/> <br/>{props.text}</h1>
const App = (props) => (
    <>
      <Navbar />
      <Switch>
        <Route path='/' exact component={(props)=> <MyComponent text=" Invoice Listing" {...props} />} />
        <Route path='/add-invoice' exact component={(props)=> <MyComponent text="Add Invoice" {...props} />}  />
        <Route path='/about-developer' exact component={(props)=> <MyComponent text="Developer Introduction" {...props} />} />
        <Redirect to="/" />
      </Switch>
    </>
  );
  
export default App;
