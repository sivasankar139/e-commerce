import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { firebaseProducts } from "../firebaseProducts";
import db from "../fireConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageURL: "",
    category: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [add, setAdd] = useState(false);
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
  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  };
  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(db, "products", product.id), product);

      handleClose();

      toast.success("Update Product Successfully");
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Update failed");
    }
  };
  const addProductData = async () => {
    try {
      setLoading(true);
      await addDoc(collection(db, "products"), product);

      handleClose();

      toast.success(" Product added Successfully");
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("product adding failed");
    }
  };
  const addProduct = () => {
    setAdd(true);
    handleShow();
  };
  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "products", item.id));
      toast.success("Product delete successfully");
      getData();
    } catch (error) {
      toast.error("product delete failed");
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrdersData();
  }, []);
  const getOrdersData = async () => {
    try {
      setLoading(true);
      const orderResult = await getDocs(collection(db, "orders"));
      const ordersArray = [];
      orderResult.forEach((doc) => {
        
        ordersArray.push(doc.data());
        setLoading(false);
      });

      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout loading={loading}>
      <Tabs
        defaultActiveKey="products"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="products" title="products">
        <div className="d-flex justify-content-between">
        <h3>Products List</h3>
        <button className="btn btn-outline-primary" onClick={addProduct}>
          Add Product
        </button>
      </div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height={80} width={80} />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrash
                    className="mx-3"
                    color="red"
                    size={20}
                    onClick={() => deleteProduct(item)}
                  />
                  <FaEdit
                    onClick={() => editHandler(item)}
                    color="blue"
                    size={20}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{add ? "Add Product" : "Edit Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="register-form-latest">
            {/* <h2>Register</h2>
            <hr /> */}
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <input
              type="text"
              className="form-control"
              placeholder="imageURL"
              value={product.imageURL}
              onChange={(e) =>
                setProduct({ ...product, imageURL: e.target.value })
              }
            />
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            />
            {/* <button className="my-3" onClick={register}>REGISTER</button>
             {/* <button onClick={()=>navigate("/login") } className="mx-3">LOGIN</button> */}
            {/* <hr/> */}
            {/* <Link to="/login">Click here to Login</Link> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>CLOSE</button>
          {add ? (
            <button onClick={addProductData}>SAVE</button>
          ) : (
            <button onClick={updateProduct}>SAVE</button>
          )}
        </Modal.Footer>
      </Modal>
        </Tab>
        <Tab eventKey="orders" title="orders">
        {orders.map((order)=>{
                 return <table className="table mt-3 order">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems.map((item) => {
                      return (
                        <tr>
                          <td>
                            <img src={item.imageURL} height={80} width={80} />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              })}
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled></Tab>
      </Tabs>

     
    </Layout>
  );
};

export default AdminPage;
