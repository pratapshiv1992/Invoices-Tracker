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
        <Route path="/" exact componet={<>This is invoice listing. </>} />
        <Route
          path="/add-invoice"
          exact
          componet={() => <>This is add invoice . </>}
        />
        <Route
          path="/about-developer"
          exact
          componet={() => <>My introduction. </>}
        />
        <Redirect to="/" />
      </Switch>
    </>
  );
  
  


export default App;