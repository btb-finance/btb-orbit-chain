import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const BTBFinance = await ethers.getContractFactory("BTBFinance");
  const btbFinance = await BTBFinance.deploy();
  await btbFinance.waitForDeployment();

  console.log("BTBFinance deployed to:", await btbFinance.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
