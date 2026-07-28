import "./index.css";
import "./App.css";

import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import HomePageV2 from "./components/HomePageV2";
import HomePageV3 from "./components/HomePageV3";

export default function App({ version = "v3" }) {
  return (
    <Layout>
      {version === "v1" ? <HomePage /> : version === "v2" ? <HomePageV2 /> : <HomePageV3 />}
    </Layout>
  );
}
