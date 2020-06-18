import React, { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactGa from "react-ga";
import Navbar from "./components/navbar";

const Home = lazy(() => import("./components/home"));
const StateGraph = lazy(() => import("./components/stateGraph"));
const World = lazy(() => import("./components/world"));
const Options = lazy(() => import("./components/options"));
const FAQ = lazy(() => import("./components/faq"));
const NotFound = lazy(() => import("./components/notFound"));
const Notifications = lazy(() => import("./components/notifications"));
const Test = lazy(() => import("./components/test"));
const StateDetails = lazy(() => import("./components/stateDetails"));

const schemaMarkup = {
  "@context": "http://schema.org/",
  "@type": "NGO",
  name:
    "Track the spread of Coronavirus (COVID-19) in India (district level to state level) and World",
  alternateName: "COVID INDIA STATS",
  url: "https://covidindiastats.com/",
};

function App() {
  const history = require("history").createBrowserHistory;

  useEffect(() => {
    ReactGa.initialize("UA-163288419-1");
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <React.Fragment>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>
      <Router history={history}>
        <Navbar />
        <Suspense fallback={<div className="lazy"></div>}>
          <main className="container">
            <Switch>
              <Route path="/dive" component={World} />
              <Route path="/global" component={Test} />
              <Route path="/links" component={Options} />
              <Route path="/faq" component={FAQ} />
              <Route path="/indepth" component={StateGraph} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/notifications" component={Notifications} />
              <Route exact path="/" component={Home} />
              <Route path="/:stateid?" component={StateDetails} />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </Suspense>
      </Router>
    </React.Fragment>
  );
}

export default App;
