import React from 'react';
import { 
    Route,
    Link,
    Switch,
    Redirect,
} from 'react-router-dom';

const App = () => (
    <>
      <Link to="/">Invoice Listing</Link>
      <Link to="add-invoice">Add Invoice</Link>
      <Link to="about-developer">About Developer</Link>
      <Switch>
        <Route path="/" exact component={()=><h1><br/> <br/>This is invoice listing. </h1>} />
        <Route
          path="/add-invoice"
          exact
          component={() => <h1><br/> <br/>This is add invoice . </h1>}
        />
        <Route
          path="/about-developer"
          exact
          component={() => <h1><br/> <br/>My introduction. </h1>}
        />
        <Redirect to="/" />
      </Switch>
    </>
  );
  
  


export default App;