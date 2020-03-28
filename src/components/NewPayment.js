import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = props => {
  const [user, setUser] = useState({ attributes: {} });
  const [users, setUsers] = useState([]);

  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState();
  const [concept, setConcept] = useState();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!currentUser) return;
    axios
      .get(`http://localhost:3001/users/${currentUser.attributes.username}`, {
        headers: { Authorization: `Bearer ${currentUser.attributes.token}` }
      })
      .then(response => {
        setUser(response.data.data);

        getUsers();
      })
      .catch(error => console.log("api errors:", error));
  }, []);

  const getUsers = () => {
    axios
      .get(`http://localhost:3001/users`, {
        headers: { Authorization: `Bearer ${currentUser.attributes.token}` }
      })
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => console.log("api errors:", error));
  };

  const handleSubmit = () => {
    axios
      .post(
        `http://localhost:3001/movements`,
        {
          movement: {
            receiver_id: userId,
            amount: amount * 100,
            concept
          }
        },
        {
          headers: { Authorization: `Bearer ${currentUser.attributes.token}` }
        }
      )
      .then(response => {
        props.history.push("/");
      })
      .catch(error => console.log("api errors:", error));
  };

  return (
    <React.Fragment>
      <Navbar {...props} />
      {user.id && (
        <div className="container">
          <header>
            <h2>Your balance: {user.attributes.balance / 100} USD</h2>
          </header>
          Send money to:
          <br />
          <select
            className="select-user"
            name="userId"
            onChange={e => setUserId(e.target.value)}
            value={userId}
          >
            <option value="">Select one of your friends</option>
            {users.map(item => (
              <option value={item.id}>
                {item.attributes.first_name} {item.attributes.last_name} «
                {item.attributes.username}»
              </option>
            ))}
          </select>
          <input
            className="amount-input"
            type="number"
            name="amount"
            value={amount}
            placeholder="10.00"
            max={user.attributes.balance / 100}
            onChange={e => setAmount(e.target.value)}
          />
          <button
            className="send-payment-button"
            type="button"
            disabled={
              amount <= 0 ||
              amount > user.attributes.balance / 100 ||
              userId.length === 0
            }
            onClick={handleSubmit}
          >
            Send »
          </button>
          <br />
          <textarea
            name="concept"
            placeholder="Concept or notes"
            value={concept}
            onChange={e => setConcept(e.target.value)}
          ></textarea>
          {amount > user.attributes.balance / 100 && (
            <small>* Insufficient funds.</small>
          )}
        </div>
      )}
    </React.Fragment>
  );
};
export default Home;
