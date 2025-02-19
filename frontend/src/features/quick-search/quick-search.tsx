import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getFeaturedSummoner } from "../../libs/apis/league-api";

export const QuickSearch = () => {
  const [featuredSummoner, setFeaturedSummoner] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const hasFetched = useRef(false); // Prevents double fetching in Strict Mode

  // Function to fetch and update featured summoner
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

  // Fetch featured summoner on mount only once
  useEffect(() => {
    let isMounted = true;

    if (!hasFetched.current) {
      hasFetched.current = true; // Prevents duplicate fetches
      fetchFeaturedSummoner();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle quick search and refetch new summoner after clicking
  const handleQuickSearch = async () => {
    const [summoner, tagline] = featuredSummoner
      .split("#")
      .map((str) => str.trim());
    if (summoner && tagline) {
      // Save to local storage
      localStorage.setItem("latestSummoner", summoner);
      localStorage.setItem("latestTagline", tagline);

      navigate(`/${"NA"}/${summoner}/${tagline}/in-game`);

      // Fetch new featured summoner after navigating
      fetchFeaturedSummoner();
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
        {featuredSummoner?.split("#")?.[0]}{" "}
        <span style={{ fontStyle: "italic", marginLeft: 4 }}>
          #{featuredSummoner?.split("#")?.[1]}
        </span>
      </Button>
    </>
  );
};
