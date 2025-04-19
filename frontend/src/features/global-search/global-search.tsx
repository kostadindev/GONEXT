import React, { useState, useEffect } from "react";
import { AutoComplete, Input, Select, Space } from "antd";
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
  <div className="flex items-center justify-between">{props.title}</div>
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
      <div className="flex items-center justify-between">
        <span>
          {name}
          {tag && <span className="text-gray-500 italic ml-1">{tag}</span>}
        </span>
        <UserOutlined className="ml-2" />
      </div>
    ),
  };
};

const options = [
  {
    value: "BR1",
    label: "BR",
  },
  {
    value: "EUN1",
    label: "EUNE",
  },
  {
    value: "EUW1",
    label: "EUW",
  },
  {
    value: "JP1",
    label: "JP",
  },
  {
    value: "KR",
    label: "KR",
  },
  {
    value: "LA1",
    label: "LAN",
  },
  {
    value: "LA2",
    label: "LAS",
  },
  {
    value: "NA1",
    label: "NA",
  },
  {
    value: "OC1",
    label: "OCE",
  },
  {
    value: "TR1",
    label: "TR",
  },
  {
    value: "RU",
    label: "RU",
  },
  {
    value: "PH2",
    label: "PH",
  },
  {
    value: "SG2",
    label: "SG",
  },
  {
    value: "TH2",
    label: "TH",
  },
  {
    value: "TW2",
    label: "TW",
  },
  {
    value: "VN2",
    label: "VN",
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

  const [region, setRegion] = useState<string>(regionParam || "NA1");
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
    <Space direction="vertical" className="w-full sm:max-w-[600px] w-full">
      <Space.Compact size="large" className="w-full">
        <Select
          value={region}
          options={options}
          size="large"
          onChange={onRegionChange}
          className="w-20"
        />
        <AutoComplete
          value={searchedUser}
          options={autocompleteOptions}
          className="flex-1"
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
