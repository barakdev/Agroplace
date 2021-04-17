import React, { useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/detailReducer/detailActions";
import "../../scss/components/ProductDetail/_ProductDetails.scss";
import Carousel from "./Carousel";
import { Icon } from "@iconify/react";
import tractorIcon from "@iconify-icons/la/tractor";
import { useHistory } from "react-router";
import { resetQuery } from "../../redux/searchReducer/searchActions";
import { filterCategory } from "../../redux/categoryFilterReducer/categoryFilterActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Reviews from "../Reviews/Reviews";
import CommentaryReviews from "../Reviews/CommentaryReviews";
import { getCommentary } from "../../redux/reviewsReducer/actionsReviews";
import WishlistButton from './WishlistButton'
import { modifyCart, modifyFav } from "../../redux/iconReducer/iconActions";
import {addProduct, deleteProduct} from '../../redux/cartReducer/cartActions'


const customIcons = {
  1: {
    icon: <Icon icon={tractorIcon} />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <Icon icon={tractorIcon} />,
    label: "Dissatisfied",
  },
  3: {
    icon: <Icon icon={tractorIcon} />,
    label: "Neutral",
  },
  4: {
    icon: <Icon icon={tractorIcon} />,
    label: "Satisfied",
  },
  5: {
    icon: <Icon icon={tractorIcon} />,
    label: "Very Satisfied",
  },
};
function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number,
};




const ProductDetails = (props) => {
  const { productDetail, loading } = useSelector(
    (state) => state.detailReducer
  );
  let productId = props.match.params.id;
  const history = useHistory();
  const dispatch = useDispatch();

  const {reviews} = useSelector((state)=> state.reviewsReducer)

  const iconState = useSelector(state => state.iconReducer)

  const [state, setState] = useState({
      [`Fav-${productDetail.id}`]: iconState.fav[`Fav-${productDetail.id}}`],
      [`Cart-${productDetail.id}}`]: iconState.cart[`Cart-${productDetail.id}}`],
  })
 

  // const Wish = (
  //   <FormControlLabel
  //     control={
  //       <Checkbox
  //         icon={<FavoriteBorder />}
  //         checkedIcon={<Favorite />}
  //         name={`Fav-${productDetail.id}`} 
  //       />
  //     }
  //   />
  // );
  
  // const Cart = (
  //   <FormControlLabel
  //     control={
  //       <Checkbox
  //         icon={<ShoppingCartOutlinedIcon />}
  //         checkedIcon={<ShoppingCartIcon style={{ color: "white" }} />}
  //         name={`Cart-${productDetail.id}`} 
  //         onChange={(e) => handleChange(e)}
  //         checked={iconState.cart[`Cart-${productDetail.id}`] || false}
  //       />
  //     }
  //   />
  // );

  const Wish = () => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            name={`Fav-${productDetail.id}`}
            
          />
        }
      />
    );
  };
  
  const Cart = (productId, state, handleHeart) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            icon={<ShoppingCartOutlinedIcon />}
            checkedIcon={<ShoppingCartIcon style={{ color: "white" }} />}
            checked={iconState.cart[`Cart-${productDetail.id}`] || false}
            name={`Cart-${productId}`}
            onChange={(e) => handleHeart(e)}
          />
        }
      />
    );
  };


  function handleHeart(event) {
     const test = iconState.cart[`Cart-${productDetail.id}`]
    if (test === false || test === undefined) {
        dispatch(addProduct(productDetail));
      } else {
        dispatch(deleteProduct(productDetail));  
      }
    let { name, checked } = event.target;
    setState({ ...state, [name]: checked });
    if (name.includes("Fav")) {
      dispatch(modifyFav({ [name]: checked }));
    } else {
      dispatch(modifyCart({ [name]: checked }));
    }
  }
 
  useEffect(() => {
    dispatch(getDetail(parseInt(productId)));
    dispatch(getCommentary(parseInt(productId)));
  }, [productId, dispatch]);

  

  const handleClick = (cat) => {
    dispatch(filterCategory(cat));
    dispatch(resetQuery());
    history.push({
      pathname: "/catalog",
    });
  };
  return (
    <div className="productDetails">
      {loading ? (
        <div className="containerDetails">
          <div className="firstCard">
            <Carousel img={productDetail.picture} />
            <div className="datos">
              <div className="detailTitle">
                <h2>{productDetail.name}</h2>
                <div className="stars">
                  <Box component="div" borderColor="transparent">
                    <Rating
                      size="large"
                      name="customized-icons"
                      value={productDetail.score ? productDetail.score : 1}
                      getLabelText={(value) => customIcons[value].label}
                      IconContainerComponent={IconContainer}
                      readOnly
                    />
                  </Box>
                </div>
              </div>
              <h4>SKU: {productDetail.SKU}</h4>
              <h4>Precio: {productDetail.unitPrice} USD</h4>
              <h4>Stock: {productDetail.unitsOnStock}</h4>
              <div className="categroy-details">
                {productDetail.categories
                  ? productDetail.categories.map((c) => (
                      <button
                        className="fill"
                        key={productDetail.categories.indexOf(c)}
                        onClick={() => handleClick(c.name)}
                      >
                        {c.name}
                      </button>
                    ))
                  : ""}
              </div>
              <hr />
              <div className="FavCart">
                <div className="wishlistButton">
                  <div className="text">Favoritos</div>
                  <div className="icon">
                    {Wish(productId, state, handleHeart)}
                  </div>
                </div>
                <div className="addCartButton">
                  <div className="text">AddCart</div>
                  <div className="icon">
                    {" "}
                    {Cart(productId, state, handleHeart)}
                  </div>
                </div>
                <div className='wishlistButton'>
                  <WishlistButton/>
                </div>
              </div>
            </div>
          </div>
          <div className="description">
            <h3>Descripcion</h3>
            <hr />
            <p>{productDetail.description}</p>
          </div>
          <Reviews id = {productDetail.id}/>
          <h1>Comentarios de otros usuarios</h1>
          {reviews[0]?.map(e => {
            let fullName;
            let firstName;
            let lastName;
            let photoURL;
            e.user? fullName=e.user.fullName : fullName="Anonymous";
            e.user? firstName=e.user.firstName : firstName="";
            e.user? lastName=e.user.lastName : lastName="";
            e.user? photoURL=e.user.photoURL : photoURL="";
            return (
            <CommentaryReviews key={e.id} id={e.id} score={e.score} content={e.content} userId={e.userId} firstName={firstName} lastName={lastName} fullName={fullName} photoURL={photoURL} />
            )
          })}
          
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default ProductDetails;
