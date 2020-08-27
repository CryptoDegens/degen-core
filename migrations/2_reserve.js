// ============ Contracts ============

const Reserve = artifacts.require("Reserve");

// ============ Main Migration ============

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployReserve(deployer, network),
  ]);
};

module.exports = migration;

// ============ Deploy Functions ============

async function deployReserve(deployer, network) {
  await deployer.deploy(Reserve);
}
