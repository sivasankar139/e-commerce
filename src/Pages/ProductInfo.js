import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import db from "../fireConfig";
import { getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProductInfo = () => {
  const [product, setProduct] = useState();
  const[loading,setLoading]=useState(false)
  const dispatch=useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const params = useParams();
  useEffect(() => {
    getData();
  }, []);
  console.log("productinfopage", cartItems)
  const getData = async () => {
    setLoading(true)
    const productData = await getDoc(doc(db, "products", params.productId));

    setProduct(productData.data());
    setLoading(false)
  };
  console.log("product", product)
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (
              <div>
                <h3 className="mb-5">
                  <b>{product.name}</b>
                </h3>
                <img
                  src={product.imageURL}
                  alt=""
                  className="product-img-info"
                />
                <hr />
                <p>{product.description}</p>
                <div className="d-flex justify-content-end my-3">
                  <button onClick={()=>addToCart(product)}
                  disabled={cartItems.find((x) => {
                    if (x.id === product.id) {
                      return true;
                    }
                  })}>ADD TO CART</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfo;
