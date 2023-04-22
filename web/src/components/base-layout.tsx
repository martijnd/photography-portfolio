import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
const inter = Inter({ subsets: ["latin"] });
export default function BaseLayout({ children }: PropsWithChildren) {
  return (
    <main
      className={`mx-auto min-h-screen max-w-screen-lg p-4 ${inter.className}`}
    >
      {children}
    </main>
  );
}
