import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ContentCard from "./components/ContentCard";
import SpotDetails from "./components/SpotDetails";
import SpotForm from "./components/SpotForm";
import EditSpotForm from "./components/EditSpotForm";
import CurrentSpots from "./components/CurrentSpots";
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
        <Route exact path="/spots/new" >
          <SpotForm />
        </Route>
        <Route exact path="/spots/user" >
          <CurrentSpots />
        </Route>
        <Route exact path="/spots/:spotId/edit" >
          <EditSpotForm />
        </Route>
        <Route exact path="/spots/:spotId" >
          <SpotDetails />
        </Route>
        </Switch>}
    </>
  );
}

export default App;
