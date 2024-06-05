import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 6);

const user = getKeypairFromEnvironment("SECRET_KEY");

const tokenMintAccount = new PublicKey(
  "GiBhrym4sxNR7uuDhK5YbwEkqMcTaWuN3PU1dJ8fmSmj"
);

const recipientAssociatedTokenAccount = new PublicKey(
  "AqKeCdfi621MJ1Rb329Rwtbb2miLs3y48V43cB6XNJrU"
);

const transactionSignature = await mintTo(
  connection,
  user,
  tokenMintAccount,
  recipientAssociatedTokenAccount,
  user,
  10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`✅ Success! Mint Token Transaction: ${link}`);
