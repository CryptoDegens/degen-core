// ============ Contracts ============

const DegenToken = artifacts.require("DegenToken");
const Reserve = artifacts.require("Reserve");

// ============ Main Migration ============

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployToken(deployer, network),
  ]);
};

module.exports = migration;

// ============ Deploy Functions ============

async function deployToken(deployer, network) {
  const reserve = await Reserve.deployed();
  await deployer.deploy(DegenToken, reserve.address);
}
