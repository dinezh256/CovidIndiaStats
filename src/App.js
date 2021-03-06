import React, { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import useDarkMode from "use-dark-mode";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactGa from "react-ga";
import Navbar from "./components/navbar";
import AppContextProvider from "./context";

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
  url: "https://www.covidindiastats.com/",
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
      <AppContextProvider>
        <Router history={history}>
          <Navbar darkMode={darkMode} />
          <ThemeProvider theme={{ mode: darkMode.value }}>
            <GlobalStyle />
            <Suspense fallback={<div />}>
              <main className="container">
                <Switch>
                  <Route path="/global" component={World} />
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
      </AppContextProvider>
    </React.Fragment>
  );
}

export default App;
