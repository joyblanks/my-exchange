import React, { Component } from 'react';
import store from '../store';
import { Actions } from '../action-creators';
import { Input } from 'reactstrap';


const MoneyCardCss = {
  minHeight: '30vh',
  borderBottom: '1px solid #FFF',
  color: '#FFF',
  padding: '10px'
};

const inputCss = {
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#fff',
  lineHeight: '50px',
  height: '100%',
  boxShadow: 'none',
  fontSize: '50px',
  textAlign: 'right'
};

const convertinfoCss = {
  textAlign: 'right'
};

class MoneyCard extends Component {

  convertAction = (e) => {
    const { props, wallet } = this.props;
    const { rates, toCurrency, fromCurrency, wallets } = props;
    const isFrom = fromCurrency === wallet.id;
    const fromCurrencySym = wallets.find(wallet => wallet.id === fromCurrency).currency;
    const toCurrencySym = wallets.find(wallet => wallet.id === toCurrency).currency;

    let amount = Number(e.target.value);
    
    store.dispatch(Actions.convertCurrency({
      amount: isNaN(amount) ? '' : (amount < 0 ? -1*amount : amount), 
      from: rates[fromCurrencySym], 
      to: rates[toCurrencySym], 
      isFrom, 
      fromCurrencySym, 
      toCurrencySym
    }));
  }

  onlyNumbers = (event) => {
      let key =  event.charCode || event.keyCode;
      if (key === 8 || key === 46) {
          return true;
      } else if ( key < 48 || key > 57 ) {
          event.preventDefault();
          return false;
      } else {
          return true;
      }
  }

  convert = (amount, rateFrom, rateTo) => {
    return rateTo/rateFrom*amount;
  } 

  render(){
    const { props, wallet } = this.props;
    const { rates, toCurrency, fromCurrency, wallets, exchange } = props;
    const isFrom = fromCurrency === wallet.id;
    const isTo = toCurrency === wallet.id;
    const fromCurrencySym = wallets.find(wallet => wallet.id === fromCurrency).currency;
    const toCurrencySym = wallets.find(wallet => wallet.id === toCurrency).currency;
    const rate = this.convert(1, rates[fromCurrencySym], rates[toCurrencySym]);
    const convertText = `1 ${fromCurrencySym} = ${rate.toFixed(3)} ${toCurrencySym}`;
    const valueTo = exchange ? (exchange.isFrom ? this.convert(exchange.amount, exchange.from, exchange.to) : exchange.amount) : '';
    const valueFrom = exchange ? (!exchange.isFrom ? this.convert(exchange.amount, exchange.to, exchange.from) : exchange.amount) : '';
    let dValue = (isFrom ? valueFrom : valueTo);
    
    if(isTo && dValue){
      if(exchange && exchange.isFrom){ // exchange happened from 'From'
        dValue = (Number(dValue)<0?'':'+')+Number(dValue).toFixed(3);
      } else { // exchange happened from 'To'
        dValue = dValue ? (Number(dValue)<0?'':'-')+Number(dValue).toString() : '';
      }
    }

    if(isFrom && dValue){
      if(exchange && !exchange.isFrom){ // exchange happened from 'To'
        dValue = (Number(dValue)<0?'':'+')+Number(dValue).toFixed(3);
      } else { // exchange happened from 'From'
        dValue = dValue ? (Number(dValue)<0?'':'-')+Number(dValue).toString() : '';
      }
    }
    dValue = dValue === 0 || isNaN(dValue) ? '' : dValue;

    return (
      <div style={MoneyCardCss} className="d-flex justify-content-between align-items-stretch">
        <div>
          <h1>{wallet.currency}</h1>
          <p>You have {wallet.balance + ' ' + wallet.currency}</p>
        </div>
        {fromCurrency !== toCurrency ? 
          <div className="d-flex flex-column justify-content-between align-items-stretch">
            <Input value={dValue} style={inputCss} onChange={this.convertAction} onKeyPress={this.onlyNumbers}/>
            {isFrom ? '' : <small style={convertinfoCss}>{convertText}</small>}
        </div> : <i>{wallet.currency} &lt;-&gt; {wallet.currency} Same Currency</i>}
      </div>
    );
  }

}

export default MoneyCard;
