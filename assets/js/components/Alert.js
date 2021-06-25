import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "reactstrap";

const Alert1 = () => {
  const alerts = useSelector((state) => state.alert);
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Alert color="success" key={alert.id}>
        {alert.msg}
      </Alert>
    ))
  );
};

export default Alert1;
