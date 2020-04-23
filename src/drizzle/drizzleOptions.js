import Web3 from "web3";
import ClassicHodlFactory from "../contracts/ClassicHodlFactory.json";

const fallbackUrl =
  "wss://mainnet.infura.io/ws/v3/e811479f4c414e219e7673b6671c2aba";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: fallbackUrl,
    },
    // customProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [ClassicHodlFactory],
};

export default options;
