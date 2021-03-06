import { initialState } from "./../initialState";
import { CLEARWISHLIST, CLEARCART, SETLOGIN, SETINFO, ADDBOOKTOWHISHLIST, DELETEBOOKTOWHISHLIST, ADDBOOKTOTEMPCART, SETBOOKS, PLUSMINUSBOOK, ADDBOOKTOCART, DELETEBOOKFROMCART } from "./../actions/constants";

const updatedData = ( cart, data ) => {
  let newState = []
  cart.cart.map((book,id) => {
    if(book.book.isbn === data.book.isbn){
        newState.push({book:data.book, count:data.count})
    }else{
      newState.push({book:book.book, count:book.count})
    }
    return;
  });
  return newState;
}

const updatedDataWhislist = ( whislist, data ) => {
  let newState = []
  whislist.whislist.map((book,id) => {
    if(book.book.isbn === data.book.isbn){
        newState.push({book:data.book})
    }else{
      newState.push({book:book.book})
    }
    return;
  });
  return newState;
}

const removeData = ( cart , data ) => {
  let newState = []
  cart.cart.map((book,id) => {
    if(book.book.isbn !== data.book.isbn){
      newState.push({book:book.book, count:book.count})
    }
    return;
  });
  // console.log(newState)
  return newState;
}

const removeDataWhislist = ( whislist , data ) => {
  let newState = []
  console.log(whislist);
  whislist.whislist.map((book,id) => {
    if(book.book.isbn !== data.book.isbn){
      newState.push({book:book.book})
    }
    return;
  });
  // console.log(newState)
  return newState;
}

// const removePDFData = ( index , state ) => {
//   state.pdfs.splice(index,1);
//   return state.pdfs;
// }
//
const checkExist = (state, index) => {
  return state.cart.some( book => {
    return book.book.isbn === index;
  });
}

const checkExistWhislist = (state, index) => {
  return state.whislist.some( book => {
    return book.book.isbn === index;
  });
}


const rootReducer = (state = initialState, action) => {
  // console.log(state)
  switch(action.type){
    case SETLOGIN:{
      return Object.assign({},state,{
        books:state.books,
        tempCart:state.tempCart,
        cart:state.cart,
        info:state.info,
        isLogin:action.isLogin,
        whislist:state.whislist
      })
      break;
    }
    case SETBOOKS:{
      return Object.assign({},state,{
        books:action.books,
        tempCart:state.tempCart,
        cart:state.cart,
        info:state.info,
        isLogin:state.isLogin,
        whislist:state.whislist
      })
      break;
    }
    case CLEARCART:{
      return Object.assign({},state,{
        books:state.books,
        tempCart:state.tempCart,
        cart:[],
        info:state.info,
        isLogin:state.isLogin,
        whislist:state.whislist
      })
      break;
    }
    case CLEARWISHLIST:{
      return Object.assign({},state,{
        books:state.books,
        tempCart:state.tempCart,
        cart:state.cart,
        info:state.info,
        isLogin:state.isLogin,
        whislist:[]
      })
      break;
    }
    case ADDBOOKTOTEMPCART:{
      return Object.assign({},state,{
        books:state.books,
        tempCart: { book : action.book.book, count : action.book.count},
        cart:state.cart,
        info:state.info,
        isLogin:state.isLogin,
        whislist:state.whislist
      })
      break;
    }
    case PLUSMINUSBOOK:{
      return Object.assign({},state,{
        books:state.books,
        tempCart:{ book : state.tempCart.book, count:action.count},
        cart:state.cart,
        info:state.info,
        isLogin:state.isLogin,
        whislist:state.whislist
      })
      break;
    }
    case ADDBOOKTOCART:{
      let add = checkExist(state, action.book.book.isbn);
      return Object.assign({}, state, {
        books:state.books,
        tempCart:{ book : state.tempCart.book, count:state.tempCart.count},
        cart:add ? updatedData(state, action.book) : state.cart.concat(action.book),
        info:state.info,
        isLogin:state.isLogin,
        whislist:state.whislist
      });
      break;
    }
    case DELETEBOOKTOWHISHLIST:{
      let add = checkExistWhislist(state, action.book.book.isbn);
      return Object.assign({}, state, {
        books:state.books,
        tempCart:{ book : state.tempCart.book, count:state.tempCart.count},
        cart:state.cart,
        info:state.info,
        isLogin:state.isLogin,
        whislist:add ? removeDataWhislist(state, action.book) : state.whislist.concat(action.book),
      });
      break;
    }
    case ADDBOOKTOWHISHLIST:{
      let add = checkExistWhislist(state, action.book.book.isbn);
      return Object.assign({}, state, {
        books:state.books,
        tempCart:{ book : state.tempCart.book, count:state.tempCart.count },
        cart:state.cart,
        info:state.info,
        isLogin:state.isLogin,
        whislist:add ? updatedDataWhislist(state, action.book) : state.whislist.concat(action.book)
      });
      break;
    }
    case DELETEBOOKFROMCART:{
      let add = checkExist(state, action.book.book.isbn);
      return Object.assign({}, state, {
        books:state.books,
        tempCart:{ book : state.tempCart.book, count:state.tempCart.count},
        cart:add ? removeData(state, action.book) : state.cart.concat(action.book),
        info:state.info,
        isLogin:state.isLogin,
        whislist:state.whislist
      });
      break;
    }
    case SETINFO:{
      return Object.assign({}, state, {
        books:state.books,
        tempCart:{ book : state.tempCart.book, count:state.tempCart.count},
        cart:state.cart,
        info:action.info,
        isLogin:state.isLogin,
        whislist:state.whislist
      });
      break;
    }
    default :
      return state;
  }
};

export default rootReducer;
