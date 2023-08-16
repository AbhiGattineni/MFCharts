export const FundType = {
    ALL: "All",
    MUTUAL: "Mutual",
    EQUITY: "Equity",
}
export const BASE_URL = "http://127.0.0.1:5000/api";

export const formatDate = (date) => {
    let d = new Date(date);
    let day = ("0" + d.getDate()).slice(-2);
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    let year = d.getFullYear();
    return `${day}-${month}-${year}`;
}