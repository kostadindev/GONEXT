import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const QuickSearch = () => {
  const mostFrequentSearch = "Doublelift#NA1";
  const navigate = useNavigate();
  const handleQuickSearch = () => {
    const [summoner, tagline] = mostFrequentSearch
      .split("#")
      .map((str) => str.trim());
    if (summoner && tagline) {
      navigate(`/${"NA"}/${summoner}/${tagline}/in-game`);
    }
  };
  return (
    <>
      <Button type="primary" size="large" onClick={handleQuickSearch}>
        {mostFrequentSearch}
      </Button>
    </>
  );
};
