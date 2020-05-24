import React, { Component } from "react";
import Table from "./table";
import Graph from "./graph";
import Footer from "./footer";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Helmet } from "react-helmet";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Helmet>
            <title>Covid India Stats</title>
            <meta
              name="description"
              content="Track the spread of Coronavirus (COVID-19) in India and World"
            />
          </Helmet>
          <div className="row">
            <LinearProgress />
            <div className="col-sm">
              <Table />
            </div>
            <div
              className="col-sm fadeInUp"
              style={{
                animationDelay: "0.8s",
                marginTop: 15,
              }}
            >
              <div align="center">
                <Graph />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
