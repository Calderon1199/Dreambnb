import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ContentCard from "./components/ContentCard";
import SpotDetails from "./components/SpotDetails";
import SpotForm from "./components/SpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path="/">
          <ContentCard />
        </Route>
        <Route path="/spots/new" >
          <SpotForm />
        </Route>
        <Route path="/spots/:spotId" >
          <SpotDetails />
        </Route>
        </Switch>}
    </>
  );
}

export default App;
