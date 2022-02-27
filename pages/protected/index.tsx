import { ReactElement } from "react";
import Layout from "../../components/Layout";

export default function Protected() {
  return (
    <div>
      <h1>this route is protected!!!</h1>
    </div>
  );
}

Protected.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
