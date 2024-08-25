import React from 'react'
import './index.css'

const CategorySlider = ({
  categories,
  activeCategoryId,
  onUpdateActiveCategoryId,
}) => {
  return (
    <ul className="sliderContainer">
      {categories.map(eachCategory => {
        const onClickHandler = () =>
          onUpdateActiveCategoryId(eachCategory.menuCategoryId)

        return (
          <li
            key={eachCategory.menuCategoryId}
            className={`eachTab ${
              eachCategory.menuCategoryId === activeCategoryId
                ? 'activeTabItem'
                : ''
            }`}
            onClick={onClickHandler}
          >
            <button type="button" className="tabCategoryButton">
              {eachCategory.menuCategory}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default CategorySlider
