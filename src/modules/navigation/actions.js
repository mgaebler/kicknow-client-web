import * as types from './types'

export const searchInput = text => ({
  type: types.SEARCH_INPUT,
  text: text
})

export const openDrawer = () => ({
  type: types.OPEN_DRAWER,
  open: true
})

export const closeDrawer = () => ({
  type: types.CLOSE_DRAWER,
  open: false
})
