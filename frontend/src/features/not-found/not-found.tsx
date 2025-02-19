// src/components/NotFound.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface NotFoundProps {
  type: "game" | "player";
}

const NotFound: React.FC<NotFoundProps> = ({ type }) => {
  const navigate = useNavigate();
  const message =
    type === "game"
      ? "The player you are looking for is not in an active game."
      : "The player you are looking for was not found. Please check if his name and tag are correct.";
  return (
    <Result
      status="404"
      icon={
        <ExclamationCircleOutlined
          style={{ fontSize: "48px", color: "#faad14" }}
        />
      }
      title={`${type?.charAt(0)?.toUpperCase() + type?.slice(1)} Not Found`}
      subTitle={message}
      extra={[
        <Button type="primary" onClick={() => navigate("/")}>
          Go Home
        </Button>,
        <Button onClick={() => navigate(-1)}>Go Back</Button>,
      ]}
    />
  );
};

export default NotFound;
