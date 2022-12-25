export const SearchData = ({ mutualFundsSearch }) => {
  return (
    <table className="table-fixed border-collapse border border-slate-400 w-full">
      <thead>
        <tr>
          <th className="border border-slate-300">MF Name</th>
          <th className="border border-slate-300">MF Value</th>
        </tr>
      </thead>
      <tbody>
        {mutualFundsSearch.map((mf, index) => {
          return (
            <tr key={index}>
              <td className="border border-slate-300">{mf.schemeName}</td>
              <td className="border border-slate-300 text-center">
                {mf.schemeCode}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
