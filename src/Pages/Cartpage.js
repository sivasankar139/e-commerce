import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../Components/Layout";
import db from "../fireConfig";

const Cartpage = () => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [pincode, setPincode] = useState();
  const [number, setNumber] = useState();
  const[loading,setLoading]=useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp += cartItem.price;
    });
    setTotalAmount(temp);
  }, [cartItems]);
  const dispatch = useDispatch();
  const deleteFromCart = (item) => {
    dispatch({ type: "DELETE_FROM_CART", payload: item });
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const placeOrder = async() => {
    const details = {
      name,
      address,
      pincode,
      number,
    };
    console.log(details);
    const orderInfo={
      cartItems,
      details,
      email:JSON.parse(localStorage.getItem('currentUser')).user.email,
      userId:JSON.parse(localStorage.getItem('currentUser')).user.uid,
    }
    try{
      setLoading(true)
      const result =await addDoc(collection(db,"orders"),orderInfo);
      setLoading(false);
      toast.success("Order Placed Successfully")
      handleClose();
      navigate("/orders")
      
    }
    catch(error){
      console.log(error);
      setLoading(false);
      toast.error("Order failed")
    }
  };
  return (
    <Layout loading={loading}>
      <div className="container">
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              return (
                <tr>
                  <td>
                    <img src={item.imageURL} height={80} width={80} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <FaTrash onClick={() => deleteFromCart(item)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="d-flex justify-content-end mt-3">
          <h2 className="total_amount">Total Amount = {totalAmount} Rs/-</h2>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button onClick={handleShow}>Place Order</button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="register-form-latest">
            {/* <h2>Register</h2>
            <hr /> */}
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="textarea"
              className="form-control"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Enter Phone Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            {/* <button className="my-3" onClick={register}>REGISTER</button>
             {/* <button onClick={()=>navigate("/login") } className="mx-3">LOGIN</button> */}
            {/* <hr/> */}
            {/* <Link to="/login">Click here to Login</Link> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={placeOrder}>Order</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Cartpage;
