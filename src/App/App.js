import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

// components
import Product from '../product/product'
import Wishlist from '../wishlist/wishlist'

// services
import HttpService from '../services/http-service';

const http = new HttpService();

// Q: Below is the default for CRA. Is using function better than using class?
// function App() {
//   // fetch products from mongodb
  
//   // bind function
//   // any function declared in the constructor, should be bound this way
//   this.loadData = this.loadData.bind(this); 
//   this.loadData();

//   loadData = () => {
//     http.getProducts().then(products => {
//       console.log(products);
//     }, err => {

//     });
//   }
//   http.getProducts()


//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           ShopOn - Your go-to online store
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends Component {

  constructor(props){
    super(props);
    
    // declare state as empty array at first instead of null to prevent any errors
    this.state = {products: []};

    // remember what for? 
    http.getProducts();

    // bind function
    // any function declared in the constructor, should be bound this way

    this.productList = this.productList.bind(this);
    this.loadData = this.loadData.bind(this); 
    this.loadData();
  }
  
  loadData = () => {
    // assign a variable to point to this object (the constructed), because if we use this.setState below, it will point to the promise and not the object anymore
    var self = this;
    http.getProducts().then(data => {
      // output results returned from the promise  
      // console.log(products);

      // this might not work
      // this.setState({products: data})
      
       // use setState at the very top of the component that we want to refresh if we want our component refreshes in the UI 
      // this.setState({products: data})
      self.setState({products: data})
    }, err => {

    });
  }

  productList = () => {
    const list = this.state.products.map((product) => 
      <div className="col-sm-4" key={product._id}>
        <Product product={product} />
      </div>
      
    );
    return (list);
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <div className="container-fluid App-main">
            <div className="row">
              <div className='col-sm-8'>
                <div className='row'>
                  {/* We can use this instead of writing one by one*/}
                  {this.productList()}
                </div>
              </div>
              <div className='col-sm-4'>
                <Wishlist /> 
              </div> 

              {/* <Product className='col-sm-4' price="4.23" title="Soaps" imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw7Fha9JNVhi__LpZW7ZGY9A50gPbq3zl9Wuymw9DEwQ&s"/> 
              <Product className='col-sm-4' price="4.23" title="Soaps" imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw7Fha9JNVhi__LpZW7ZGY9A50gPbq3zl9Wuymw9DEwQ&s"/>
              <Product className='col-sm-4' price="4.23" title="Soaps" imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw7Fha9JNVhi__LpZW7ZGY9A50gPbq3zl9Wuymw9DEwQ&s"/> */}
              
            </div>
          </div>
          
        </header>
      </div>
    );
  }
}

export default App;
