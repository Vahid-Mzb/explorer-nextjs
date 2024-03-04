// If using CSS modules
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const Address = ({ fullAddress }) => {
  const [tooltip, setTooltip] = useState("Click to copy");

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(fullAddress)
      .then(() => {
        setTooltip("Copied!");
        setTimeout(() => setTooltip("Click to copy"), 2000);
      })
      .catch((err) => console.error("Error copying text: ", err));
  };

  const abbreviateAddress = (address) => {
    return `${address.slice(0, 10)}...${address.slice(-8)}`;
  };

  return (
    <div
      className={styles.addressContainer} // This container will control the hover
      onClick={copyToClipboard}
      title={tooltip}
      tabIndex="0"
      onKeyDown={(e) => e.key === "Enter" && copyToClipboard()}
    >
      {abbreviateAddress(fullAddress)}
      <span className={styles.copyIcon}>
        <FontAwesomeIcon icon={faCopy} />
      </span>
    </div>
  );
};

export default Address;
