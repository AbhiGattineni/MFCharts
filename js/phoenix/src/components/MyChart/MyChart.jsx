import React, { useEffect, useState } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MyChart = ({ navData }) => {
  const [nav, setNav] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:5000/api/mutualfund/nav/${navData.scheme_code}?name=${navData.scheme_name}`
    )
      .then((response) => response.json())
      .then((data) => setNav(data));

    fetch(
      `http://127.0.0.1:5000/api/mutualfund/date/${navData.scheme_code}?name=${navData.scheme_name}`
    )
      .then((response) => response.json())
      .then((data) => setDates(data));
  }, [navData]);
  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: navData.scheme_name,
    },
    xAxis: {
      categories: dates,
    },
    yAxis: {
      title: {
        text: "Price",
      },
    },
    series: [
      {
        name: navData.scheme_name,
        data: nav,
      },
    ],
  };

  return (
    <div>
      {navData != 0 && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default MyChart;
