const VolcanoToken = artifacts.require("VolcanoToken");

module.exports = function(deployer) {
  deployer.deploy(VolcanoToken);
};
