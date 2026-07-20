import "./index.css";
import "./App.css";

import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import HomePageV2 from "./components/HomePageV2";

export default function App({ version = "v2" }) {
  return (
    <Layout>
      {version === "v1" ? <HomePage /> : <HomePageV2 />}
    </Layout>
  );
}
