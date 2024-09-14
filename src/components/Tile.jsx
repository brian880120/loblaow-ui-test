const Tile = ({ label, value }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4">
      <h4 className="text-sm font-semibold text-gray-700">{label}</h4>
      <p className="text-lg font-medium text-gray-900">{value}</p>
    </div>
  );
};

export default Tile;
