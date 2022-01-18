import React from "react";
import "./Footer.css";
import { BsGithub, BsFacebook, BsInstagram } from "react-icons/bs";

function Footer() {
  return (
    <div className="footer">
      <p>Designed & developed by Rohan Magar</p>
      <p>
        <BsGithub />{" "}
        <a
          href="https://github.com/Rohan-mgr/React-Movie-App"
          target="_blank"
          rel="noreferrer"
        >
          View Code
        </a>
      </p>
      <p>
        <BsFacebook />{" "}
        <a
          href="https://www.facebook.com/rohan.ranamagar.12"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Stay Connected With Me
        </a>
      </p>
      <p>
        <BsInstagram />{" "}
        <a
          href="https://www.instagram.com/rohan_magar_07/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Checkout My Reels on
        </a>
      </p>
      <div style={{ marginTop: "4rem" }}>
        All rights Reserved | Rohan &copy; copyright {new Date().getFullYear()}{" "}
      </div>
    </div>
  );
}

export default Footer;
