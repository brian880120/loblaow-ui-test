import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isDetailView = /^\/campaigns\/\d+$/.test(location.pathname);

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Campaign Dashboard</h1>
        {isDetailView && (
          <button
            onClick={() => navigate('/')}
            className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Back to Home
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;