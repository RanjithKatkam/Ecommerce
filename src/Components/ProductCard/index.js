import "./index.css"
import { FaStarHalfAlt } from "react-icons/fa";


function ProductCard(props) {
    const {images, id, rating, price, title} = props.details
    const {onIncreaseCartCount} = props

    const onClickAddButton = () => {
        onIncreaseCartCount(id)
    }

    // const imageList = []
    // images.map(eachItem => (imageList.push({"url": eachItem})))
    

    return(
        <div className="card">
            <div className="imggg">
                <img src={images[0]} alt="product" className="product-image" />
            </div>
            <div className="card-details-container">
                <div>
                    <p className="title">{title}</p>
                    <p className="rating">Rating: {rating} <FaStarHalfAlt className="star" color="gold" size={20} /></p>
                </div>
                <div className="cart-price-div">
                    <p className="price">$ {price}</p>
                    <button onClick={onClickAddButton} className="add-to-cart">Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard