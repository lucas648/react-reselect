import React from "react";

import { connect } from "react-redux";
import { createSelector } from 'reselect'

function Cart({cart, total, addProduct, setShippingValue}){
  return(
    <div>
      <h1>Carrinho</h1>
      <p>
        Items: <strong>{cart.items.length}</strong>
      </p>
      <p>
        Frete: <strong>{cart.shipping_value}</strong>
      </p>
      <p>
        Total: <strong>{total}</strong>
      </p>
      <button onClick={()=>{addProduct()}}>Adicionar produto</button>
      <button onClick={()=>{setShippingValue()}}>Calcular Frete</button>
    </div>
  )
}

const calculateTotal = createSelector(
  state => state.items,
  state => state.shipping_value,
  (items, shipping_value) => {
    return  items.reduce((subtotal, item)=> subtotal + item.price, 0) + shipping_value
  }
)
const mapStateToProps = state =>({
  cart: state,
  total: calculateTotal(state)
});

const mapDispatchToProps = dispatch =>({
  addProduct: () => dispatch({type: 'ADD'}),
  setShippingValue: () => dispatch({type: 'SET_SHIPPING'})
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)