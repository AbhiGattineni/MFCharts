import React, { useEffect, useState } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MyChart = ({ navData }) => {
  const [nav, setNav] = useState([]);

  useEffect(() => {
    console.log("mycharts");
    console.log(navData);
    fetch(`http://127.0.0.1:5000/api/mutualfund/${navData}`)
      .then((response) => response.json())
      .then((data) => setNav(data))
      .catch((error) => {
        console.log("no data available on selected search" + error);
      });

    // fetch(
    //   `http://127.0.0.1:5000/api/mutualfund/date/${navData.scheme_code}?name=${navData.scheme_name}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => setDates(data));
  }, [navData]);
  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: navData,
    },
    xAxis: {
      categories: nav,
    },
    yAxis: {
      title: {
        text: "Price",
      },
    },
    series: [
      {
        name: navData,
        data: nav,
      },
    ],
  };

  return (
    <div>
      {nav != 0 && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default MyChart;
