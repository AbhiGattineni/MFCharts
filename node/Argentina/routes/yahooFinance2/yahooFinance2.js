const yahooFinance = require("yahoo-finance2").default;

// yahoo equity method to get equity names
const yahooEquitySearch = async (fromDate, toDate) => {
  try {
    const results = await yahooFinance.search("ZEEL");
    return results;
  } catch (error) {
    console.error("Error fetching data from Yahoo Finance:", error);
    throw error; // This will propagate the error outside, so you can handle it wherever this function is called
  }
};

// yahoo equity method to get data between 2 dates
const yahooEquityDayToDay = async (fromDate, toDate) => {
  const queryOptions = {
    period1: fromDate,
    period2: toDate,
    interval: "1d", //1d, 1w, 1m
    events: "history",
    includeAdjustedClose: true,
  };

  try {
    const results = await yahooFinance.historical("ZEEL.NS", queryOptions);
    return results;
  } catch (error) {
    console.error("Error fetching data from Yahoo Finance:", error);
    throw error; // This will propagate the error outside, so you can handle it wherever this function is called
  }
};

module.exports = { yahooEquityDayToDay };
