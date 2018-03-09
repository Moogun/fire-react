import React, {Component} from 'react';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {name: 'nike', size: 270},
        {name: 'adidas', size: 280},
        {name: 'puma', size: 290},
      ]
    };
  }

  addNewProduct =(event) => {
    console.log(event.target.value);
  }

  deleteHandler = (id) => {
    const products = [...this.state.products]
    products.splice(id, 1)
    this.setState({products: products})
  }

  render() {
    return (
        <div>
          {this.state.products.map( (product, index) => (
            <div key={index}
              onClick={() =>this.deleteHandler({index})} >
              {product.name} {product.size}
            </div>
          ))}
        </div>
    );
  }
}
// const Landing = () =>
//   <div>
//     <h1>Landing Page</h1>
//   </div>
//


export default Landing;
