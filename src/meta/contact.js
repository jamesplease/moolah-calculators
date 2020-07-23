import React from "react";
import "./contact.css";

export default function Contact() {
  return (
    <div>
      <h1 className="heading1">Contact</h1>
      <p>
        Feel free to send me a message if you have any questions or comments
        about the calculators on this site.
      </p>
      <p>The best way to reach me is through Twitter or email.</p>
      <ul className="contact_list">
        <li>
          Twitter: <a href="https://twitter.com/jmsplease">@jmsplease</a>
        </li>
        <li>
          Email:{" "}
          <a href="mailto:hello.ficalc@gmail.com">hello.ficalc@gmail.com</a>
        </li>
      </ul>
    </div>
  );
}
