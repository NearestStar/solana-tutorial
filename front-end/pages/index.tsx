import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import WalletContextProvider from "../components/WalletContextProvider";
import { AppBar } from "../components/AppBar";
import { BalanceDisplay } from "../components/BalanceDisplay";
import { SendSolForm } from "../components/SendSolForm";
import Head from "next/head";
import { PingButton } from "../components/PingButton";

const Home: NextPage = (props) => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Solana Tutorial</title>
        <link rel="icon" href="/sol.ico" />
        <meta name="description" content="Send your sols" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <BalanceDisplay />
          <SendSolForm />
          <PingButton />
        </div>
      </WalletContextProvider>
    </div>
  );
};

export default Home;
