import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { resolve } from "@bonfida/spl-name-service";

const publicKey = new PublicKey("52C9T2T7JRojtxumYnYZhyUmrN7kqzvCLc4Ksvjk7TxD");

function validateAddress(address: string): boolean {
  try {
    const pubkey = new PublicKey(address);
    const isSolana = PublicKey.isOnCurve(publicKey.toBuffer());
    return isSolana;
  } catch (error) {
    return false;
  }
}

async function resolveDomain(
  domain: string,
  connection: Connection
): Promise<PublicKey | null> {
  try {
    const pubkey = await resolve(connection, domain);
    return pubkey;
  } catch (error) {
    console.error(`Failed to resolve domain ${domain}`, error);
    return null;
  }
}

async function fetchBalance(): Promise<void> {
  const connection = new Connection(
    "https://api.mainnet-beta.solana.com",
    "confirmed"
  );
  const domains = ["toly.sol", "shaq.sol", "mccann.sol"];
  for (const domain of domains) {
    const publicKey = await resolveDomain(domain, connection);
    if (publicKey && validateAddress(publicKey.toBase58())) {
      const balanceInLamports = await connection.getBalance(publicKey);
      const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
      console.log(
        `💰 Finished! The balance for the wallet at address ${publicKey.toBase58()} (${domain}) is ${balanceInSOL} SOL`
      );
    } else {
      console.log(`❌ Invalid or unresolved address for domain ${domain}`);
    }
  }
}

fetchBalance();
