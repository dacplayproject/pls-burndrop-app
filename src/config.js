
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
            // return {
            //     BANCORCONVERTER_ADDRESS: '0x601a3fca895d5fd4a4ef773ed3f35ea28e59844f',
            //     PLSTOKEN_ADDRESS: '0xe43ac1714f7394173b15e7cff31a63d523ce4fb9',
            //     EXCHANGE_ADDRESS: '0x41ff12388bbe30816bdc7158f39c125ff025d29f',
            //     RING_ADDRESS: '0x9469d013805bffb7d3debe5e7839237e535ec483',
            //     ETHERSCAN: 'https://etherscan.io',
            //     ETHEREUM_NETWORK: 1
            // }
        case 'production':
            return {
                BANCORCONVERTER_ADDRESS: '0x601a3fca895d5fd4a4ef773ed3f35ea28e59844f',
                PLSTOKEN_ADDRESS: '0xe43ac1714f7394173b15e7cff31a63d523ce4fb9',
                EXCHANGE_ADDRESS: '0x41ff12388bbe30816bdc7158f39c125ff025d29f',
                RING_ADDRESS: '0x9469d013805bffb7d3debe5e7839237e535ec483',
                ETHERSCAN: 'https://etherscan.io',
                ETHEREUM_NETWORK: 1
            }
    }
}

const config = configSwitch(process.env.REACT_APP_ENV)

export default config
