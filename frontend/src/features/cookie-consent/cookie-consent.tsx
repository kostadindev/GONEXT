import { useEffect, useState } from "react";
import { Modal, Button } from "antd";

const COOKIE_CONSENT_KEY = "cookieConsent";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the modal only if no choice has been made
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent === null) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
    // Optionally, initialize non-essential cookies or scripts here
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setIsVisible(false);
    // Optionally, disable non-essential cookies or tracking scripts here
  };

  return (
    <Modal
      title="Cookie Consent"
      open={isVisible}
      footer={null}
      closable={false}
      centered
      maskClosable={false}
    >
      <p className="text-gray-600">
        We use cookies to personalize content, provide social media features,
        and analyze our traffic. By clicking “Accept”, you consent to our use of
        cookies. You can also{" "}
        <a href="/privacy-policy" className="text-blue-500 underline ml-1">
          learn more
        </a>
        .
      </p>
      <div className="flex justify-end mt-4 space-x-2">
        <Button onClick={handleDecline}>Decline</Button>
        <Button type="primary" onClick={handleAccept}>
          Accept
        </Button>
      </div>
    </Modal>
  );
};

export default CookieConsent;
