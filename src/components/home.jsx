import React, { Component } from "react";
import Table from "./table";
import Graph from "./graph";
import Footer from "./footer";
import LinearProgress from "@material-ui/core/LinearProgress";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
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
