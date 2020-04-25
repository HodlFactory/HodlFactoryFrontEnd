import ClassicHodlFactory from "../contracts/ClassicHodlFactory.json";
import CharityHodlFactory from "../contracts/CharityHodlFactory.json";
import PonziHodlFactory from "../contracts/PonziHodlFactory.json";

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
  contracts: [ClassicHodlFactory, CharityHodlFactory, PonziHodlFactory],
};

export default options;
