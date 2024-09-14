import { Link } from "react-router-dom";
import { fetchCampaignList } from "../utils/request";
import { useQuery } from "@tanstack/react-query";
import ErrorCard from "./ErrorCard";

const CampaignList = () => {
  const { data: campaigns, isLoading, error } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => fetchCampaignList(),
    retry: false,
  });

  if (!isLoading && error) {
    return <ErrorCard errorMessage={error.message} />;
  }

  if (isLoading && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {campaigns.map((campaign) => (
        <Link
          key={campaign.id}
          state={campaign.name}
          to={`/campaigns/${campaign.id}`}
          className="bg-white p-4 border rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          <h3 className="text-lg font-semibold">{campaign.name}</h3>
          <p className="text-sm text-gray-500">ID: {campaign.id}</p>
        </Link>
      ))}
    </div>
  );
};

export default CampaignList;
