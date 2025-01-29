import React, { useState, useEffect } from "react";
import { AutoComplete, Flex, Input, Select, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../notifications/notification-context";
import { UserOutlined } from "@ant-design/icons";

interface Params extends Record<string, string | undefined> {
  region?: string;
  summoner?: string;
  tagline?: string;
}

const MAX_RECENT_USERS = 20;

const Title: React.FC<Readonly<{ title?: string }>> = (props) => (
  <Flex align="center" justify="space-between">
    {props.title}
  </Flex>
);

const splitTitle = (title: string) => {
  const parts = title.split("#");
  const name = parts[0];
  const tag = parts[1] ? `#${parts[1]}` : "";
  return { name, tag };
};

const renderItem = (title: string) => {
  const { name, tag } = splitTitle(title);

  return {
    value: title,
    label: (
      <Flex align="center" justify="space-between">
        <span>
          {name}
          {tag && (
            <span style={{ color: "gray", fontStyle: "italic", marginLeft: 4 }}>
              {tag}
            </span>
          )}
        </span>
        <UserOutlined style={{ marginLeft: 8 }} />
      </Flex>
    ),
  };
};

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

  const [region, setRegion] = useState<string>(regionParam || "na");
  const [searchedUser, setSearchedUser] = useState<string>(
    summonerParam
      ? `${summonerParam}${taglineParam ? `#${taglineParam}` : ""}`
      : ""
  );
  const [recentUsers, setRecentUsers] = useState<string[]>([]);
  const [autocompleteOptions, setAutocompleteOptions] = useState<any[]>([]);

  useEffect(() => {
    if (regionParam) setRegion(regionParam);
    if (summonerParam && taglineParam)
      setSearchedUser(`${summonerParam}#${taglineParam}`);
  }, [regionParam, summonerParam, taglineParam]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("recentUsers") || "[]");
    setRecentUsers(storedUsers);

    setAutocompleteOptions([
      {
        label: <Title title="Recent Players" />,
        options: storedUsers.map((user: string) => renderItem(user)),
      },
    ]);
  }, []);

  const updateRecentUsers = (user: string) => {
    const updatedUsers = [user, ...recentUsers.filter((u) => u !== user)];
    if (updatedUsers.length > MAX_RECENT_USERS) {
      updatedUsers.length = MAX_RECENT_USERS;
    }

    setRecentUsers(updatedUsers);
    localStorage.setItem("recentUsers", JSON.stringify(updatedUsers));
  };

  const onSearch = (searchedUser: string) => {
    const [summoner, tagline] = searchedUser.split("#");
    if (summoner && tagline) {
      updateRecentUsers(searchedUser);

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

  const onInputChange = (value: string) => {
    setSearchedUser(value);

    const filteredOptions = recentUsers
      .filter((user) => user.toLowerCase().includes(value.toLowerCase()))
      .map((user) => renderItem(user));

    setAutocompleteOptions([
      {
        label: <Title title="Recent Players" />,
        options: filteredOptions,
      },
    ]);
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
        <AutoComplete
          value={searchedUser}
          options={autocompleteOptions}
          style={{ flex: 1 }}
          onChange={onInputChange}
          onSelect={(value) => onSearch(value)}
        >
          <Search
            placeholder="Doublelift#NA1"
            enterButton
            onSearch={onSearch}
          />
        </AutoComplete>
      </Space.Compact>
    </Space>
  );
}
