// src/components/NotFound.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface NotFoundProps {
  type?: "game" | "player";
  name?: string;
  tag?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ type, name, tag }) => {
  const navigate = useNavigate();

  let title, message;

  switch (type) {
    case "game":
      title = "Game Not Found";
      message =
        name && tag ? (
          <div style={{ fontStyle: "bold" }}>
            Player <b>{name}</b>
            <span style={{ color: "gray", fontStyle: "italic", marginLeft: 2 }}>
              #{tag}
            </span>{" "}
            is not currently in a game.
          </div>
        ) : (
          "The player you are looking for is not in an active game."
        );
      break;
    case "player":
      title = "Player Not Found";
      message =
        name && tag ? (
          <div style={{ fontStyle: "bold" }}>
            Player <b>{name}</b>
            <span style={{ color: "gray", fontStyle: "italic", marginLeft: 2 }}>
              #{tag}
            </span>{" "}
            was not found. Please check if their name and tag are correct.
          </div>
        ) : (
          "The player you are looking for was not found."
        );
      break;
    default:
      title = "404 Not Found";
      message = "The page you are looking for does not exist.";
  }

  return (
    <Result
      status="404"
      icon={
        <ExclamationCircleOutlined
          style={{ fontSize: "48px", color: "#faad14" }}
        />
      }
      title={title}
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
