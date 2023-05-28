import React from "react";

function Footer(props) {
  return (
    <div className="footerAllRights">
      <p>
        All rights reserved © {new Date().getFullYear()}, Dept. of Information &
        Communication Engineering. Powered by ICT Center, RU.
      </p>
    </div>
  );
}

export default Footer;
