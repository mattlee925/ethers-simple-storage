const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
  const provider = new ethers.providers.JsonRpcBatchProvider(
    process.env.PRC_URL
  )

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  )

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
  console.log("Deploying, please wait...")
  const contract = await contractFactory.deploy()
  await contract.deployTransaction.wait(1)

  const currentFavoriteNumber = await contract.retrieve()
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
