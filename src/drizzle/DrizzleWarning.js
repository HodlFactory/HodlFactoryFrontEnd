import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const DrizzleWarning = () => {
  const drizzleInit = useSelector((state) => state.global.drizzleInit);

  if (drizzleInit) {
    return null;
  }

  return (
    <Alert variant="warning">
      Metamask not installed or not set to the correct network
    </Alert>
  );
};

export default DrizzleWarning;
