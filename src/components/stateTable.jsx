import React, { Component } from "react";
import { indianstates } from "./API/index";
import StatePicker from "./statepicker";
import * as Icon from "react-feather";
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";
import { Theme, makeStyles } from "@material-ui/core/styles";
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone";
import parse from "html-react-parser";

class StateTable extends Component {
  state = { stateData: [], requiredData: [] };
  async componentDidMount() {
    const fetchedStates = await indianstates();
    this.setState({ stateData: fetchedStates });
  }

  handleStateChange = async (state) => {
    const requiredStateData = [];
    this.state.stateData.map((item) => {
      if (state === item.statecode) requiredStateData.push(item.districtData);
    });
    requiredStateData[0].sort(function (x, y) {
      return Number(y.confirmed) - Number(x.confirmed);
    });
    this.setState({
      requiredData: requiredStateData,
    });
  };

  render() {
    const { requiredData } = this.state;

    const useStylesBootstrap = makeStyles((theme: Theme) => ({
      arrow: {
        color: theme.palette.common.black,
      },
      tooltip: {
        backgroundColor: theme.palette.common.black,
      },
    }));

    function BootstrapTooltip(props: TooltipProps) {
      const classes = useStylesBootstrap();

      return (
        <Tooltip disableTouchListener arrow classes={classes} {...props} />
      );
    }

    function commaSeperated(x) {
      x = x.toString();
      let lastThree = x.substring(x.length - 3);
      let otherNumbers = x.substring(0, x.length - 3);
      if (otherNumbers !== "") lastThree = "," + lastThree;
      let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      return res;
    }

    function districtZone(district) {
      const redZone = [
        "South Andaman",
        "Chittoor",
        "Guntur",
        "Krishna",
        "Kurnool",
        "S.P.S. Nellore",
        "Buxar",
        "Gaya",
        "Munger",
        "Patna",
        "Rohtas",
        "Chandigarh",
        "Raipur",
        "Central Delhi",
        "East Delhi",
        "New Delhi",
        "North Delhi",
        "North East Delhi",
        "North West Delhi",
        "Shahdara",
        "South Delhi",
        "South East Delhi",
        "South West Delhi",
        "West Delhi",
        "Ahmedabad",
        "Anand",
        "Aravalli",
        "Banaskantha",
        "Bhavnagar",
        "Gandhinagar",
        "Panchmahal",
        "Surat",
        "Vadodara",
        "Faridabad",
        "Sonipat",
        "Anantnag",
        "Bandipora",
        "Shupiyan",
        "Srinagar",
        "Ranchi",
        "Bengaluru Urban",
        "Bengaluru Rural",
        "Mysuru",
        "Kannur",
        "Kottayam",
        "Barwani",
        "Bhopal",
        "Dewas",
        "Dhar",
        "Khandwa",
        "Gwalior",
        "Indore",
        "Jabalpur",
        "Ujjain",
        "Akola",
        "Aurangabad",
        "Dhule",
        "Jalgaon",
        "Mumbai",
        "Nagpur",
        "Nashik",
        "Palghar",
        "Pune",
        "Satara",
        "Solapur",
        "Thane",
        "Yavatmal",
        "Balasore",
        "Bhadrak",
        "Jalandhar",
        "Jajpur",
        "Ludhiana",
        "Patiala",
        "Ajmer",
        "Banswara",
        "Bharatpur",
        "Jaipur",
        "Jhalawar",
        "Jodhpur",
        "Kota",
        "Nagaur",
        "Chennai",
        "Shopiyan",
        "Kancheepuram",
        "Madurai",
        "Namakkal",
        "Thanjavur",
        "Thiruvallur",
        "Thiruvarur",
        "Tiruppur",
        "Vellore",
        "Virudhunagar",
        "Chengalpattu",
        "Ranipet",
        "Hyderabad",
        "Medchal Malkajgiri",
        "Ranga Reddy",
        "Suryapet",
        "Vikarabad",
        "Warangal Urban",
        "Agra",
        "Aligarh",
        "Amroha",
        "Bareilly",
        "Bijnor",
        "Bulandshahr",
        "Firozabad",
        "Gautam Buddha Nagar",
        "Kanpur Nagar",
        "Lucknow",
        "Mathura",
        "Meerut",
        "Moradabad",
        "Muzaffarnagar",
        "Rae Bareli",
        "Rampur",
        "Saharanpur",
        "Sant Kabir Nagar",
        "Varanasi",
        "Haridwar",
        "Howrah",
        "Kolkata",
        "North 24 Parganas",
        "Purba Medinipur",
      ];
      const orangeZone = [
        "Anantapur",
        "East Godavari",
        "Prakasam",
        "Srikakulam",
        "Visakhapatnam",
        "West Godavari",
        "Y.S.R. Kadapa",
        "Dhubri",
        "Goalpara",
        "Morigaon",
        "Arwal",
        "Aurangabad",
        "Banka",
        "Begusarai",
        "Bhagalpur",
        "Bhojpur",
        "Darbhanga",
        "Gopalganj",
        "Jehanabad",
        "Kaimur",
        "Lakhisarai",
        "Madhepura",
        "Madhubani",
        "Nalanda",
        "Nawada",
        "East Champaran",
        "Purnia",
        "Saran",
        "Siwan",
        "Vaishali",
        "Korba",
        "Bharuch",
        "Botad",
        "Chhota Udaipur",
        "Dahod",
        "Gir Somnath",
        "Jamnagar",
        "Kutch",
        "Kheda",
        "Mehsana",
        "Mahisagar",
        "Narmada",
        "Navsari",
        "Patan",
        "Rajkot",
        "Sabarkantha",
        "Surendranagar",
        "Tapi",
        "Dang",
        "Valsad",
        "Ambala",
        "Bhiwani",
        "Charkhi Dadri",
        "Fatehabad",
        "Gurugram",
        "Hisar",
        "Jhajjar",
        "Jind",
        "Kaithal",
        "Karnal",
        "Kurukshetra",
        "Nuh",
        "Palwal",
        "Panchkula",
        "Panipat",
        "Rohtak",
        "Sirsa",
        "Yamunanagar",
        "Chamba",
        "Hamirpur",
        "Kangra",
        "Sirmaur",
        "Solan",
        "Una",
        "Budgam",
        "Baramulla",
        "Ganderbal",
        "Jammu",
        "Buggam",
        "Kathua",
        "Kulgam",
        "Kupwara",
        "Rajouri",
        "Ramban",
        "Reasi",
        "Samba",
        "Udhampur",
        "Bokaro",
        "Deoghar",
        "Dhanbad",
        "Garhwa",
        "Giridih",
        "Hazaribagh",
        "Jamtara",
        "Koderma",
        "Simdega",
        "Bagalkote",
        "Ballari",
        "Belagavi",
        "Bidar",
        "Chikkaballapura",
        "Dakshina Kannada",
        "Dharwad",
        "Gadag",
        "Kalaburagi",
        "Mandya",
        "Tumakuru",
        "Uttara Kannada",
        "Vijayapura",
        "Alappuzha",
        "Idukki",
        "Kasaragod",
        "Kollam",
        "Kozhikode",
        "Malappuram",
        "Palakkad",
        "Pathanamthitta",
        "Thiruvananthapuram",
        "Thrissur",
        "Kargil",
        "Leh",
        "Agar Malwa",
        "Alirajpur",
        "Betul",
        "Burhanpur",
        "Chhindwara",
        "Dindori",
        "Harda",
        "Hoshangabad",
        "Mandsaur",
        "Morena",
        "Raisen",
        "Ratlam",
        "Sagar",
        "Shahdol",
        "Shajapur",
        "Sheopur",
        "Tikamgarh",
        "Vidisha",
        "Khargone",
        "Ahmednagar",
        "Amravati",
        "Bhandara",
        "Beed",
        "Buldhana",
        "Chandrapur",
        "Hingoli",
        "Jalna",
        "Kolhapur",
        "Latur",
        "Nanded",
        "Nandurbar",
        "Parbhani",
        "Raigad",
        "Ratnagiri",
        "Sangli",
        "East Khasi Hills",
        "Dhenkanal",
        "Kalahandi",
        "Kendrapara",
        "Khordha",
        "Koraput",
        "Sundargarh",
        "Puducherry",
        "Amritsar",
        "Barnala",
        "Faridkot",
        "Firozpur",
        "Gurdaspur",
        "Hoshiarpur",
        "Kapurthala",
        "Mansa",
        "Moga",
        "Pathankot",
        "S.A.S. Nagar",
        "Sangrur",
        "Shahid Bhagat Singh Nagar",
        "Sri Muktsar Sahib",
        "Tarn Taran",
        "Alwar",
        "Barmer",
        "Bhilwara",
        "Bikaner",
        "Chittorgarh",
        "Churu",
        "Dausa",
        "Dholpur",
        "Dungarpur",
        "Hanumangarh",
        "Jaisalmer",
        "Jhunjhunu",
        "Karauli",
        "Pali",
        "Rajsamand",
        "Sawai Madhopur",
        "Sikar",
        "Tonk",
        "Udaipur",
        "Ariyalur",
        "Coimbatore",
        "Cuddalore",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Kanyakumari",
        "Karur",
        "Nagapattinam",
        "Perambalur",
        "Pudukkottai",
        "Ramanathapuram",
        "Salem",
        "Sivaganga",
        "Nilgiris",
        "Theni",
        "Thoothukkudi",
        "Tiruchirappalli",
        "Tirunelveli",
        "Tiruvannamalai",
        "Viluppuram",
        "Tenkasi",
        "Kallakurichi",
        "Tirupathur",
        "Adilabad",
        "Jagtial",
        "Jangaon",
        "Jayashankar Bhupalapally",
        "Jogulamba Gadwal",
        "Kamareddy",
        "Karimnagar",
        "Khammam",
        "Komaram Bheem",
        "Mahabubnagar",
        "Mancherial",
        "Medak",
        "Nalgonda",
        "Narayanpet",
        "Nirmal",
        "Nizamabad",
        "Rajanna Sircilla",
        "Sangareddy",
        "Gomati",
        "North Tripura",
        "Auraiya",
        "Azamgarh",
        "Baghpat",
        "Bahraich",
        "Balrampur",
        "Banda",
        "Basti",
        "Bhadohi",
        "Budaun",
        "Etah",
        "Etawah",
        "Ghaziabad",
        "Ghazipur",
        "Gonda",
        "Gorakhpur",
        "Hapur",
        "Hardoi",
        "Jalaun",
        "Jaunpur",
        "Jhansi",
        "Kannauj",
        "Kasganj",
        "Kaushambi",
        "Mainpuri",
        "Mau",
        "Mirzapur",
        "Pilibhit",
        "Pratapgarh",
        "Prayagraj",
        "Sambhal",
        "Shamli",
        "Shrawasti",
        "Sitapur",
        "Sultanpur",
        "Unnao",
        "Ayodhya",
        "Dehradun",
        "Nainital",
        "Hooghly",
        "Murshidabad",
        "Nadia",
        "Paschim Medinipur",
        "Paschim Bardhaman",
        "Purba Bardhaman",
        "Malda",
        "Darjeeling",
        "Jalpaiguri",
        "Kalimpong",
        "South 24 Parganas",
        "Birbhum",
        "Ferozepur",
      ];
      const greenZone = [
        "Nicobars",
        "North and Middle Andaman",
        "Lohit",
        "Bongaigaon",
        "Cachar",
        "South Salmara Mankachar",
        "Golaghat",
        "Hailakandi",
        "Kamrup",
        "Kamrup Metropolitan",
        "Karimganj",
        "Lakhimpur",
        "Nalbari",
        "Araria",
        "Katihar",
        "West Champaran",
        "Sheikhpura",
        "Sitamarhi",
        "Bilaspur",
        "Durg",
        "Rajnandgaon",
        "Surajpur",
        "North Goa",
        "South Goa",
        "Morbi",
        "Porbandar",
        "Kishtwar",
        "Pulwama",
        "Godda",
        "Palamu",
        "Chitradurga",
        "Davanagere",
        "Kodagu",
        "Udupi",
        "Ernakulam",
        "Wayanad",
        "Anuppur",
        "Ashoknagar",
        "Rewa",
        "Shivpuri",
        "Gondia",
        "Osmanabad",
        "Sindhudurg",
        "Washim",
        "Imphal East",
        "Imphal West",
        "Aizawl",
        "Champhai",
        "Kolasib",
        "Katni",
        "Lawngtlai",
        "West Jaintia Hills",
        "East Garo Hills",
        "West Garo Hills",
        "West Garo Hills",
        "Ri Bhoi",
        "South Garo Hills",
        "West Khasi Hills",
        "North Garo Hills",
        "East Jaintia Hills",
        "South West Khasi Hills",
        "South West Garo Hills",
        "Lawngtlai",
        "Lunglei",
        "Mamit",
        "Saiha",
        "Serchhip",
        "Hnahthial",
        "Saitual",
        "Khawzawl",
        "Balangir",
        "Cuttack",
        "Ganjam",
        "Deogarh",
        "Jharsuguda",
        "Kendujhar",
        "Puri",
        "Mahe",
        "Bathinda",
        "Fatehgarh Sahib",
        "Fazilka",
        "Rupnagar",
        "Baran",
        "Pratapgarh",
        "Bhadradri Kothagudem",
        "Mahabubabad",
        "Mulugu",
        "Nagarkurnool",
        "Peddapalli",
        "Siddipet",
        "Dhalai",
        "South Tripura",
        "West Tripura",
        "Khowai",
        "Sepahijala",
        "Unakoti",
        "Barabanki",
        "Deoria",
        "Hathras",
        "Kanpur Dehat",
        "Lakhimpur Kheri",
        "Maharajganj",
        "Shahjahanpur",
        "Siddharthnagar",
        "Almora",
        "Pauri Garhwal",
        "Udham Singh Nagar",
        "Sheohar",
        "Sitamarhi",
        "Samastipur",
        "Niwari",
        "Panna",
        "Mahoba",
        "Kabeerdham",
        "Devbhumi Dwarka",
        "Haveri",
        "Mandi",
        "Satna",
      ];
      if (redZone.includes(district)) {
        return "#ff446a";
      }
      if (orangeZone.includes(district)) {
        return "rgb(255, 153, 0)";
      }
      if (greenZone.includes(district)) {
        return "rgb(40, 167, 69)";
      } else return "rgb(150, 150, 150)";
    }

    return (
      <React.Fragment>
        <div
          className="row fadeInUp"
          style={{
            alignItems: "center",
            alignContent: "center",
            transitionDelay: "1.1s",
            marginBottom: "12px",
          }}
        >
          <StatePicker handleStateChange={this.handleStateChange} />
        </div>
        <div className="w-100"></div>
        {requiredData.length ? (
          <div className="row" style={{ textAlign: "center" }}>
            <h6 style={{ fontSize: 9, color: "grey" }}>
              Disclaimer: If district not mentioned, it is probably in the Green
              Zone{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.indiatoday.in/india/story/red-orange-green-zones-full-current-update-list-districts-states-india-coronavirus-1673358-2020-05-01"
              >
                <Icon.Link size={12} color="#3e4da3" strokeWidth={3} />
              </a>
            </h6>
          </div>
        ) : (
          ""
        )}
        <div className="w-100"></div>
        {requiredData.length ? (
          <div className="row fadeInUp" style={{ transitionDelay: "0.3s" }}>
            <table
              className="table table-sm table-striped table-borderless"
              style={{
                minWidth: "350px",
                tableLayout: "fixed",
                width: "100%",
                marginBottom: "-15px",
                marginTop: "-20px",
              }}
              align="center"
            >
              <thead className="thead-dark">
                <tr>
                  <th className="th wideRow sticky-top" id="line1">
                    DISTRICT
                  </th>
                  <th
                    className="th sticky-top"
                    id="line2"
                    style={{ width: "175px" }}
                  >
                    DISTRICT
                  </th>
                  <th
                    className="th sticky-top text-info"
                    style={{ textAlign: "center" }}
                  >
                    CONFIRMED
                  </th>
                  <th
                    className="th sticky-top narrowRow"
                    style={{ color: "rgb(255, 68, 106)", textAlign: "center" }}
                  >
                    ACTIVE
                  </th>
                  <th
                    className="th sticky-top text-success"
                    style={{ textAlign: "center" }}
                  >
                    RECOVERED
                  </th>
                  <th
                    className="th sticky-top narrowRow text-secondary"
                    id="line1"
                    style={{ textAlign: "center" }}
                  >
                    DEATHS
                  </th>
                  <th
                    className="th sticky-top text-secondary"
                    id="line2"
                    style={{ textAlign: "center", width: "70px" }}
                  >
                    DECEASED
                  </th>
                </tr>
              </thead>
              <tbody className="tbody">
                {requiredData.map((item) =>
                  item.map((district) => (
                    <tr className="tr">
                      <td
                        className="tdleft"
                        style={{
                          color: `${districtZone(district.district)}`,
                          borderLeftWidth: "5px",
                          borderStyle: "solid",
                        }}
                      >
                        {district.district}
                        {district.notes ? (
                          <BootstrapTooltip title={parse(district.notes)}>
                            <span style={{ verticalAlign: "0.05rem" }}>
                              <InfoTwoToneIcon
                                color="inherit"
                                fontSize="inherit"
                              />
                            </span>
                          </BootstrapTooltip>
                        ) : (
                          ""
                        )}
                      </td>
                      <td
                        className="delta td text-secondary"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup text-info">
                          {Number(district.delta.confirmed) !== 0 && (
                            <Icon.ArrowUp
                              color="#42b3f4"
                              size={9}
                              strokeWidth={3.5}
                            />
                          )}
                          <b className="deltainc-md text-info">
                            {Number(district.delta.confirmed) === 0
                              ? ""
                              : commaSeperated(district.delta.confirmed)}
                          </b>
                        </span>
                        &nbsp;&nbsp;
                        {commaSeperated(district.confirmed)}
                      </td>
                      <td
                        className="delta td text-secondary narrowRow"
                        style={{ textAlign: "right" }}
                      >
                        {Number(district.active)
                          ? commaSeperated(district.active)
                          : "-"}
                      </td>
                      <td
                        className="delta td text-secondary"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup text-success">
                          {Number(district.delta.recovered) !== 0 && (
                            <Icon.ArrowUp
                              color="#28a745"
                              size={9}
                              strokeWidth={3.5}
                            />
                          )}
                          <b className="deltainc-md text-success">
                            {Number(district.delta.recovered) === 0
                              ? ""
                              : commaSeperated(district.delta.recovered)}
                          </b>
                        </span>
                        &nbsp;&nbsp;
                        {Number(district.recovered)
                          ? commaSeperated(district.recovered)
                          : "-"}
                      </td>
                      <td
                        className="delta td text-secondary narrowRow"
                        style={{ textAlign: "right" }}
                      >
                        <span className="arrowup text-secondary">
                          {Number(district.delta.deceased) !== 0 && (
                            <Icon.ArrowUp
                              color="#6c757d"
                              size={9}
                              strokeWidth={3.5}
                            />
                          )}
                          <b className="deltainc-md text-secondary">
                            {Number(district.delta.deceased) === 0
                              ? ""
                              : commaSeperated(district.delta.deceased)}
                          </b>
                        </span>
                        &nbsp;&nbsp;
                        {Number(district.deceased)
                          ? commaSeperated(district.deceased)
                          : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default StateTable;
