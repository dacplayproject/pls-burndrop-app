
const configSwitch = (env) => {
    switch (env) {
        case 'development':
            return {
                BANCORCONVERTER_ADDRESS: '0x3E428B22f04d52c325a2b693aaE8297f5b517a2C',
                PLSTOKEN_ADDRESS: '0xc417dc45e003359f3b6d7ff89b8c66d44635da00',
                EXCHANGE_ADDRESS: '0x51184ce3e6e4316c17c487fb30d30a23afcfda97',
                RING_ADDRESS: '0xc0935d19660674f0f6e9ad3d2d56196fb10e109e',
                ETHERSCAN: 'https://kovan.etherscan.io',
                ETHEREUM_NETWORK: 42
            }
        case 'production':
            return {
                BANCORCONVERTER_ADDRESS: '0x3E428B22f04d52c325a2b693aaE8297f5b517a2C',
                PLSTOKEN_ADDRESS: '0xc417dc45e003359f3b6d7ff89b8c66d44635da00',
                EXCHANGE_ADDRESS: '0x51184ce3e6e4316c17c487fb30d30a23afcfda97',
                RING_ADDRESS: '0xc0935d19660674f0f6e9ad3d2d56196fb10e109e',
                ETHERSCAN: 'https://etherscan.io',
                ETHEREUM_NETWORK: 1
            }
    }
}

const config = configSwitch(process.env.REACT_APP_ENV)

export default config
