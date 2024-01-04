import React, {Component} from 'react';
import './wishlist.css'
import ProductCondensed from '../product-condensed/product-condensed';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

let ns = new NotificationService();

class Wishlist extends Component {
  
  constructor(props) {
    super(props);
    
    // // temporary data only
    // this.state = {wishlist:[
    //   {
    //     title:"Item1",
    //     price:23.99,
    //     _id:"id4"
    //   },
    //   {
    //     title:"Item2",
    //     price:23.99,
    //     _id:"id5"
    //   }
    // ]};

    this.state = {wishlist: []};

    // bind functions
    this.createWishlist = this.createWishlist.bind(this);
    this.onWishlistChanged = this.onWishlistChanged.bind(this);

  }

  componentDidMount() {
    ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishlistChanged);
  }

  componentWillUnmount() {
    ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
  }

  onWishlistChanged(newWishlist) {
    // console.log(newWishlist);
    this.setState({wishlist: newWishlist});
  } 
  
  createWishlist = () => {
    const list = this.state.wishlist.map((product) => 
      <ProductCondensed product={product} key={product._id} />
    );

    return(list);
  }
  
  render() {
    return(
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">Wishlist</h4>
          <ul className="list-group">
            {this.createWishlist()}
          </ul>
        </div>
      </div>
    );
  }
}

export default Wishlist;