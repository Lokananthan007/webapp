import React, { useState } from "react";
import "../styles/Invite.css";

export default function Invite() {
  const [inviteLink] = useState("http://iearnings.in/");

  // Copy to Clipboard (Web)
  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${label} copied to clipboard`);
    } catch (err) {
      alert("Failed to copy");
    }
  };

  // Share Invite (Web Share API)
  const shareInvite = async () => {
    const message = `Join me using this invite link: ${inviteLink}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Invite",
          text: message,
          url: inviteLink,
        });
      } catch (error) {
        alert("Sharing cancelled");
      }
    } else {
      alert("Sharing not supported on this browser");
    }
  };

  return (
    <div className="invite-container">
      <h2 className="header">Invitation Center</h2>
      <p className="subHeader">Invite your friends & earn rewards</p>

      <div className="card">
        <h3 className="sectionTitle">Invite Your Friends!</h3>
        <p className="description">
          Share your invite code or invite link and get bonus points when your
          friends sign up.
        </p>

        <label className="label">Your Invite Link</label>
        <div className="inputRow">
          <input
            type="text"
            value={inviteLink}
            readOnly
            className="input"
          />
          <button
            className="copyButton"
            onClick={() => copyToClipboard(inviteLink, "Invite link")}
          >
            Copy
          </button>
        </div>

        <button className="shareButton" onClick={shareInvite}>
          Share
        </button>
      </div>
    </div>
  );
}
