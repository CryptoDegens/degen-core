// ============ Contracts ============

const DegenToken = artifacts.require("DegenToken");
const Timelock = artifacts.require("Timelock");
const GovernorAlpha = artifacts.require("GovernorAlpha");

// ============ Main Migration ============

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployGovernance(deployer, network),
  ]);
};

module.exports = migration;

// ============ Deploy Functions ============

async function deployGovernance(deployer, network) {
  const degenToken = await DegenToken.deployed();
  await deployer.deploy(Timelock);
  await deployer.deploy(GovernorAlpha,
      Timelock.address,
      degenToken.address
  );
}
