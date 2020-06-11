// Line1
<div className="col">
                <div
                  style={{
                    borderSpacing: "1px",
                    textAlign: "center",
                    marginTop: "-18px",
                    marginBottom: "-5px",
                  }}
                >
                  <NavLink
                    to="/links"
                    className="cycloneLink"
                    onClick={() => {
                      ReactGa.event({
                        action: "Cyclone",
                        event: "Cyclone",
                      });
                    }}
                  >
                    <h1 className="cyclone">
                      <Icon.CloudRain
                        size={15}
                        style={{ verticalAlign: "-0.1rem" }}
                        fill="rgba(128, 42, 190, 0.8)"
                      />
                      &nbsp; &nbsp; Cyclone Nisarga Helpline &nbsp;
                      <ArrowRightIcon
                        size="inherit"
                        color="inherit"
                        className="float"
                        style={{ verticalAlign: "-0.42rem" }}
                      />
                    </h1>
                  </NavLink>
                </div>
              </div>


// Line2
<div className="col">
  <div
    style={{
      borderSpacing: "1px",
      textAlign: "center",
      marginTop: "-18px",
      marginBottom: "-5px",
    }}
  >
    <NavLink
      to="/links"
      className="cycloneLink"
      onClick={() => {
        ReactGa.event({
          action: "Cyclone",
          event: "Cyclone",
        });
      }}
    >
      <h1 className="cyclone">
        <Icon.CloudRain
          size={15}
          style={{ verticalAlign: "-0.1rem" }}
          fill="rgba(128, 42, 190, 0.8)"
        />
        &nbsp; &nbsp; Cyclone Nisarga Helpline &nbsp;
        <ArrowRightIcon
          size="inherit"
          color="inherit"
          className="float"
          style={{ verticalAlign: "-0.42rem" }}
        />
      </h1>
    </NavLink>
  </div>
</div>;
