import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import fetchJson from "../lib/fetchJson";
import { NextPage } from "next/types";
import { ReactElement, ReactNode } from "react";
import Layout from "../components/Layout";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
