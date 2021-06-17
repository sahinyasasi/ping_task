import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAll } from "../actions/urlActions";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listAll());
  }, [dispatch]);
  const getUrl = useSelector((state) => state.getUrl);
  console.log(getUrl);
  return (
    <div>
      <h2>I am Home Component</h2>
    </div>
  );
};
export default Home;
