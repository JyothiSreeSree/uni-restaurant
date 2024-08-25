import './index.css'

const FoodItem = ({
  foodItemDetails,
  cartItems,
  addItemToCart,
  removeItemFromCart,
}) => {
  const {
    dishId,
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = foodItemDetails

  const onIncreaseQuantity = () => addItemToCart(foodItemDetails)
  const onDecreaseQuantity = () => removeItemFromCart(foodItemDetails)

  const getQuantity = () => {
    const cartItem = cartItems.find(item => item.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  const renderControllerButton = () => (
    <div className="controllerContainer">
      <button
        className="button decreaseBtn"
        type="button"
        onClick={onDecreaseQuantity}
      >
        -
      </button>
      <p className="quantity">{getQuantity()}</p>
      <button
        className="button increaseBtn"
        type="button"
        onClick={onIncreaseQuantity}
      >
        +
      </button>
    </div>
  )

  return (
    <li className="dishItemContainer">
      <div className={`vegBorder ${dishType === 1 ? 'nonVegBorder' : ''}`}>
        <div className={`vegRound ${dishType === 1 ? 'nonVegRound' : ''}`} />
      </div>
      <div className="dishDetailsContainer">
        <h1 className="dishName">{dishName}</h1>
        <p className="dishCurrencyPrice">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dishDescription">{dishDescription}</p>
        {dishAvailability ? (
          renderControllerButton()
        ) : (
          <p className="notAvailabilityText">Not available</p>
        )}
        {addonCat.length > 0 && (
          <p className="addonAvailabilityText">Customizations available</p>
        )}
      </div>
      <p className="dishCalories">{dishCalories} calories</p>
      <img className="dishImage" alt={dishName} src={dishImage} />
    </li>
  )
}

export default FoodItem
