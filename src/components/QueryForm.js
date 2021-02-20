import React, { useState } from "react";
import { useGlobalContext } from "../context";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";


const QueryForm = () => {
  const { searchUserById, fetchError } = useGlobalContext();
  const [queryUserId, setQueryUserId] = useState(null);
  const [error, setError] = useState({ show: false, message: "error" });
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (

      <section className="section-center">
        <form className="search-form" onSubmit={handleSubmit}>
          <h2>Search a user with id </h2>
          <br />
          <h4>
            <Link to="/register">Add new user</Link>
          </h4>
          <div>
            <input
              type="text"
              placeholder="search"
              className="form-input"
              value={queryUserId}
              onChange={(e) => setQueryUserId(e.target.value)}
            />
            <button
              className="submit-btn"
              onClick={() => {
                if (queryUserId !== null) {
                  searchUserById(queryUserId);
                }
              }}
            >
              <FaSearch />
            </button>
          </div>
          {fetchError && <div className="error">User Id not found</div>}
        </form>
      </section>

  );
};


export default QueryForm;
