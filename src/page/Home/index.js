import React, {Component} from "react";
import {Container, Row, Col, Button, Card} from 'react-bootstrap'
import styles from './style.module.scss'

import ring from './img/ring.png'
import pls from './img/pls.png'
import plsTokenABI from './PlsTokenABI'
import PlsBurndropABI from './PlsBurndropABI'
import CONFIG from '../../config'


import {withTranslation} from "react-i18next";
import Web3 from 'web3';
import debounce from 'lodash/debounce'

class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            account: '',
            sellAmount: 0,
            finalAmount: 0,
            hash: '',
            status: '',
            error: '',
            plsBalance: ''
        }
        this.txTimer = 0
        this.delayedCallback = debounce(this.tokenInputHandle, 800)
    }

    componentDidMount() {
        if (typeof window.web3 !== 'undefined') {
            this.connect()
        } else {
            this.connect()
        }
    }

    connect() {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.enable()
                .then((account) => {

                    const web3js = new Web3(window.web3.currentProvider);
                    const networkid = web3js.eth.net.getId()
                    networkid.then((id) => {
                        if (id != CONFIG.ETHEREUM_NETWORK) {
                            alert('Ethereum Network Error')
                        }
                    })

                    if (window.ethereum.on) {
                        window.ethereum.on('accountsChanged', (accounts) => {
                            if (accounts.length > 0) {
                                this.setState({
                                    account: accounts[0]
                                })
                            }

                        })
                    }

                    if (account.length > 0) {

                        let plsContract = new web3js.eth.Contract(plsTokenABI, CONFIG.PLSTOKEN_ADDRESS);

                        plsContract.methods.balanceOf(account[0]).call({from: account[0]}).then((result) => {
                            const _plsBalance = web3js.utils.toBN(result).div(web3js.utils.toBN(1000000000000000000))
                            this.setState({
                                plsBalance: _plsBalance.toString()
                            })
                        })

                        this.setState({
                            account: account[0]
                        })
                    }
                })
                .catch(console.error)
        }
    }

    getPurchaseReturn = (depositAmount) => {
        try {
            const {account} = this.state
            let web3js = new Web3(window.ethereum || window.web3.currentProvider);

            let burndropContract = new web3js.eth.Contract(PlsBurndropABI, CONFIG.EXCHANGE_ADDRESS);

            const _depositAmount = web3js.utils.toBN(depositAmount).mul(web3js.utils.toBN(1000000000000000000)).toString()
            burndropContract.methods.convertFor(_depositAmount).call({from: account}).then((result) => {
                const _finalAmout = web3js.utils.toBN(result).div(web3js.utils.toBN(1000000000000000000))
                this.setState({
                    finalAmount: _finalAmout
                })
            });
        } catch (e) {
            console.log(e)
        }
    }

    startSwap = () => {
        const {account, sellAmount} = this.state
        let web3js = new Web3(window.ethereum || window.web3.currentProvider);

        let plsContract = new web3js.eth.Contract(plsTokenABI, CONFIG.PLSTOKEN_ADDRESS);
        let transferNum = web3js.utils.toBN(sellAmount).mul(web3js.utils.toBN(1000000000000000000))

        // plsContract.methods.transfer("", transferNum.toString(), '0x0000000000000000000000000000000000000000000000000000000000000001').estimateGas({from: account})
        //     .then(function (gasAmount) {
        this.txTimer = plsContract.methods.transfer(CONFIG.EXCHANGE_ADDRESS, transferNum.toString(), '0x0000000000000000000000000000000000000000000000000000000000000000').send({from: account})
            .on('transactionHash', (hash) => {
                this.setState({
                    status: 'pending',
                    hash: hash
                })
            })
            .on('confirmation', function (confirmationNumber, receipt) {
            })
            .on('receipt', (receipt) => {
                this.setState({
                    status: 'success',
                    hash: receipt.transactionHash
                })
                console.log(receipt.transactionHash);
            })
            .on('error', (err, receipt) => {
                console.log(err, receipt)
                this.setState({
                    status: 'error',
                    error: receipt
                })
            });
        // })

    }

    tokenInputHandle = (e) => {
        this.setState({
            sellAmount: e.target.value
        })

        this.getPurchaseReturn(e.target.value)
    }

    debounceInput(event) {
        event.persist()
        this.delayedCallback(event)
    }

    etherscanTX = (hash) => {
        return `${CONFIG.ETHERSCAN}/tx/${hash}`
    }

    goback = () => {
        this.setState({
            status: '',
            error: '',
            hash: '',
            finalAmount: 0
        })
        window.location.reload()
    }

    render() {
        const {finalAmount, hash, status, error, sellAmount, plsBalance} = this.state
        return (
            <div>
                <Container className={styles.spaceSection}>
                    <a className="external" id="walletanddapp"></a>
                    <Row className={['justify-content-md-center']}>
                        <Col lg={9} className={styles.sectionTitle}>
                            <h1>DAC PLAY BURNDROP</h1>
                            <p>You can choose to get RING token by burning PLS token.</p>
                        </Col>

                        {status === '' ? <Col lg={9}>
                            <div className={styles.tokenForm}>
                                <Row noGutters={true}>
                                    <Col xs={12} sm={6}>
                                        <div className={styles.tokenItem}>
                                            <div className={styles.tokenItemContainer}>
                                                <div className={styles.tokenItemLogoContainer}>
                                                    <img src={pls}/>
                                                </div>
                                                <p>PLS Token</p>
                                            </div>
                                            <div className={styles.tokenInput}>
                                                <label>
                                                    You have {plsBalance} PLS, You will send
                                                    <input type="number" min={0}
                                                           onInput={this.debounceInput.bind(this)}/>
                                                </label>
                                            </div>
                                        </div>

                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <div className={`${styles.tokenItem} ${styles.tokenGet}`}>
                                            <div className={styles.tokenItemContainer}>
                                                <div className={styles.tokenItemLogoContainer}>
                                                    <img src={ring}/>
                                                </div>
                                                <p>RING Token</p>
                                            </div>
                                            <div className={styles.tokenInput}>
                                                <label>
                                                    You will get
                                                    <input type="text" disabled="disabled" value={`≈${finalAmount}`}/>
                                                </label>
                                            </div>
                                        </div>

                                    </Col>
                                </Row>
                            </div>

                            <Button className={styles.swapBtn} variant="primary" size="lg" block
                                    disabled={sellAmount ? '' : 'disabled'} onClick={() => {
                                this.startSwap()
                            }}>
                                Start
                            </Button>
                        </Col> : null}

                        {status === 'pending' ? <Col lg={9}>
                            <Card className="text-center">
                                <Card.Body>
                                    <Card.Title>Transaction is pending...</Card.Title>
                                    <Card.Link  target={'_blank'} href={this.etherscanTX(hash)}>
                                        {hash}
                                    </Card.Link>
                                </Card.Body>
                            </Card>
                        </Col> : null}


                        {status === 'success' ? <Col lg={9}>
                            <Card className="text-center">
                                <Card.Body>
                                    <Card.Title>Transaction is confirmed</Card.Title>
                                    <Card.Text>
                                        <Card.Link target={'_blank'} href={this.etherscanTX(hash)}>
                                            {hash}
                                        </Card.Link>
                                    </Card.Text>
                                    <Button variant="primary" className={styles.btnColor} onClick={() => this.goback()}>Go
                                        Back</Button>
                                </Card.Body>
                            </Card>
                        </Col> : null}


                        {status == 'error' ? <Col lg={9}>
                            <Card className="text-center">
                                <Card.Body>
                                    <Card.Title>Error!</Card.Title>
                                    <Card.Text>
                                        <Card.Link target={'_blank'} href={this.etherscanTX(hash)}>
                                            {error}
                                        </Card.Link>
                                    </Card.Text>
                                    <Button variant="primary" className={styles.btnColor} onClick={() => this.goback()}>Go
                                        Back</Button>
                                </Card.Body>
                            </Card>
                        </Col> : null}

                    </Row>
                </Container>

            </div>
        );
    }
}

export default withTranslation()(Home);
