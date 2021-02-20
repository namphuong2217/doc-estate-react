import React, { useState } from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import { FaCentercode } from "react-icons/fa";
import styled from "styled-components";

const RegisterForm = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [registerNewUser, setRegisterNewUser] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if (!user.name || !user.email || !user.password) {
      alert("Please fill in the blank ");
      return;
    } else {
      setUser({ name: "", email: "", password: "" });
      fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log(response);
        if (response.ok) {
          setRegisterNewUser(true);
          setError(false);
        } else {
          setError(true);
          setRegisterNewUser(false);
        }
      });
    }
  };
  return (
    <Wrapper>
      <section className="container">
        <form className="form-control" onSubmit={handleSubmit}>
          <div className="form-control input">
            <input
              type="text"
              placeholder="Enter Username"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="form-control input">
            <input
              type="text"
              placeholder="Enter Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="form-control input">
            <input
              type="password"
              placeholder="Enter Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <input type="submit" value="Register User" className="btn" />
          <br></br>
          <br></br>
          <div className='footer'>
            <div className='btn'><Link to="/">List All Users</Link> </div>
          </div>
          {registerNewUser && (
            <div className="success">Register user successful</div>
          )}
          {error && <div className="error">Register user unsuccessful</div>}
        </form>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Poppins", sans-serif;
  }

  .container {
    max-width: 500px;
    margin: 30px auto;
    overflow: auto;
    min-height: 300px;
    border: 1px solid steelblue;
    padding: 30px;
    border-radius: 5px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .btn {
    display: inline-block;
    background: var(--clr-primary-6);
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px;
    font-family: inherit;
  }

  .btn:focus {
    outline: none;
  }

  .btn:active {
    transform: scale(0.98);
  }

  .btn-block {
    display: block;
    width: 100%;
  }

  .task {
    background: #f4f4f4;
    margin: 5px;
    padding: 10px 20px;
    cursor: pointer;
  }

  .task.reminder {
    border-left: 5px solid green;
  }

  .task h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .add-form {
    margin-bottom: 40px;
  }

  .form-control {
    margin: 20px 0;
  }

  .form-control label {
    display: block;
  }

  .form-control input {
    width: 100%;
    height: 40px;
    margin: 5px;
    padding: 3px 7px;
    font-size: 17px;
  }

  .form-control-check {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .form-control-check label {
    flex: 1;
  }

  .form-control-check input {
    flex: 2;
    height: 20px;
  }

  footer {
    margin-top: 30px;
    text-align: center;
  }
`;
export default RegisterForm;
