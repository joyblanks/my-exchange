import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Wallet from '../components/Wallet';
import { Actions } from '../action-creators';
import store from '../store';

const styleBkg = {
    background: 'linear-gradient(45deg, #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%)'
};

class ExchangeWindow extends Component {

    componentDidMount = () => {
        store.dispatch(Actions.getExchangeRates());
        store.dispatch(Actions.loadWallets());
    }

    componentWillUnmount = () => {
        store.dispatch(Actions.stopPollingRates());
    }
    
    render(){
        return (
            <div style={styleBkg}>
                <Wallet props={ this.props } mode="fromCurrency"/> 
                <Wallet props={ this.props } mode="toCurrency"/>
            </div>
        );
    }
}

const mapStateToProps = (state) => state.exchangeReducer;
const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeWindow);
