import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchCampaignDetails } from '../utils/request';
import ErrorCard from './ErrorCard';
import Tile from './Tile';

const CampaginDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { state: campaignName } = location;
  const campaginReqNumber = useRef(0);

  const { data: campaign, isLoading, error } = useQuery({
    queryKey: ['campaign'],
    queryFn: () => fetchCampaignDetails(id, campaginReqNumber.current),
    refetchInterval: 5000,
    retry: false,
  });

  useEffect(() => {
    if (!error && campaign) {
      campaginReqNumber.current++;
    }
  }, [campaign, error]);

  if (!isLoading && error) {
    return <ErrorCard errorMessage={error.message} />;
  }

  if (isLoading && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-16">
      <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Campaign Details</h2>
        <Tile label="Campaign Name" value={campaignName} />
        <Tile label="Impressions" value={campaign.impressions} />
        <Tile label="Clicks" value={campaign.clicks} />
        <Tile label="Users" value={campaign.users} />
      </div>
    </div>
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 max-w-md w-full">
    //     <h2 className="text-2xl font-bold text-gray-800 mb-4">Campaign Details</h2>
    //     <div className="mb-4">
    //       <p className="mt-2 text-gray-600">Name: {campaignName}</p>
    //       <p className="mt-2 text-gray-600">Impressions: {campaign.impressions}</p>
    //       <p className="mt-2 text-gray-600">Clicks: {campaign.clicks}</p>
    //       <p className="mt-2 text-gray-600">Users: {campaign.users}</p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CampaginDetails;
