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

export const openUserMenu = () => ({
  type: types.OPEN_USER_MENU,
  open: true
})

export const closeUserMenu = () => ({
  type: types.CLOSE_USER_MENU,
  open: false
})
