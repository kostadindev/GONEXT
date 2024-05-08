import { Input, Select, Space } from "antd";
import React, { useState, useEffect } from "react";

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

export default function GlobalSearch({}) {
  const onSearch = (searchedUser: string) => {
    console.log(searchedUser.split("#"));
  };

  return (
    <Space>
      <Space.Compact size="large" style={{ width: "600px" }}>
        <Select
          defaultValue="NA"
          options={options}
          size="large"
          variant="filled"
        />
        <Search
          variant="filled"
          placeholder="Doublelift"
          onSearch={onSearch}
          enterButton
        />
      </Space.Compact>
    </Space>
  );
}
