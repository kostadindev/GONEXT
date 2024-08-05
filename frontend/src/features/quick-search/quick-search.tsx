import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFeaturedSummoner } from "../../libs/apis/league-api";

export const QuickSearch = () => {
  const [featuredSummoner, setFeaturedSummoner] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchFeaturedSummoner = async () => {
      try {
        const summoner = await getFeaturedSummoner();
        if (summoner) {
          const [summonerName, tagLine] = summoner?.riotId.split("#");
          if (isMounted) {
            setFeaturedSummoner(`${summonerName}#${tagLine}`);
          }
        } else {
          if (isMounted) {
            setError("No featured summoner available.");
          }
        }
      } catch (error) {
        if (isMounted) {
          setError("Failed to fetch featured summoner.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFeaturedSummoner();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleQuickSearch = () => {
    const [summoner, tagline] = featuredSummoner
      .split("#")
      .map((str) => str.trim());
    if (summoner && tagline) {
      navigate(`/${"NA"}/${summoner}/${tagline}/in-game`);
    }
  };

  if (loading)
    return (
      <div className="w-[80px] flex justify-center items-center">
        <Spin />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <>
      <Button type="primary" size="large" onClick={handleQuickSearch}>
        {featuredSummoner}
      </Button>
    </>
  );
};
