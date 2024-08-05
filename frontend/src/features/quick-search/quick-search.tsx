import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFeaturedSummoner } from "../../libs/apis/league-api";

export const QuickSearch = () => {
  const [featuredSummoner, setFeaturedSumoner] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedSummoner = async () => {
      try {
        const summoner = await getFeaturedSummoner();
        if (summoner) {
          const [summonerName, tagLine] = summoner?.riotId.split("#");
          setFeaturedSumoner(`${summonerName}#${tagLine}`);
        } else {
          setError("No featured summoner available.");
        }
      } catch (error) {
        setError("Failed to fetch featured summoner.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedSummoner();
  }, []);

  const handleQuickSearch = () => {
    const [summoner, tagline] = featuredSummoner
      .split("#")
      .map((str) => str.trim());
    if (summoner && tagline) {
      navigate(`/${"NA"}/${summoner}/${tagline}/in-game`);
    }
  };

  if (loading) return <></>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Button type="primary" size="large" onClick={handleQuickSearch}>
        {featuredSummoner}
      </Button>
    </>
  );
};
