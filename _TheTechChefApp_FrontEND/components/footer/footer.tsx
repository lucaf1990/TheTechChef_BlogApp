import React, { HTMLAttributes, HtmlHTMLAttributes } from "react";
import { Container } from "react-bootstrap";

export const Footer = () => {
  return (
    <Container>
      <footer>
        <div className="mt-5 w-full  border-top border-white  p-4  d-flex justify-content-between">
          <p className="d-flex ">
            <a href="/" className="hover:underline">
              The Tech Chef
            </a>
            . All Rights Reserved.
          </p>
          <ul className="flex flex-wrap">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </Container>
  );
};
