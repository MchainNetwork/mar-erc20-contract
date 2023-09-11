const MarToken = artifacts.require('MarToken');

module.exports = function (deployer) {
  const tokenName = 'Mchain';
  const tokenSymbol = 'MAR';
  const decimalUnits = 18;
  const initialAmount = 110000000;
  const custodianAddress = process.env.CUSTODIAN_ADDRESS;

  deployer.deploy(
    MarToken,
    tokenName,
    tokenSymbol,
    decimalUnits,
    initialAmount,
    custodianAddress
  );
};
