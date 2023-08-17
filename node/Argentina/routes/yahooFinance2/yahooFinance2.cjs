import yahooFinance from "yahoo-finance";

export const yahooEquity = () => {
  return new Promise((resolve, reject) => {
    yahooFinance.historical(
      {
        symbol: "ZEEL.NS",
        from: "2020-01-01",
        to: "2023-12-31",
      },
      function (err, quotes) {
        if (err) {
          reject(err);
        } else {
          resolve(quotes.length !== 0 ? quotes : []);
        }
      }
    );
  });
};
