import { Layout } from "@/components";
import ThemeProvider from "@/providers/Theme";
import createEmotionCache from "@/utils/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import "@fontsource/poppins";
import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";

type ExtendedAppProps = {
  emotionCache?: EmotionCache;
} & AppProps;

const clientSideEmotionCache = createEmotionCache();
export default function App(props: ExtendedAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}
