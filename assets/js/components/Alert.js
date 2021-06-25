import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";

const Alerts = () => {
  const alerts = useSelector((state) => state.alert);
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Alert variant="filled" severity={alert.alertType} key={alert.id}>
        {alert.msg}
      </Alert>
    ))
  );
};

export default Alerts;
