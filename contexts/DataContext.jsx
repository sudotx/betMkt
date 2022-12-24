import { createContext, useContext, useState } from "react";
import Web3 from "web3";
import Betmarket from "../abis/Betmarket.json";
import BetToken from "../abis/BetToken.json";

const DataContext = {
  account: "",
  loading: true,
  loadWeb3: async () => {},
  betmarket: null,
  betToken: null,
};

export const DataProvider = ({ children }) => {
  const data = useProviderData();

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);

export const useProviderData = () => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [betmarket, setBetmarket] = useState();
  const [betToken, setBetToken] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-Eth browser detected. Please consider using MetaMask.");
      return;
    }
    var allAccounts = await window.web3.eth.getAccounts();
    setAccount(allAccounts[0]);
    await loadBlockchainData();
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const betmarketData = Betmarket.networks["80001"];
    const betTokenData = BetToken.networks["80001"];

    if (betmarketData && betTokenData) {
      var tempContract = await new web3.eth.Contract(
        Betmarket.abi,
        betmarketData.address
      );
      setBetmarket(tempContract);
      var tempTokenContract = await new web3.eth.Contract(
        BetToken.abi,
        betTokenData.address
      );

      setBetToken(tempTokenContract);
    } else {
      window.alert("TestNet not found");
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return {
    account,
    betmarket,
    betToken,
    loading,
    loadWeb3,
  };
};
