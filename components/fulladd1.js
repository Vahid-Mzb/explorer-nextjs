import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const Addresss = ({ fullAddress }) => {
  const [tooltip, setTooltip] = useState("Click to copy");
  const [isCopied, setIsCopied] = useState(false); // New state to manage copy status

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(fullAddress)
      .then(() => {
        setTooltip("Copied!");
        setIsCopied(true); // Indicate that text has been copied
        setTimeout(() => {
          setTooltip("Click to copy");
          setIsCopied(false); // Reset copy status
        }, 2000);
      })
      .catch((err) => console.error("Error copying text: ", err));
  };

  const abbreviateAddress = (address) =>
    `${address.slice(0, 11)}...${address.slice(-6)}`;

  return (
    <div
      onClick={copyToClipboard}
      title={tooltip}
      style={{
        cursor: "pointer",
        display: "inline-flex", // Use inline-flex for proper alignment
        alignItems: "center",
        padding: "5px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        position: "relative", // Needed for tooltip positioning
      }}
      onMouseEnter={() => setIsCopied(true)} // Show icon on hover
      onMouseLeave={() => setIsCopied(false)} // Hide icon when not hovering
    >
      {abbreviateAddress(fullAddress)}
      {isCopied && (
        <FontAwesomeIcon
          icon={faCopy}
          style={{ marginLeft: "5px", fontSize: "0.75rem" }}
        />
      )}
      {isCopied && (
        <span
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: "5px",
            padding: "2px 8px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "4px",
            fontSize: "0.75rem",
            whiteSpace: "nowrap",
          }}
        >
          {tooltip}
        </span>
      )}
    </div>
  );
};

export default Addresss;
