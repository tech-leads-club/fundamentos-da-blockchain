import { privateKeyToAccount } from "viem/accounts";
import { createPublicClient, formatEther, http, parseEther } from "viem";
import { sepolia } from "viem/chains";

async function run() {
  // TODO: Add a private key. Ensure it has some balance on it.
  const account = privateKeyToAccount("");

  const address = account.address;

  console.log("Address:", address);

  // TODO: Add a recipient address.
  const to = "";

  const value = parseEther("0.05");

  const client = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const { maxFeePerGas, maxPriorityFeePerGas } =
    await client.estimateFeesPerGas();

  console.log("Fee:", { maxFeePerGas, maxPriorityFeePerGas });

  console.log("Balance:", formatEther(await client.getBalance({ address })));

  const nonce = await client.getTransactionCount({ address });

  const tx = await account.signTransaction({
    to,
    value,
    chainId: sepolia.id,
    gas: BigInt(22000),
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
  });

  console.log("Transaction:", tx);

  const hash = await client.sendRawTransaction({
    serializedTransaction: tx,
  });

  console.log("Hash:", hash);
}

run();
