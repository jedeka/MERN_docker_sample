import React, {Component} from 'react';
import './product.css'
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';


let instance = null;
let ds = new DataService();
let ns = new NotificationService();

class Product extends Component {
  constructor(props) {
    if(!instance) {
      super(props);

      this.state = {onWishlist: ds.itemOnWishlist()};

      // bind functions
      this.onButtonClicked = this.onButtonClicked.bind(this);
      this.onWishlistChanged = this.onWishlistChanged.bind(this);
    }
  }
  
  componentDidMount() {
    ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishlistChanged);
  }

  componentWillUnmount() {
    ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
  }

  onWishlistChanged(newWishlist) {
    this.setState({onWishlist: ds.itemOnWishlist(this.props.product)});
  }

  onButtonClicked = () => {
    if (this.state.onWishlist) {
      ds.removeWishlistItem(this.props.product);
    } else {
      ds.addWishlistItem(this.props.product);
    }
  }

  render() {
    var btnClass = this.state.onWishlist ? "btn btn-danger" : "btn btn-primary";
    // var btnClass;
    // if(this.state.onWishlist) {
    //   btnClass = "btn btn-danger";
    // } else {
    //   btnClass = "btn btn-primary";
    // }
    
    return(
      <div className='card product'>
        <img className="card-img-top" src={this.props.product.imgUrl} alt="Product"></img>
        <div className="card-block">
          <h4 className="card-title">{this.props.product.title}</h4>
          <p className="card-text">Price: ${this.props.product.price}</p>
          <a href="#" onClick={() => this.onButtonClicked()} className={btnClass}> {this.state.onWishlist ? "Remove from wishlist" : "Add to cart"}</a>
        </div>
      </div>
    );
  }
}

export default Product;