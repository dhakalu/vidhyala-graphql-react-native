import React from "react";
import { Image } from "react-native";

const Avatar = ({ url = "https://via.placeholder.com/40" }) => {
  return (
    <Image
      source={{ uri: url }}
      style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 12 }}
    />
  );
};

export default Avatar;
