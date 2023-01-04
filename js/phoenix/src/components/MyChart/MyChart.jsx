import React, { useEffect, useState } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MyChart = (props) => {
  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: props.navData,
    },
    xAxis: {
      categories: props.values,
    },
    yAxis: {
      title: {
        text: "Price",
      },
    },
    series: [
      {
        name: props.navData,
        data: props.values,
      },
    ],
  };

  return (
    <div>
      {props.values != 0 && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default MyChart;
