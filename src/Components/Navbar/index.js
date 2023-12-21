import {withRouter} from "react-router-dom";
import "./index.css";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

function Navbar(props) {
    const {onClickRemoveItemFromCart, cartList, onClickIncreaseIcon, onClickDecreaseIcon} = props
    const totalAmount = cartList.reduce((total, product) => {
        const productTotal = product[0].quantity * product[0].price
        return total + productTotal
    }, 0)
    const [showPopup, setPopup] = useState(false)
    const [showCart, setCart] = useState(false)
    
    const onClickLogout = () => {
        setPopup(true)
    }

    const onCancleLogout = () => {
        setPopup(false)
    }

    const onConfirmLogout = () => {
        const {history} = props
        localStorage.removeItem("LoginEmail")
        localStorage.removeItem("LoginPassword")
        history.replace("/login")
    }

    const onClickShowCart = () => {
        setCart(!showCart)
    }

    const onClickRemoveIcon = (id) => {
        onClickRemoveItemFromCart(id)
    }

    const onClickPlusIcon = (id) => {
        onClickIncreaseIcon(id)
    }


    const onClickMinusIcon = (id) => {
        onClickDecreaseIcon(id)
    }


    return(
        <div className="navbar-main-container">
            <img alt="logo" className="logo" src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1702493317/bubble-gum-shopping-bag_yrst34.gif" />
            <h1 className="nav-heading">Shoppy</h1>
            <button onClick={onClickShowCart} className="button1"><img alt="cart-img" className="cart-img" src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1702492732/3d-fluency-shopping-cart_takucb.png" /></button>
            <p className="cart-count">{props.cartList.length}</p>
            <button className="button2"><img className="cart-img" alt="profile-img" src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1702493738/willoy-purple-user-icon_dd33u5.png" /></button>
            <button onClick={onClickLogout} className="logout-button">Logout</button>
            {
                showPopup && (
                    <div className="logout-popup">
                        <div className="logout-popup-sub-container">
                            <h1 className="are">Are you sure want to logout?</h1>
                            <div className="popup-buttons-container">
                                <button className="cancel-button" onClick={onCancleLogout}>Cancel</button>
                                <button className="confirm-button" onClick={onConfirmLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                showCart && (
                    <div className="cart-main-container">
                        <div className="cart-arrow-container">
                            <h1 className="cart">Cart</h1>
                            <button className="arrow-button" onClick={onClickShowCart}>
                                <FaArrowRightLong size={30}/>
                            </button>
                        </div>
                        <ul className="cart-products-container">
                            {
                                cartList.map(eachItem => {
                                    return(
                                        <li key={eachItem[0].id} className="cart-card-container">
                                            <img className="cart-image" src={eachItem[0].images[0]} alt="product" />
                                            <div className="cart-product-info-container">
                                                <p className="cart-product-title">{eachItem[0].title}</p>
                                                <div className="increase-container">
                                                    <div className="increase-box">
                                                        <button onClick={() => onClickMinusIcon(eachItem[0].id)} className="button">-</button>
                                                        <p className="product-quantity">{eachItem[0].quantity}</p>
                                                        <button onClick={() => onClickPlusIcon(eachItem[0].id)} className="button">+</button>
                                                    </div>
                                                    <p className="cart-product-price">$ {eachItem[0].price * eachItem[0].quantity}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => onClickRemoveIcon(eachItem[0].id)} className="button12"><RxCross1 size={15} /></button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="subtotal-container">
                            <h1 className="subtotal">Subtotal: $ {totalAmount}</h1>
                            <button className="checkout">Checkout</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default withRouter(Navbar)