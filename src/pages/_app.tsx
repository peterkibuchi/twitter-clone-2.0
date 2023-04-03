import { ClerkProvider } from "@clerk/nextjs";
import { type AppType } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";

import "~/styles/globals.css";
import { api } from "~/utils/api";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Michelangelo AI</title>
        <meta
          name="Michelangelo AI"
          content="Text-to-Image AI Image Generator"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${inter.variable} font-sans`}>
        <Toaster position="bottom-center" />
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
