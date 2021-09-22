// const MetaCoin = artifacts.require("MetaCoin");

// contract("MetaCoin", accounts => {
//   it("should put 10000 MetaCoin in the first account", async () => {
//     const instance = await MetaCoin.deployed();
//     const balance = await instance.getBalance.call(accounts[0]);
//     assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
//   });

//   it("should call a function that depends on a linked library", async () => {
//     const instance = await MetaCoin.deployed();
//     const metaCoinBalance = await instance.getBalance.call(accounts[0]);
//     const metaCoinBalanceInEth = await instance.getBalanceInEth.call(
//       accounts[0],
//     );

//     const expected = 2 * metaCoinBalance.toNumber();

//     assert.equal(await
//       metaCoinBalanceInEth.toNumber(),
//       expected,
//       "Library function returned unexpeced function, linkage may be broken",
//     );
//   });

//   it("should send coin correctly", async () => {
//     const instance = await MetaCoin.deployed();

//     const account1 = accounts[0];
//     const account2 = accounts[1];

//     // get initial balances
//     const initBalance1 = await instance.getBalance.call(account1);
//     const initBalance2 = await instance.getBalance.call(account2);

//     // send coins from account 1 to 2
//     const amount = 10;
//     await instance.sendCoin(account2, amount, { from: account1 });

//     // get final balances
//     const finalBalance1 = await instance.getBalance.call(account1);
//     const finalBalance2 = await instance.getBalance.call(account2);

//     assert.equal(
//       finalBalance1.toNumber(),
//       initBalance1.toNumber() - amount,
//       "Amount wasn't correctly taken from the sender",
//     );
//     assert.equal(
//       finalBalance2.toNumber(),
//       initBalance2.toNumber() + amount,
//       "Amount wasn't correctly sent to the receiver",
//     );
//   });
// });
const VolcanoToken = artifacts.require("VolcanoToken");

//Dummy test

 contract("VolcanoToken", () => {           
// it ("balance should be zero", async () => {
//     const volcanoToken= await VolcanoToken.deployed();
//     assert(volcanoToken.address !== '');
// })

it ("balance should be 1000", async () => {
    const volcanoToken= await VolcanoToken.deployed();
    const ownerAddress = await volcanoToken.owner();
    const balance = await volcanoToken.balanceOf(ownerAddress);
    assert(balance.toNumber()===1000)
   
})

it ("balance should be zero ", async () => {
    const volcanoToken= await VolcanoToken.deployed();
    // const ownerAddress = await volcanoToken.owner();
    const balance = await volcanoToken.balanceOf('0xcB7C09fEF1a308143D9bf328F2C33f33FaA46bC2');
    assert(balance.toNumber()===0)
   
})
});