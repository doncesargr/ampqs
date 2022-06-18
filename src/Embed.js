import React from "react";
import { API, Auth } from "aws-amplify";
import CircularProgress from "@mui/material/CircularProgress";
import { SxProps } from "@mui/material/styles";

var QuickSightEmbedding = require("amazon-quicksight-embedding-sdk");

const useStyles = (theme) => ({
  loading: {
    alignContent: "center",
    justifyContent: "center",
    display: "flex",
    marginTop: theme.spacing(4),
  },
});

class Embed extends React.Component {
  componentDidMount() {
    this.getQuickSightDashboardEmbedURL();
  }

  getQuickSightDashboardEmbedURL = async () => {
    const data = await Auth.currentSession();
    const jwtToken = data.idToken.jwtToken;
    const payloadSub = data.idToken.payload.sub;
    const email = data.idToken.payload.email;

    const params = {
      headers: {},
      response: true,
      queryStringParameters: {
        jwtToken: jwtToken,
        payloadSub: payloadSub,
        email: email,
      },
    };
    const quicksight = await API.get(
      "quicksight",
      "/getQuickSightDashboardEmbedURL",
      params
    );
    console.log(quicksight);
    const containerDiv = document.getElementById("dashboardContainer");

    const options = {
      url: quicksight.data.data.EmbedUrl,
      container: containerDiv,
      parameters: {
        country: "United States",
      },
      scrolling: "no",
      height: "800px",
      width: "912px",
      footerPaddingEnabled: true,
    };
    const dashboard = QuickSightEmbedding.embedDashboard(options);
    this.setState({ loader: false });
  };

  render() {
    return (
      <div>
        {<div>{" EMBED"}</div>}
        <div id="dashboardContainer"></div>
      </div>
    );
  }
}

export default Embed;
