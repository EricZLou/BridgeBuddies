import React from 'react'

import Header from '../components/Header'
import StoreInfo from '../components/StoreInfo'

import {STORE} from '../SampleData'

import '../css/Style.css';
import '../css/StoreScreen.css'

export default class StoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: STORE,    // local copy of data until Firebase implemented
      store: null,
      active_item: null,
    }
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleItemPurchase = this.handleItemPurchase.bind(this);
    this.handleItemUse = this.handleItemUse.bind(this);
  }

  handleItemClick(item) {
    this.setState({active_item: item});
  }

  createStoreItem(item, idx) {
    const filepath = `${item.category}/${item.file}`;
    const img = require(`../media/store/${filepath}`);
    return <div
      className="item"
      key={idx}
      onClick={() => this.handleItemClick(item)}
    >
      <img src={img} alt={`${item} store item`}/>
    </div>;
  }

  createStoreCategory(category) {
    return (
      <div key={category}>
        <div className="category-title" key={category + "_name"}>{category}</div>
        <div className="category" key={category}>
          {
            Object.keys(STORE[category]).map((key, idx) => {
              return this.createStoreItem(STORE[category][key], idx);
            })
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    let store = [];
    for (let category in STORE) {
      store.push(this.createStoreCategory(category));
    }
    this.setState({store: store});
  }

  handleItemPurchase(category, idx) {
    let new_store = {...this.state.data};
    new_store[category][idx].owned = true;
    this.setState({data: new_store});
  }

  handleItemUse() {

  }

  render() {
    return (
      <div>
        <Header/>
        <div className="store-body-container">
          <div className="store-container">
            <div className="store-left-container">
              <div className="store-left">
                <div className="store-title">Store</div>
                <div className="store-info">
                  {<StoreInfo
                    item={this.state.active_item}
                    onPurchase={this.handleItemPurchase}
                    onUse={this.handleItemUse}
                  />}
                </div>
              </div>
            </div>
            <div className="store-right-container">
              <div className="store-right">
                <div>{this.state.store}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
