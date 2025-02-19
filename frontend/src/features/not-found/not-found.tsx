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

  return (
    <Result
      status="404"
      icon={
        <ExclamationCircleOutlined
          style={{ fontSize: "48px", color: "#faad14" }}
        />
      }
      title="404 Not Found"
      subTitle={`The ${type} you are looking for does not exist or has been removed.`}
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
