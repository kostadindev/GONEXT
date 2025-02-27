import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getFeaturedSummoner } from "../../libs/apis/league-api";

export const QuickSearch = () => {
  const [featuredSummoner, setFeaturedSummoner] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  const fetchFeaturedSummoner = async () => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    try {
      const summoner = await getFeaturedSummoner();
      if (summoner) {
        const [summonerName, tagLine] = summoner.riotId.split("#");
        if (isMounted) {
          setFeaturedSummoner(`${summonerName}#${tagLine}`);
        }
      } else {
        if (isMounted) setError("No featured summoner available.");
      }
    } catch (error) {
      if (isMounted) setError("Failed to fetch featured summoner.");
    } finally {
      if (isMounted) setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchFeaturedSummoner();
    }
  }, []);

  const handleQuickSearch = async () => {
    const [summoner, tagline] = featuredSummoner
      .split("#")
      .map((str) => str.trim());
    if (summoner && tagline) {
      localStorage.setItem("latestSummoner", summoner);
      localStorage.setItem("latestTagline", tagline);
      navigate(`/${"NA"}/${summoner}/${tagline}/in-game`);
      fetchFeaturedSummoner();
    }
  };

  if (loading)
    return (
      <div className="w-20 flex justify-center items-center">
        <Spin />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <>
      <Button type="primary" size="large" onClick={handleQuickSearch}>
        {featuredSummoner.split("#")[0]}{" "}
        <span className="italic ml-1">#{featuredSummoner.split("#")[1]}</span>
      </Button>
    </>
  );
};
