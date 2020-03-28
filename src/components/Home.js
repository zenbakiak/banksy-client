import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = props => {
  const [user, setUser] = useState({ attributes: {} });
  const [movements, setMovements] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!currentUser) return;
    axios
      .get(`http://localhost:3001/users/${currentUser.attributes.username}`, {
        headers: { Authorization: `Bearer ${currentUser.attributes.token}` }
      })
      .then(response => {
        setUser(response.data.data);
        getMovements();
      })
      .catch(error => console.log("api errors:", error));
  }, []);

  const getMovements = () => {
    axios
      .get(`http://localhost:3001/movements`, {
        headers: { Authorization: `Bearer ${currentUser.attributes.token}` }
      })
      .then(response => {
        setMovements(response.data.data);
      })
      .catch(error => console.log("api errors:", error));
  };

  const movementClass = movement => {
    return movement.attributes.receiver_id === parseInt(user.id)
      ? "payment"
      : "withdrawal";
  };

  return (
    <React.Fragment>
      <Navbar {...props} />
      {user.id && (
        <div className="container">
          <header>
            <h2>Your balance: {user.attributes.balance / 100} USD</h2>
          </header>

          <h3>Your activity</h3>
          <table className="movements">
            <tbody>
              {movements.map(movement => (
                <tr>
                  <td className="description">
                    <h4 className="concept">
                      {" "}
                      » {movement.attributes.concept || "Without concept"}
                    </h4>
                    <small className="beneficiary">
                      {movementClass(movement) === "withdrawal" ? (
                        <>
                          Beneficiary: {movement.attributes.receiver_username}{" "}
                          at {movement.attributes.created_at}
                        </>
                      ) : (
                        <>
                          Sent by: {movement.attributes.sender_username} at{" "}
                          {movement.attributes.created_at}
                        </>
                      )}
                    </small>
                  </td>
                  <td className="amount-col">
                    <h4 className={`amount ${movementClass(movement)}`}>
                      {movementClass(movement) === "withdrawal" ? "- " : "+ "}${" "}
                      {movement.attributes.amount / 100} USD
                    </h4>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link to="/new_payment" className="new-payment">
            Send payment
          </Link>
        </div>
      )}
    </React.Fragment>
  );
};
export default Home;
