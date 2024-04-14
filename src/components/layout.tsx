import Header from "./header";
import Footer from "./footer";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export function MDXLayout({ children }: PropsWithChildren) {
  return (
    <main className="sm:mx-auto max-w-6xl mx-2 my-2 sm:my-4">{children}</main>
  );
}
