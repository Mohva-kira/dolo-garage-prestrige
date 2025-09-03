import { Redirect } from "expo-router";
import React from "react";

const Home = () => {
  console.log("yoooo");

  return <Redirect href={"/(auth)/welcome" as any} />;
};
export default Home;
