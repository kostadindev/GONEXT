import { Layout } from "antd";

export const Footer = () => {
  return (
    <Layout.Footer
      style={{
        textAlign: "center",
        padding: "10px 50px",
      }}
    >
      GoNext ©{new Date().getFullYear()}
    </Layout.Footer>
  );
};
