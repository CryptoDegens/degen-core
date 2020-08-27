// ============ Contracts ============

const DegenToken = artifacts.require("DegenToken");
const WETHPool = artifacts.require("WETHPool");
const WBTCPool = artifacts.require("WBTCPool");
const COMPPool = artifacts.require("COMPPool");
const SNXPool = artifacts.require("SNXPool");
const MKRPool = artifacts.require("MKRPool");
const LENDPool = artifacts.require("LENDPool");
const YYCRVPool = artifacts.require("YYCRVPool");
const YALINKPool = artifacts.require("YALINKPool");
const YYFIPool = artifacts.require("YYFIPool");
const YUSDCPool = artifacts.require("YUSDCPool");

const WETHDegenPool = artifacts.require("WETHDegenPool");
const YFIDegenPool = artifacts.require("YFIDegenPool");
const YCRVDegenPool = artifacts.require("YCRVDegenPool");
const USDCDegenPool = artifacts.require("USDCDegenPool");
const USDTDegenPool = artifacts.require("USDTDegenPool");
const DAIDegenPool = artifacts.require("DAIDegenPool");

const StakingPool = artifacts.require("StakingPool");

// ============ Main Migration ============

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployPools(deployer, network),
  ]);
};

module.exports = migration;

// ============ Deploy Functions ============

async function deployPools(deployer, network) {
  const degenToken = await DegenToken.deployed();

  // create seed pools
  const wethPool = await deployer.deploy(WETHPool, degenToken.address);
  await setupPool(degenToken, wethPool, '1000000000000000000000000'); // 1,000,000
  const wbtcPool = await deployer.deploy(WBTCPool, degenToken.address);
  await setupPool(degenToken, wbtcPool, '1000000000000000000000000');
  const compPool = await deployer.deploy(COMPPool, degenToken.address);
  await setupPool(degenToken, compPool, '1000000000000000000000000');
  const snxPool = await deployer.deploy(SNXPool, degenToken.address);
  await setupPool(degenToken, snxPool, '1000000000000000000000000');
  const mkrPool = await deployer.deploy(MKRPool, degenToken.address);
  await setupPool(degenToken, mkrPool, '1000000000000000000000000');
  const lendPool = await deployer.deploy(LENDPool, degenToken.address);
  await setupPool(degenToken, lendPool, '1000000000000000000000000');
  const yycrvPool = await deployer.deploy(YYCRVPool, degenToken.address);
  await setupPool(degenToken, yycrvPool, '1000000000000000000000000');
  const yalinkPool = await deployer.deploy(YALINKPool, degenToken.address);
  await setupPool(degenToken, yalinkPool, '1000000000000000000000000');
  const yyfiPool = await deployer.deploy(YYFIPool, degenToken.address);
  await setupPool(degenToken, yyfiPool, '1000000000000000000000000');
  const yusdcPool = await deployer.deploy(YUSDCPool, degenToken.address);
  await setupPool(degenToken, yusdcPool, '1000000000000000000000000');

  // create lp pools
  const wethDegenPool = await deployer.deploy(WETHDegenPool, degenToken.address);
  await setupPool(degenToken, wethDegenPool, '8000000000000000000000000'); // 8,000,000
  const yfiDegenPool = await deployer.deploy(YFIDegenPool, degenToken.address);
  await setupPool(degenToken, yfiDegenPool, '8000000000000000000000000');
  const ycrvDegenPool = await deployer.deploy(YCRVDegenPool, degenToken.address);
  await setupPool(degenToken, ycrvDegenPool, '8000000000000000000000000');
  const usdcDegenPool = await deployer.deploy(USDCDegenPool, degenToken.address);
  await setupPool(degenToken, usdcDegenPool, '8000000000000000000000000');
  const usdtDegenPool = await deployer.deploy(USDTDegenPool, degenToken.address);
  await setupPool(degenToken, usdtDegenPool, '8000000000000000000000000');
  const daiDegenPool = await deployer.deploy(DAIDegenPool, degenToken.address);
  await setupPool(degenToken, daiDegenPool, '8000000000000000000000000');

  // create staking pool
  const stakingPool = await deployer.deploy(StakingPool, degenToken.address);
  await setupPool(degenToken, stakingPool, '12000000000000000000000000'); // 12,000,000
}

async function setupPool(degenToken, pool, seedAmount) {
  await degenToken.mint(pool.address, seedAmount);
  await pool.notifyRewardAmount(seedAmount);
  await pool.setRewardDistribution('0x0000000000000000000000000000000000000000');
  await pool.renounceOwnership();
}
