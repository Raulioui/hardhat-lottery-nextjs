import Moralis from 'moralis';
import { EvmChain } from "@moralisweb3/evm-utils";
import { useMoralis } from "react-moralis"
import { contractAddresses } from "@/constants"

require("dotenv").config()
const {chainId: chainIdHex} = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = 
        chainId in contractAddresses ? contractAddresses[chainId][0]
            : null

Moralis.start({
    apiKey: `${process.env.MORALIS_API_KEY}`,
});

const stream = {
    chains: [EvmChain.ETHEREUM], 
    description: "raffle contract",
    tag: "raffle",
    webhookUrl: "https://webhook.site/f5a73f22-355b-4561-82af-c20fe76cbe5d", // webhook url to receive events,
    includeNativeTxs: true
}

const newStream = await Moralis.Streams.add(stream);
const { id } = newStream.toJSON();

await Moralis.Streams.addAddress({ raffleAddress, id });