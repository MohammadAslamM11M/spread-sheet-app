import Head from "next/head";
import Spreadsheet from "../components/Spreadsheet";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spreadsheet App</title>
        <meta name="description" content="A simple spreadsheet application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Spreadsheet Application</h1>
        <Spreadsheet />
      </main>
    </div>
  );
}
