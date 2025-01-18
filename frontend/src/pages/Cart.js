import { Fragment, useState } from "react";
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

export default function Cart({cartItem,setCartItem}){
    const [complete,setComplete] =useState(false);

    function increaseQty(item){
        if ( item.product.stock == item.qty){
            return;
        }
        const updatedItem = cartItem.map((i) =>{
            if (i.product._id == item.product._id){
                i.qty++
            }
            return i;
        })
        setCartItem(updatedItem)
    }
    function decreaseQty(item){
        if (item.qty > 1){
            if ( item.product.stock == item.qty){
                return;
            }
            const updatedItem = cartItem.map((i) =>{
                if (i.product._id == item.product._id){
                    i.qty--
                }
                return i;
            })
            setCartItem(updatedItem)
        }  
    }
    function removeItem(item){
        const updatedItem = cartItem.filter((i) =>{
            if (i.product._id !== item.product._id){
                return true;
            }
        })
        setCartItem(updatedItem) 
    }
    function placeOrderHandler(){
        fetch(process.env.REACT_APP_API_URL+'/order',{
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify(cartItem)
        })
        .then(()=> {
            setCartItem([]);
            setComplete(true);
            toast.success("order successed")
        })
            
    }
    return cartItem.length > 0 ? <Fragment>
                    <div class="container container-fluid">
                        <h2 class="mt-5">Your Cart: <b>{cartItem.length}</b></h2>
                        
                        <div class="row d-flex justify-content-between">
                            <div class="col-12 col-lg-8">
                                {cartItem.map((item)=>
                                (
                                    <Fragment>
                                    <hr />
                                    <div class="cart-item">
                                        <div class="row">
                                            <div class="col-4 col-lg-3">
                                                <img src={item.product.images[0].image} alt={item.product.name} height="90" width="115" />
                                            </div>
            
                                            <div class="col-5 col-lg-3">
                                            <Link to={"/product/"+item.product._id} href="#" id="view_btn" className="btn btn-block">{item.product.name}</Link>
                                            </div>
            
            
                                            <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">{item.product.price}</p>
                                            </div>
            
                                            <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div class="stockCounter d-inline">
                                                    <span class="btn btn-danger minus" onClick={() => decreaseQty(item)}>-</span>
                                                    <input type="number" class="form-control count d-inline" value={item.qty} readOnly />
            
                                                    <span class="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                                                </div>
                                            </div>
            
                                            <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" class="fa fa-trash btn btn-danger" onClick={() => removeItem(item)}></i>
                                            </div>
            
                                        </div>
                                    </div>
                                    </Fragment>
                                )
                                )}
                                
                                
                                <hr />
                            </div>

                            <div class="col-12 col-lg-3 my-4">
                                <div id="order_summary">
                                    <h4>Order Summary</h4>
                                    <hr />
                                    <p>Subtotal:  <span class="order-summary-values">{cartItem.reduce((acc,item)=>(acc+item.qty),0)} (Units)</span></p>
                                    <p>Est. total: <span class="order-summary-values">${Number(cartItem.reduce((acc,item)=>(acc+item.product.price*item.qty),0)).toFixed(2)}</span></p>

                                    <hr />
                                    <button id="checkout_btn" class="btn btn-primary btn-block" onClick={() => placeOrderHandler()}>Place Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </Fragment> : (!complete ? <h2 className="mt-5">Your cart is Empty!</h2> 
            : <Fragment>
                <h2 className="mt-5">Order Complete!</h2><p>Your order has been placed successfully </p>
              </Fragment>)
}