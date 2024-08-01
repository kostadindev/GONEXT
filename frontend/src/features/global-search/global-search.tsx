import { Input, Select, Space } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../notifications/notification-context";

interface Params extends Record<string, string | undefined> {
  region?: string;
  summoner?: string;
  tagline?: string;
}

const options = [
  {
    value: "na",
    label: "NA",
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
  },
];

const { Search } = Input;

export default function GlobalSearch() {
  const { setError } = useNotification();
  const navigate = useNavigate();
  const {
    region: regionParam,
    summoner: summonerParam,
    tagline: taglineParam,
  } = useParams<Params>();

  const [region, setRegion] = useState<string>(regionParam || "na"); // Default region
  const [searchedUser, setSearchedUser] = useState<string>(
    summonerParam
      ? `${summonerParam}${taglineParam ? `#${taglineParam}` : ""}`
      : ""
  );

  useEffect(() => {
    if (regionParam) setRegion(regionParam);
    if (summonerParam && taglineParam)
      setSearchedUser(`${summonerParam}#${taglineParam}`);
  }, [regionParam, summonerParam, taglineParam]);

  const onSearch = (searchedUser: string) => {
    const [summoner, tagline] = searchedUser.split("#");
    if (summoner && tagline) {
      navigate(`/${region}/${summoner}/${tagline}/in-game`);
    } else {
      setError({
        message: "Invalid Summoner Name",
        description: "Use 'summoner#tagline'",
      });
    }
  };

  const onRegionChange = (value: string) => {
    setRegion(value);
  };

  return (
    <Space>
      <Space.Compact size="large" style={{ width: "600px" }}>
        <Select
          value={region}
          options={options}
          size="large"
          onChange={onRegionChange}
          style={{ width: "100px" }}
        />
        <Search
          value={searchedUser}
          placeholder="Doublelift#NA1"
          onSearch={onSearch}
          onChange={(e) => setSearchedUser(e.target.value)}
          enterButton
          style={{ flex: 1 }}
        />
      </Space.Compact>
    </Space>
  );
}
