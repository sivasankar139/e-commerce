import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { firebaseProducts } from "../firebaseProducts";
import db from "../fireConfig";
import OrdersPage from "./OrdersPage";
const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setLoading(true);
      const users = await getDocs(collection(db, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const object = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(object);
        setLoading(false);
      });

      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  console.log(cartItems);
  return (
    <Layout loading={loading}>
      <Tabs
        defaultActiveKey="products"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="products" title="Products">
          <div className="container">
            <div className="d-flex w-50 mx-2">
              <input
                type="text"
                value={search}
                className="form-control"
                placeholder="Search Items"
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="form-control mt-3 mx-2 "
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">All</option>
                <option value="electronics">Electronics</option>
                <option value="computers">Computers</option>
                <option value="fashion"> Fashion</option>
                <option value="mobiles">Mobiles</option>
              </select>
            </div>
            <div className="row">
              {products
                .filter((obj) => obj.name.toLowerCase().includes(search))
                .filter((obj) =>
                  obj.category.toLowerCase().includes(filterType)
                )
                .map((product) => {
                  return (
                    <div className="col-md-4">
                      <div className="m-2 p-1 product position-relative">
                        <div className="product-content ">
                          <p>{product.name}</p>
                          <div className="text-center">
                            <img
                              src={product.imageURL}
                              alt={product.category}
                              className="product-img"
                            />
                          </div>
                        </div>
                        <div className="product-actions">
                          <h2>{product.price} RS/-</h2>
                          <div className="d-flex">
                            <button
                              className="mx-2"
                              onClick={() => addToCart(product)}
                              disabled={cartItems.find((x) => {
                                if (x.id === product.id) {
                                  return true;
                                }
                              })}
                            >
                              ADD TO CART
                            </button>
                            <button
                              onClick={() => {
                                navigate(`/productinfo/${product.id}`);
                              }}
                            >
                              VIEW
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </Tab>
        <Tab eventKey="orders" title="orders">
          <OrdersPage />
        </Tab>
      </Tabs>
    </Layout>
  );
};

export default Homepage;
