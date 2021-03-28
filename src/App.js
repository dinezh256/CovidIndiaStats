import React, { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// import useSWR from "swr";
import { Helmet } from "react-helmet";
import useDarkMode from "use-dark-mode";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactGa from "react-ga";
import Navbar from "./components/navbar";

const Home = lazy(() => import("./components/home"));
const World = lazy(() => import("./components/world"));
const Options = lazy(() => import("./components/options"));
const FAQ = lazy(() => import("./components/faq"));
const NotFound = lazy(() => import("./components/notFound"));
const Notifications = lazy(() => import("./components/notifications"));
const StateDetails = lazy(() => import("./components/stateDetails"));

const schemaMarkup = {
  "@context": "http://schema.org/",
  "@type": "NGO",
  name:
    "Track the spread of Coronavirus (COVID-19) in India from state level to district level and around the world",
  alternateName: "COVID INDIA STATS",
  url: "https://covidindiastats.com/",
};
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) =>
      props.theme.mode === true ? "#161616" : "rgb(248, 248, 250)"};
    color: ${(props) =>
      props.theme.mode === true ? "rgb(248, 248, 250)" : "#161616"};
  }
`;

// const fetcher = (url) => fetch(url).then((response) => response.json());

function App() {
  const history = require("history").createBrowserHistory;
  const darkMode = useDarkMode(true);

  useEffect(() => {
    ReactGa.initialize("UA-16328 8419-1");
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  // const url = "https://api.covid19india.org/v4/data-all.json";
  // const { data, error } = useSWR(url, fetcher);
  // console.log(error);

  return (
    <React.Fragment>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>
      <Router history={history}>
        <Navbar darkMode={darkMode} />
        <ThemeProvider theme={{ mode: darkMode.value }}>
          <GlobalStyle />
          <Suspense fallback={<div />}>
            <main className="container">
              <Switch>
                <Route path="/dive" component={World} />
                <Route path="/links" component={Options} />
                <Route path="/faq" component={FAQ} />
                <Route path="/not-found" component={NotFound} />
                <Route path="/notifications" component={Notifications} />
                <Route exact path="/" component={Home} />
                <Route path="/:stateid?" component={StateDetails} />
                <Redirect to="/not-found" />
              </Switch>
            </main>
          </Suspense>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
