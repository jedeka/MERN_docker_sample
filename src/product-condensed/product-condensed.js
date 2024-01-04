import React, {Component} from 'react';
import './product-condensed.css'
import DataService from '../services/data-service';

let ds = new DataService();

class ProductCondensed extends Component {
  constructor(props){
    super(props);

    // bind
    this.removeProduct = this.removeProduct.bind(this);
  }

  removeProduct = item => {
    ds.removeWishlistItem(this.props.product);
  }

  render() {
    return(
      <li className='list-group-item pc-condensed'>
        <a className='btn btn-outline-danger' onClick={() => this.removeProduct()}>X</a> 
        <p>{this.props.product.title} | <b>${this.props.product.price}</b></p>
      </li>
    );
  }
}
// WHY NOT GOING LIKE A LIST?

export default ProductCondensed;