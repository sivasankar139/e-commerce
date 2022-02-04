import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loading from "./Loading";

const Layout = (props) => {
  return (
    <div>
      {props.loading && <Loading/>}
      <Header />
      <div className="content">{props.children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
