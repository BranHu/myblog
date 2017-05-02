import React from 'react';

class ProductCategoryRow extends React.Component {
  render() {
    return <tr><th colSpan="2">{this.props.category}</th></tr>;
  }
}


//注意这里的style引用
class ProductRow extends React.Component {
  render() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;

    //下面的products属性通过this.props来引用，this代表下面的ProductTable的实例,
    //他有props这个属性，实例中的所有特征属性都在props属性上，因此通过props来引用,
    //这里要使用箭头函数，不然this会乱
    this.props.products.forEach((product) => {
      //设置了state属性后，对相应处进行添加修改
  	  if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
  	      return;
  	  }

      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
  }

  //实时控制主要就是在组件中constructor和render()之间新增方法，再通过setState()
  //来对state中的属性进行更改
  handleFilterTextInputChange(e) {
    //this即后面的<SearchBar />，这个实例组件的很多属性如filterText、onFilterTextInput、onInStockInput等都在
    //this.props属性下面，这里相当于调用了后面的handleFilterTextInput()这个函数
    this.props.onFilterTextInput(e.target.value);
  }
  
  handleInStockInputChange(e) {
    this.props.onInStockInput(e.target.checked);
  }

  //onChange--->this.handleFilterTextInputChange--->this.props.onFilterTextInput()--->setState()
  //render()中的this也是后面的<SearchBar />
  render() {
    return (
      <form>
        <input 
          type="text" 
          placeholder="Search..." 
          value={this.props.filterText} 
          onChange={this.handleFilterTextInputChange}
        />
        <p>
          <input 
            type="checkbox" 
            checked={this.props.inStockOnly} 
            onChange={this.handleInStockInputChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  //props可以省略，因其默认存在的
  constructor(props) {
    super(props);
    this.state = {
      filterText: 'ball',
      inStockOnly: false
    };
    //实时控制的时候添加的
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleInStockInput = this.handleInStockInput.bind(this);
  }

  //实时控制主要就是在组件中constructor和render()之间新增方法，再通过setState()
  //来对state中的属性进行更改
  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockInput(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
  	var PRODUCTS = [
	  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
	  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
	  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
	  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
	  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
	  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
	];

    //this.state只在声明了state的类中使用，其他的用props
    return (
      <div>
        <SearchBar 
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextInput={this.handleFilterTextInput}
          onInStockInput={this.handleInStockInput}
        />
        <ProductTable 
          products={PRODUCTS} 
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

 
export default FilterableProductTable;