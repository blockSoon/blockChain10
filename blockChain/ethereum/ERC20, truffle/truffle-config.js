module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // ganache
      port: 8545,
      network_id: "*",
    },
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.13",
    },
  },
};
