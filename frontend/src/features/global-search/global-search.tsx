import { Input, Select, Space } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../notifications/notification-context";

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
  const [region, setRegion] = useState("na"); // Default region
  const navigate = useNavigate();

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
          defaultValue="na"
          options={options}
          size="large"
          variant="filled"
          onChange={onRegionChange}
          style={{ width: "100px" }}
        />
        <Search
          variant="filled"
          placeholder="Doublelift#NA1"
          onSearch={onSearch}
          enterButton
          style={{ flex: 1 }}
        />
      </Space.Compact>
    </Space>
  );
}
