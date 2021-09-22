 import Web3 from "web3";
import volcanotokenArtifact from "../../build/contracts/VolcanoToken.json";
const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = volcanotokenArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        volcanotokenArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.refreshBalance();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  refreshBalance: async function() {
    const { balanceOf } = this.meta.methods;
    const balance = await balanceOf(this.account).call();

    const balanceElement = document.getElementsByClassName("balance")[0];
    console.log(balanceElement)
    balanceElement.innerHTML = balance;
  },

  transfer: async function() {
    const amount = parseInt(document.getElementById("amount").value);
    console.log(amount)
    const receiver = document.getElementById("receiver").value;
    console.log(receiver)

    this.setStatus("Initiating transaction... (please wait)");

    const { transfer } = this.meta.methods;
   const receipt= await transfer( amount,receiver).send({ from: this.account });
console.log(receipt);
const response= await this.meta.getPastEvents('transferE',{fromBlock:0});
console.log(response);
this.setStatus("Transaction complete!");
    this.refreshBalance();
  },

  changeTotalSupply: async function() {
     const{changeTotalSupply}=this.meta.methods;
     await changeTotalSupply().send({ from: this.account });
    this.refreshBalance();
   

  },
  getPaymentInfo: async function() {
    const index = document.getElementById("index").value;
    console.log(index);
  
    const{getPaymentInfo}=this.meta.methods;
    const s=await getPaymentInfo(this.account, index).call();
    const data=document.getElementById("data");
data.innerHTML=s;
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});
