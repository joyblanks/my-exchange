import React , { Component } from 'react';
import MoneyCard from './MoneyCard';
import { Carousel, CarouselItem, CarouselIndicators } from 'reactstrap';
import store from '../store';
import { Actions } from '../action-creators';


class Wallet extends Component {
  noop = () => {}
  
  goToIndex = (index) => {
    store.dispatch(Actions.changeCurrency(this.props.mode,index));
  }

  render(){
    let { props, mode } = this.props;
    let activeIndex = props[mode];
    let wallets = props.wallets;
    let indicators = wallets.map(wallet => ({...wallet, src: wallet.id}));

    return (
      <Carousel activeIndex={activeIndex} next={this.noop} previous={this.noop}>
        <CarouselIndicators items={indicators} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        
        {wallets.map(wallet => 
          <CarouselItem  key={wallet.id}>
            <MoneyCard props={props} wallet={wallet}/>
          </CarouselItem>
        )}    
      </Carousel>
    );
  }
}

export default Wallet;
