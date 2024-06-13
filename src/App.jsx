import React, { useEffect, Suspense, lazy, useState } from "react";
import { createBrowserHistory } from "history";
import cx from "classnames";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import ReactGa from "react-ga";
import Navbar from "./components/navbar";
import AppContextProvider from "./context";

import { detectColorScheme } from "./utils/common-functions";
import "./App.css";

const Home = lazy(() => import("./components/home"));
const World = lazy(() => import("./components/world"));
const Options = lazy(() => import("./components/options"));
const FAQ = lazy(() => import("./components/faq"));
const NotFound = lazy(() => import("./components/notFound"));
const Notifications = lazy(() => import("./components/notifications"));
const StateDetails = lazy(() => import("./components/stateDetails"));

const schemaMarkup = {
  "@context": "http://schema.org/",
  "@type": "Covid Dashboard",
  name: "Track the spread of Coronavirus (COVID-19) in India from state level to district level and around the world",
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

function App() {
  const themeLS = localStorage.getItem("theme");
  const themeSystem = detectColorScheme();
  const [isDark, setIsDark] = useState(
    themeLS ? themeLS === "dark" : themeSystem === "dark"
  );
  const history = createBrowserHistory();
  const darkMode = {
    value: isDark,
    toggle: () =>
      setIsDark((prev) => {
        localStorage.setItem("theme", prev ? "light" : "dark");
        return !prev;
      }),
  };

  useEffect(() => {
    ReactGa.initialize("UA-163288419-1");
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <>
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
              <main
                className={cx("main-wrapper", { dark: isDark, light: !isDark })}
              >
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
    </>
  );
}

export default App;
