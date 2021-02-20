import React from "react";
import { useGlobalContext } from "../context";

const Users = () => {
  const {
    isLoading,
    users,
    deleteUser,
    querySingleUser,
    singleUser,
    returnToAllUsers,
  } = useGlobalContext();

  if (isLoading) {
    return <div className="loading"></div>;
  }
  if (querySingleUser) {
    return (
      <section className="users">
        <article key={singleUser.id} className="story">
          <h4 className="title">User ID: {singleUser.id}</h4>
          <p className="info">
            Username: {singleUser.name}
            <br></br>
            Email: {singleUser.email}
          </p>
          <div>
            <button className="normal-btn" onClick={() => returnToAllUsers()}>
              Back to all users |
            </button>
            <button
              className="remove-btn"
              onClick={() => deleteUser(singleUser.id)}
            >
              Delete user
            </button>
          </div>
        </article>
      </section>
    );
  }
  return (
    <section className="users">
      {users.map((user) => {
        const { id, name, email } = user;
        return (
          <article key={id} className="user">
            <h4 className="title">User ID: {id}</h4>
            <p className="info">
              Username: {name}
              <br></br>
              Email: {email}
            </p>
            <div>
              <button className="remove-btn" onClick={() => deleteUser(id)}>
                Delete user
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Users;
