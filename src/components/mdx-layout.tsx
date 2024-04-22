import { PropsWithChildren } from "react";
import Head from "next/head";

export default function MDXLayout({
  metadata = null,
  children,
}: PropsWithChildren<{ metadata: null | { [key: string]: string } }>) {
  return (
    <>
      <Head>
        <title>{metadata?.title}</title>
        {metadata?.description && (
          <meta name="description" content={metadata.description} key="desc" />
        )}
      </Head>
      <main className="6xl:mx-auto max-w-6xl px-4 my-4 6xl:px-2 6xl:my-4">
        {children}
      </main>
    </>
  );
}
