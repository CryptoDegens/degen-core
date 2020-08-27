// ============ Contracts ============

const DegenToken = artifacts.require("DegenToken");
const Reserve = artifacts.require("Reserve");
const Timelock = artifacts.require("Timelock");
const GovernorAlpha = artifacts.require("GovernorAlpha");

// ============ Main Migration ============

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    releaseGovernance(deployer, network),
  ]);
};

module.exports = migration;

// ============ Deploy Functions ============

async function releaseGovernance(deployer, network) {
  const degenToken = await DegenToken.deployed();
  const reserve = await Reserve.deployed();
  const timelock = await Timelock.deployed();
  const gov = await GovernorAlpha.deployed();

  await degenToken.setGovernance(Timelock.address);
  await reserve.setGovernance(Timelock.address);

  await timelock.setPendingAdmin(gov.address);
  await gov.__acceptAdmin();
  await gov.__abdicate();
}
