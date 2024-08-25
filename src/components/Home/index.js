import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CategorySlider from '../CategorySlider'
import FoodItem from '../FoodItem'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    foodDetails: [],
    cartItems: [],
    activeCategoryId: '',
  }

  componentDidMount() {
    this.getFoodDetails()
  }

  getFormattedMenuList = menuList =>
    menuList.map(eachItem => ({
      categoryDishes: eachItem.category_dishes.map(dishItem => ({
        addonCat: dishItem.addonCat,
        dishAvailability: dishItem.dish_Availability,
        dishType: dishItem.dish_Type,
        dishCalories: dishItem.dish_calories,
        dishCurrency: dishItem.dish_currency,
        dishDescription: dishItem.dish_description,
        dishId: dishItem.dish_id,
        dishImage: dishItem.dish_image,
        dishName: dishItem.dish_name,
        dishPrice: dishItem.dish_price,
        nexturl: dishItem.nexturl,
      })),
      menuCategory: eachItem.menu_category,
      menuCategoryId: eachItem.menu_category_id,
      menuCategoryImage: eachItem.menu_category_image,
    }))

  getFoodDetails = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    const data = await response.json()
    const formattedTableMenu = this.getFormattedMenuList(
      data[0].table_menu_list,
    )
    this.setState({
      foodDetails: formattedTableMenu,
      activeCategoryId: formattedTableMenu[0].menuCategoryId,
      isLoading: false,
    })
  }

  addItemToCart = dish => {
    this.setState(prevState => {
      const isAlreadyInCart = prevState.cartItems.find(
        item => item.dishId === dish.dishId,
      )
      if (!isAlreadyInCart) {
        const newDish = {...dish, quantity: 1}
        return {
          cartItems: [...prevState.cartItems, newDish],
        }
      } else {
        const updatedCartItems = prevState.cartItems.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        )
        return {
          cartItems: updatedCartItems,
        }
      }
    })
  }

  removeItemFromCart = dish => {
    this.setState(prevState => {
      const updatedCartItems = prevState.cartItems
        .map(item => {
          if (item.dishId === dish.dishId) {
            console.log('remove')
            if (item.quantity > 1) {
              return {...item, quantity: item.quantity - 1}
            } else {
              return null
            }
          }
          return item
        })
        .filter(item => item !== null)

      return {cartItems: updatedCartItems}
    })
  }

  onUpdateActiveCategoryId = menuCategoryId => {
    this.setState({activeCategoryId: menuCategoryId})
  }

  renderTabMenuList = () => {
    const {foodDetails, activeCategoryId} = this.state
    return (
      <CategorySlider
        categories={foodDetails}
        activeCategoryId={activeCategoryId}
        onUpdateActiveCategoryId={this.onUpdateActiveCategoryId}
      />
    )
  }
  renderFoodItems = () => {
    const {foodDetails, activeCategoryId, cartItems} = this.state
    const activeCategory = foodDetails.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )
    const {categoryDishes} = activeCategory

    return (
      <ul className="FoodListContainer">
        {categoryDishes.map(eachFood => (
          <FoodItem
            key={eachFood.dishId}
            foodItemDetails={eachFood}
            cartItems={cartItems}
            addItemToCart={this.addItemToCart}
            removeItemFromCart={this.removeItemFromCart}
          />
        ))}
      </ul>
    )
  }
  render() {
    const {isLoading, cartItems} = this.state

    return isLoading ? (
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    ) : (
      <div className="homeContainer">
        <Header cartItems={cartItems} />
        {this.renderTabMenuList()}
        {this.renderFoodItems()}
      </div>
    )
  }
}

export default Home
