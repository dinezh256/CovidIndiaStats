import React, { Component } from "react";
import Table from "./table";
import Graph from "./graph";
import Footer from "./footer";
import { Helmet } from "react-helmet";

class Home extends Component {
  render() {
    return (
      <>
        <div className="home">
          <Helmet>
            <title>Covid India Stats</title>
            <meta
              name="description"
              content="Track the spread of Coronavirus (COVID-19) in India and World"
            />
          </Helmet>

          <Table />

          <div
            className="graph-section fade-in-up"
            style={{
              animationDelay: "0.8s",
              marginTop: 15,
            }}
          >
            <Graph />
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default Home;
