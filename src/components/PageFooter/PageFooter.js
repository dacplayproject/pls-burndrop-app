import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import styles from './style.module.scss'

class PageFooter extends Component {
    render() {
        const {t} = this.props

        return (
            <div className={styles.navFooter}>

            </div>
        );
    }
}

export default withTranslation()(PageFooter);
