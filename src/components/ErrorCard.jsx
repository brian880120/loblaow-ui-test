const ErrorCard = ({ errorMessage }) => {
  return (
    <div className="max-w-sm mx-auto bg-white border border-red-400 rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold text-red-600">Error</h2>
        <p className="mt-2 text-red-700">{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorCard;
