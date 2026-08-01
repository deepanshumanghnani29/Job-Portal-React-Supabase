import React, { useState } from "react";

const Card = (props) => {
  const [isSaved, setIsSaved] = useState(false);

  // Generate initial letter avatar if brand logo isn't available
  const companyInitial = props.company ? props.company.charAt(0).toUpperCase() : "G";

  return (
    <div className="card">
      <div className="top">
        <div className="company-logo">
          {props.brandLogo ? (
            <img src={props.brandLogo} alt={props.company} />
          ) : (
            <div className="avatar-placeholder">{companyInitial}</div>
          )}
        </div>
        <button 
          className={`save-btn ${isSaved ? "saved" : ""}`} 
          onClick={() => setIsSaved(!isSaved)}
          title="Save job"
        >
          {isSaved ? "🔖 Saved" : "🔖 Save"}
        </button>
      </div>

      <div className="center">
        <div className="company-info">
          <span className="company-name">{props.company}</span>
          {props.dayposted && <span className="post-date">{props.dayposted}</span>}
        </div>
        <h2 className="job-title">{props.post}</h2>
        <div className="tag-group">
          <span className="badge badge-primary">{props.tag1}</span>
          <span className="badge badge-secondary">{props.tag2}</span>
        </div>
      </div>

      <div className="bottom">
        <div className="pay-location">
          <h3 className="pay-rate">{props.pay}</h3>
          <p className="location-text" title={props.location}>
            📍 {props.location || "Remote"}
          </p>
        </div>
        <button onClick={props.onApply} className="apply-btn">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default Card;