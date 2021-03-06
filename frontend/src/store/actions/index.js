import { CLEARWISHLIST, SETLOGIN, SETINFO, ADDBOOKTOTEMPCART, ADDBOOKTOWHISHLIST, DELETEBOOKTOWHISHLIST, SETBOOKS, PLUSMINUSBOOK, ADDBOOKTOCART, CLEARCART, DELETEBOOKFROMCART } from "./constants";

export const setInfo = ( info ) => {
  return { type : SETINFO, info }
}
export const setLogin = ( isLogin ) => {
  return { type : SETLOGIN, isLogin }
}

export const setBooks = ( books ) => {
  return { type : SETBOOKS, books }
}

export const addBookToTempCart = ( book ) => {
  return { type : ADDBOOKTOTEMPCART, book }
}

export const addBookToWhislist = ( book ) => {
  return { type : ADDBOOKTOWHISHLIST, book }
}

export const deleteBookFromWhislist = ( book ) => {
  return { type : DELETEBOOKTOWHISHLIST, book }
}

export const setBookCount = ( count ) => {
  return { type : PLUSMINUSBOOK, count }
}

export const addBookToCart = ( book ) => {
  // console.log(book)
  return { type : ADDBOOKTOCART, book }
}

export const deleteBookFromCart = ( book ) => {
  return { type : DELETEBOOKFROMCART, book }
}

export const clearCart = ( book ) => {
  return { type : CLEARCART, book }
}

export const clearWishlist = ( book ) => {
  return { type : CLEARWISHLIST, book }
}
