import { Component } from "react";
import Navbar from "../Navbar";
import ProductCard from "../ProductCard";
import "./index.css"

class HomePage extends Component {
    state = {
        productsList: [], 
        cartList: []
    }

    async componentDidMount() {
        const url = "https://dummyjson.com/products?skip=0&limit=100"
        const options = {
            "method" : "GET",
        }
        const response = await fetch(url, options)
        const responseData = await response.json()
        const requiredList = responseData.products.map(product => ({...product, quantity: 1}))
        this.setState({productsList: requiredList})
    }

    onIncreaseCartCount = (id) => {
        const {productsList, cartList} = this.state
        const productCheck = cartList.some(eachItem => eachItem[0].id === id)
        if (productCheck) {
            const requiredProduct = productsList.filter(eachItem => eachItem.id === id)
            requiredProduct[0].quantity += 1
            const remainingProducts = cartList.filter(eachItem => eachItem[0].id !== id)
            this.setState({cartList: [...remainingProducts, requiredProduct] })
        } else {
            const requiredProduct = productsList.filter(eachItem => eachItem.id === id)
            this.setState(prevState => ({cartList: [...prevState.cartList, requiredProduct]}))
        }
    }

    onClickRemoveItemFromCart = (id) => {
        const {cartList, productsList} = this.state
        const resultProductsList = cartList.filter(eachItem => eachItem[0].id !== id)
        const requiredProduct = productsList.filter(eachItem => eachItem.id === id)
        requiredProduct[0].quantity = 1
        this.setState({cartList: resultProductsList})
    }

    onClickIncreaseIcon = (id) => {
        const {productsList, cartList} = this.state
        const requiredProduct = productsList.filter(eachItem => eachItem.id === id)
        requiredProduct[0].quantity += 1
        const remainingProducts = cartList.filter(eachItem => eachItem[0].id !== id)
        this.setState({cartList: [...remainingProducts, requiredProduct] })
    }

    onClickDecreaseIcon = (id) => {
        const {productsList, cartList} = this.state
        const requiredProduct = productsList.filter(eachItem => eachItem.id === id)
        if (requiredProduct[0].quantity === 1) {
            this.onClickRemoveItemFromCart(id)
        }else {
            requiredProduct[0].quantity -= 1
            const remainingProducts = cartList.filter(eachItem => eachItem[0].id !== id)
            this.setState({cartList: [...remainingProducts, requiredProduct] })
        }

    }


    render(){
        return(
            <div className="homepage-main-container">
                <Navbar 
                    cartList={this.state.cartList} 
                    onClickRemoveItemFromCart={this.onClickRemoveItemFromCart} 
                    onClickIncreaseIcon={this.onClickIncreaseIcon}
                    onClickDecreaseIcon={this.onClickDecreaseIcon}
                />

                <div className="homepage-sub-container">
                    {
                        this.state.productsList.map(eachItem => {
                            return <ProductCard 
                                        onIncreaseCartCount={this.onIncreaseCartCount} 
                                        key={eachItem.id} 
                                        details={eachItem} 
                                    />
                        })
                    }
                </div>
            </div>       
        )
    }
}

export default HomePage