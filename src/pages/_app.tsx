import { Layout, NextProgress } from "@/components";
import CartProvider from "@/providers/Cart";
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
        <CssBaseline enableColorScheme />
        <NextProgress />
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
