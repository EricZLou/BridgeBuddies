import React from 'react'

import '../css/StoreInfo.css'

import coin from '../media/coin.png';

export default class StoreInfo extends React.Component {
  render() {
    if (!this.props.item) return <div/>;
    const filepath = `${this.props.item.category}/${this.props.item.file}`;
    const img = require(`../media/store/${filepath}`);
    return (
      <div>
        <div className="store-info-name">
          {this.props.item.name}
        </div>
        <div className="store-info-image">
          {<img src={img} alt={this.props.item.name}/>}
        </div>
        <div className="store-info-description">
          {this.props.item.description}
        </div>

        {/* BUY THE ITEM */}
        {!this.props.item.owned &&
          <button className="store-info-button store-info-buy"
                  onClick={() => this.props.onPurchase(
                    this.props.item.category, this.props.item.name
                  )}
          >
            <img src={coin} alt="Coin" className="store-coin-img"/>
            {`${this.props.item.cost}`}
          </button>
        }

        {/* USE THE ITEM */}
        {this.props.item.owned && !this.props.item.active &&
          <button className="store-info-button store-info-use">
            Use
          </button>
        }

        {/* ALREADY USING THE ITEM */}
        {this.props.item.active &&
          <button className="store-info-button store-info-active">
            Already Active
          </button>
        }

      </div>
    )
  }
};
