import React from "react";
import DiscussionCard from "./DiscussionCard";

const DiscussionDetail = ({ ...props }) => {
  return <DiscussionCard {...props} showDetail />;
};

export default DiscussionDetail;
