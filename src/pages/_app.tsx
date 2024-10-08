import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Favicon from "@/images/favicon.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { LanguageContext } from "@/lib/language";
import { Transition } from "@headlessui/react";
import Foss4g2024Logo from "@/images/logo/logo-horizontal.png";

export default function App({ Component, pageProps }: AppProps) {
  const [language, setLanguage] = useState<"en" | "es" | "pt">("en");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const router = useRouter();
  const isHomePage = router.asPath == "/";
  const metadata = pageProps?.metadata;

  useEffect(() => {
    if (router.asPath == "/") {
      const lang = navigator.language.split("-")[0].toLowerCase();

      if (["es", "pt"].includes(lang)) {
        router.push(`/${lang}`);
        // @ts-ignore
        setLanguage(lang);
      } else {
        router.push(`/en`);

        setLanguage("en");
      }
    } else {
      const [lang, pageSlug] = router.asPath
        .split("/")
        .filter((part) => part != "");

      if (["en", "es", "pt"].includes(lang)) {
        // @ts-ignore
        setLanguage(lang);
      } else {
        setLanguage("en");
      }
    }

    setIsLoaded(true);
  }, [router.asPath]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="min-h-full">
        <Head>
          <link rel="icon" href={Favicon.src} />
          {metadata && (
            <>
              <title>{metadata["title"]}</title>
              <meta property="og:type" content="website" />

              <meta property="twitter:card" content="summary" />

              <meta property="description" content={metadata["description"]} />
              <meta
                name="twitter:description"
                content={metadata["description"]}
              />

              <meta property="twitter:title" content={metadata["title"]} />
              <meta property="og:title" content={metadata["title"]} />
              {/* url */}
              <meta
                property="og:url"
                content={`${process.env.baseUrl}${router.asPath}`}
              />
              <meta
                name="twitter:url"
                content={`${process.env.baseUrl}${router.asPath}`}
              />
              {/* image */}
              {metadata["image"] ? (
                <>
                  <meta
                    property="og:image"
                    content={`${process.env.baseUrl}${metadata["image"].src}`}
                  />
                  <meta
                    name="twitter:image"
                    content={`${process.env.baseUrl}${metadata["image"].src}`}
                  />
                </>
              ) : (
                <>
                  <meta
                    property="og:image"
                    content={`${process.env.baseUrl}${Foss4g2024Logo.src}`}
                  />
                  <meta
                    name="twitter:image"
                    content={`${process.env.baseUrl}${Foss4g2024Logo.src}`}
                  />
                </>
              )}
            </>
          )}
        </Head>
        <Transition
          show={isLoaded && !isHomePage}
          enter="transition duration-1200 ease-in"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
        >
          {isLoaded && (
            <>
              <Header />
              <div className="relative z-20">
                <Component {...pageProps} />
              </div>
              {!["/en/map/", "/es/mapa/", "/pt/mapa/"].includes(router.asPath) && (
                <Footer />
              )}
            </>
          )}
        </Transition>
      </div>
    </LanguageContext.Provider>
  );
}
