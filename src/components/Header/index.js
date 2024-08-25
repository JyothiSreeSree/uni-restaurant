import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = ({cartItems}) => {
  const getCartCount = () =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0)
  return (
    <header className="header">
      <h1 className="restaurantName">UNI Resto Cafe</h1>
      <div className="cartContainer">
        <p className="myOrders">My Orders</p>
        <div className="cartIconContainer">
          <AiOutlineShoppingCart className="cartIcon" />
          <div className="cartCountContainer">
            <p className="cartCount">{getCartCount()}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
