const { expect } = require('chai');
const {
  BN,
  expectEvent,
  expectRevert,
  constants,
} = require('@openzeppelin/test-helpers');
const MarToken = artifacts.require('MarToken');

contract('MarToken', function ([deployer, owner, recipient, anotherAccount]) {
  const initialAmount = new BN(110000000);
  const tokenName = 'MarTokenName';
  const tokenSymbol = 'MRT';
  const decimalUnits = new BN(18);
  const zeroAddress = constants.ZERO_ADDRESS;
  const custodianAddress = owner;

  beforeEach(async function () {
    this.token = await MarToken.new(
      tokenName,
      tokenSymbol,
      decimalUnits,
      initialAmount,
      custodianAddress,
      { from: deployer }
    );
  });

  describe('Deployment', function () {
    it('should assign the total supply of tokens to the custodian address', async function () {
      const totalSupply = await this.token.totalSupply();
      const custodianBalance = await this.token.balanceOf(custodianAddress);

      expect(totalSupply).to.be.bignumber.equal(
        initialAmount.mul(new BN(10).pow(decimalUnits))
      );
      expect(custodianBalance).to.be.bignumber.equal(totalSupply);
    });

    it('should set the correct name and symbol', async function () {
      const name = await this.token.name();
      const symbol = await this.token.symbol();

      expect(name).to.equal(tokenName);
      expect(symbol).to.equal(tokenSymbol);
    });

    it('should set the correct decimals', async function () {
      const decimals = await this.token.decimals();

      expect(decimals).to.be.bignumber.equal(decimalUnits);
    });
  });

  describe('Transactions', function () {
    it('should allow transfer of tokens', async function () {
      const transferAmount = new BN(100);
      await this.token.transfer(recipient, transferAmount, { from: owner });

      const recipientBalance = await this.token.balanceOf(recipient);
      expect(recipientBalance).to.be.bignumber.equal(transferAmount);
    });

    it('should not allow transfer from the zero address', async function () {
      await expectRevert(
        this.token.transfer(recipient, 100, { from: zeroAddress }),
        'ERC20: transfer from the zero address'
      );
    });

    it('should not allow transfer to the zero address', async function () {
      await expectRevert(
        this.token.transfer(zeroAddress, 100, { from: owner }),
        'ERC20: transfer to the zero address'
      );
    });
  });

  describe('Burn Functionality', function () {
    it('should burn the specified amount of tokens from the caller’s account', async function () {
      const burnAmount = new BN(100000);
      const preBurnBalance = await this.token.balanceOf(owner);

      await this.token.burn(burnAmount, { from: owner });

      const postBurnBalance = await this.token.balanceOf(owner);

      expect(postBurnBalance).to.be.bignumber.equal(
        preBurnBalance.sub(burnAmount)
      );
    });

    it('should emit a transfer event when burning tokens', async function () {
      const burnAmount = new BN(100);
      const receipt = await this.token.burn(burnAmount, { from: owner });

      expectEvent(receipt, 'Transfer', {
        from: owner,
        to: constants.ZERO_ADDRESS,
        value: burnAmount,
      });
    });

    it('should revert if the caller attempts to burn more tokens than they have', async function () {
      const burnAmount = initialAmount.add(
        new BN(210000000).mul(new BN(10).pow(decimalUnits))
      );
      await expectRevert(
        this.token.burn(burnAmount, { from: owner }),
        'ERC20: burn amount exceeds balance'
      );
    });
  });
});
