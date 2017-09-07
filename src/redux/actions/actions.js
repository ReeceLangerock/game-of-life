
export var deleteRecipe = index => {
  return dispatch => {
    dispatch(saveDeleteRecipe(index))
    dispatch(clearModal())
    dispatch(saveToLocalStorage())
  }
}

export var saveDeleteRecipe = index => {
  return {
    type: 'DELETE_RECIPE',
    index
  }
}

