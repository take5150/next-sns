import Post from "@/src/components/Post";
import Timeline from "@/src/components/Timeline";
import Head from "next/head";


export default function Home() {
  return (
    <>
      <Head>
        <title>SNS</title>
        <meta name="description" content="GEnerated by create next app"></meta>
        <link rel="stylesheet" href="/favicon.ico" />
      </Head>

      <Timeline />
    </>

  );
}
