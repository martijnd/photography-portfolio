import { Merriweather } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { PropsWithChildren } from "react";
const font = Merriweather({ weight: "400", subsets: ["latin"] });
export default function BaseLayout({
  children,
  title = "Photography",
}: PropsWithChildren<{ title?: string }>) {
  return (
    <main
      className={`relative mx-auto min-h-screen max-w-screen-lg p-4 ${font.className}`}
    >
      <Head>
        <title>{`${title} — Martijn Dorsman`}</title>
      </Head>
      <NavBar />
      {children}
    </main>
  );
}

function NavBar() {
  return (
    <div className="mx-10 flex justify-between py-8">
      <Link href="/">
        <h3>Martijn Dorsman Photography</h3>
      </Link>
      <div className="space-x-4">
        <Link href="/contact">Contact</Link>
      </div>
    </div>
  );
}
