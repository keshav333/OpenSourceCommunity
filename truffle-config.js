
const wallet = require("truffle-hdwallet-provider");

module.exports = {
  networks: {

    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 9545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },

   // rinkeby: {
   //    provider: () => new wallet('glad bone capable ball useless aware grunt huge armed destroy comfort warfare', `https://rinkeby.infura.io/v3/605980ca3e704192b7fb2b53b0f94eda`),
   //      network_id: 4,       // rinkeby's id
   //      gas: 4500000,        // rinkeby has a lower block limit than mainnet
   //      gasPrice: 10000000000
   //  },

    /*ropsten: {
      provider: () => new wallet('glad bone capable ball useless aware grunt huge armed destroy comfort warfare', `https://mainnet.infura.io/v3/605980ca3e704192b7fb2b53b0f94eda`),
       network_id: 3,       // Ropsten's id
       gas: 5500000,        // Ropsten has a lower block limit than mainnet
       confirmations: 2,    // # of confs to wait between deployments. (default: 0)
       timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
       skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
     },
   */
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
       version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
    }

  }
}
