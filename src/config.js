
const configSwitch = (env) => {
    switch (env) {
        case 'development':
            return {
                PLSTOKEN_ADDRESS: '0x95C92D48023507A544220b43D33ca0e02F94F48c',
                EXCHANGE_ADDRESS: '0xd412404900A60EE8F7C91ab8a5832c9d18Ac2593',
                RING_ADDRESS: '0xb52FBE2B925ab79a821b261C82c5Ba0814AAA5e0',
                ETHERSCAN: 'https://ropsten.etherscan.io',
                ETHEREUM_NETWORK: 3
            }
        case 'production':
            return {
                PLSTOKEN_ADDRESS: '0xe43ac1714f7394173b15e7cff31a63d523ce4fb9',
                EXCHANGE_ADDRESS: '0x7ca54a57d65cf66bD315A386f37BB2b3b33B5F01',
                RING_ADDRESS: '0x9469d013805bffb7d3debe5e7839237e535ec483',
                ETHERSCAN: 'https://etherscan.io',
                ETHEREUM_NETWORK: 1
            }
    }
}

const config = configSwitch(process.env.REACT_APP_ENV)

export default config
