
const configSwitch = (env) => {
    switch (env) {
        case 'development':
            return {
                BANCORCONVERTER_ADDRESS: '0x8903BF13678971a44711CEF27A46d42BF1b6A0E2',
                PLSTOKEN_ADDRESS: '0xbabcc2700e2abb3bebb52429c868bb077b9d7fcd',
                CONNECTOR_ADDRESS: '0x9c9640b2158376b65dACa5fD9565e7fE5f96Fa4f',
                RING_ADDRESS: '0x182722168cf8eff1e6db7527f6f2535dcfcd8d11',
                ETHERSCAN: 'https://kovan.etherscan.io',
                ETHEREUM_NETWORK: 42
            }
        case 'production':
            return {
                BANCORCONVERTER_ADDRESS: '0x8903BF13678971a44711CEF27A46d42BF1b6A0E2',
                PLSTOKEN_ADDRESS: '0xbabcc2700e2abb3bebb52429c868bb077b9d7fcd',
                CONNECTOR_ADDRESS: '0x9c9640b2158376b65dACa5fD9565e7fE5f96Fa4f',
                RING_ADDRESS: '0x182722168cf8eff1e6db7527f6f2535dcfcd8d11',
                ETHERSCAN: 'https://etherscan.io',
                ETHEREUM_NETWORK: 1
            }
    }
}

const config = configSwitch(process.env.REACT_APP_ENV)

export default config
