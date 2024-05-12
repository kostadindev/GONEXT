import { createContext, useContext } from "react";
import { notification } from "antd";

const NotificationContext = createContext<any>(null);
export const NotificationProvider = ({ children }: any) => {
  const setError = ({
    message,
    description,
  }: {
    message: string;
    description?: string;
  }) => {
    notification.open({
      message,
      description,
      type: "error",
      placement: "bottom",
    });
  };

  return (
    <NotificationContext.Provider value={{ setError }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
