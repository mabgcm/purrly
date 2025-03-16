import PropTypes from "prop-types";
import { useState } from "react";

const CustomForm = ({ onValidated }) => {
  let email;
  const submit = () => {
    email &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        email: email.value
      });

    let emailInput = document.getElementById("mc-form-email");
    emailInput.value = "";
  };

  return (
    <div className="subscribe-form">
      <div className="mc-form">
        <div>
          <input
            id="mc-form-email"
            className="email"
            ref={node => (email = node)}
            type="email"
            placeholder="Enter your email address..."
          />
        </div>
        <div className="clear">
          <button className="button" onClick={submit}>
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
};

const SubscribeEmail = ({ googleScriptUrl }) => {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  const subscribe = (formData) => {
    setStatus("sending");
    fetch(googleScriptUrl, {
      method: 'POST',
      mode: 'no-cors',  // This sets the mode to no-cors
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        setStatus("success");
        setMessage("Subscription request sent.");
      })
      .catch(() => {
        setStatus("error");
        setMessage("Subscription request failed. Please try again.");
      });
  };

  return (
    <div>
      <CustomForm
        onValidated={formData => subscribe(formData)}
      />
      {status === "sending" && (
        <div style={{ color: "#3498db", fontSize: "12px" }}>sending...</div>
      )}
      {status === "error" && (
        <div
          style={{ color: "#e74c3c", fontSize: "12px" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "#2ecc71", fontSize: "12px" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </div>
  );
};

SubscribeEmail.propTypes = {
  googleScriptUrl: PropTypes.string.isRequired
};

export default SubscribeEmail;
