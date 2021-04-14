export const MODIFY_CART = 'MODIFY_CART';
export const MODIFY_FAV = 'MODIFY_FAV';

export function modifyCart(cart) {
    return function(dispatch){
        dispatch({
        type: MODIFY_CART,
        payload: cart
        });
    }    
};

export function modifyFav(fav) {
    return function(dispatch){
        dispatch({
        type: MODIFY_FAV,
        payload: fav
        });
    }    
};