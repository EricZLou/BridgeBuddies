import React from 'react'
import {connect} from 'react-redux'

import Firebase from '../Firebase'
import Header from '../components/Header'
import StoreInfo from '../components/StoreInfo'

import {STORE} from '../constants/Store'

import '../css/Style.css';
import '../css/StoreScreen.css'

class StoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: STORE,    // local copy of data until Firebase implemented
      store: null,
      shown_item: null,
    }
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleItemPurchase = this.handleItemPurchase.bind(this);
    this.handleItemUse = this.handleItemUse.bind(this);
  }

  handleItemClick(item) {
    this.setState({
      shown_item: {
        ...item,
        active: (this.props.active_items[item.category] === item.name),
        owned: (this.props.owned_items[item.category].includes(item.name)),
      }
    });
  }

  createStoreItem(item, idx) {
    const filepath = `${item.category}/${item.file}`;
    const img = require(`../media/store/${filepath}`);
    return <div
      className="item"
      key={idx}
      onClick={() => this.handleItemClick(item)}
    >
      <img src={img} alt={`${item.name} store item`}/>
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
                    item={this.state.shown_item}
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

const mapStateToProps = (state, ownProps) => {
  return {
    active_items: state.storeActive,
    owned_items: state.storeOwned,
    firebasePaths: state.firebasePaths,
  }
}
export default connect(mapStateToProps)(StoreScreen);
