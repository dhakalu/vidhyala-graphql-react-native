import React from "react";
import Text from "./Text";

interface ApolloErrorParserProps {
  error: any;
}

// UGLY Parese and display the error properly
const ApolloErrorParser = ({ error }: ApolloErrorParserProps) => {
  return error ? (
    <Text variant="small" color={"error"}>
      {JSON.stringify(error, null, 2)}
    </Text>
  ) : null;
};

export default ApolloErrorParser;
