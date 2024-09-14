const fetchCampaignDetails = async (id, number) => {
  const response = await fetch(`/api/campaigns/${id}?number=${number}`);
  const result = await response.json();
  if (result.code && result.code == 404 && result.message) {
    throw new Error(result.message);
  }
  return result;
};

const fetchCampaignList = async () => {
  const response = await fetch('/api/campaigns');
  const result = await response.json();
  if (result.code && result.code == 404 && result.message) {
    throw new Error(result.message);
  }
  return result;
};

export {
  fetchCampaignDetails,
  fetchCampaignList,
};
