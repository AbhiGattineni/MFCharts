import React, { useEffect, useState } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MyChart = ({ navData, nav }) => {
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
