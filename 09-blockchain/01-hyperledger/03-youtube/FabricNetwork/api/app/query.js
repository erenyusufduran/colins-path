const { Gateway, Wallets } = require("fabric-network");
const helper = require("./helper");

const query = async (channelName, chaincodeName, args, fcn, username, orgName) => {
  try {
    const ccp = await helper.getCCP(orgName);
    const walletPath = await helper.getWalletPath(orgName);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    let identity = await wallet.get(username);
    if (!identity) {
      console.log(`An identity for the user ${username} does not exist in the wallet, so registering user`);
      await helper.getRegisteredUser(username, orgName, true);
      identity = await wallet.get(username);
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: username,
      discovery: { enabled: true, asLocalhost: true },
    });
    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);
    let result;
    switch (fcn) {
      case "GetDocumentUsingCarContract":
        console.log("=============");
        result = await contract.evaluateTransaction("SmartContract:" + fcn, args[0]);
        break;
      case "GetHistoryForAsset":
      case "GetCarById":
        console.log("=============");
        result = await contract.evaluateTransaction(fcn, args[0]);
        break;
      default:
        break;
    }
    console.log(result);
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    result = JSON.parse(result.toString());
    return result;
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    return error.message;
  }
};

exports.query = query;