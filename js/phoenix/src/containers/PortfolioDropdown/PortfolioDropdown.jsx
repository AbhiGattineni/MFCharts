const PortfolioDropdown = ({ data }) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6 flex justify-center items-center p-4">
        Graph
      </div>
      <div className="col-span-6 flex justify-center items-center p-4">
        Timeline
      </div>
      <div className="col-span-12 flex justify-center items-center p-4">
        <p>Add timeline</p>
      </div>
    </div>
  );
};

export default PortfolioDropdown;
