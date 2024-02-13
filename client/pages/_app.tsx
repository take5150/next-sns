import Navbar from "@/src/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      {/* アプリ全体で表示するために_app.tsxに記載 */}
      <Navbar></Navbar>
      <Component {...pageProps} />;
    </div>
  )
}
