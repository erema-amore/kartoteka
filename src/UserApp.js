import React, { useState, useEffect } from "react";

const UserApp = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users"));

    if (savedUsers) {
      setUsers(savedUsers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const editUser = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setSelectedUser(null);
    setIsEditing(false);
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setSelectedUser(null);
    setIsEditing(false);
  };

  const UserForm = ({ addUser }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [permissions, setPermissions] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();

      const newUser = {
        id: Date.now(),
        name,
        email,
        permissions: permissions.split(",").map((permission) =>
          permission.trim()
        ),
      };

      addUser(newUser);

      setName("");
      setEmail("");
      setPermissions("");
    };

    return (
      <form onSubmit={handleSubmit}>
        <h2>Add User</h2>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="permissions">Permissions (comma-separated):</label>
        <input
          type="text"
          id="permissions"
          value={permissions}
          onChange={(e) => setPermissions(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    );
  };

  const UserList = ({ users, deleteUser, editUser }) => {
    return (
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <img src={user.image} alt={user.name} />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <ul>
              {user.permissions.map((permission) => (
                <li key={permission}>{permission}</li>
              ))}
            </ul>
            <button onClick={() => editUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <UserForm addUser={addUser} />
      <UserList users={users} deleteUser={deleteUser} editUser={editUser} />
      {isEditing && (
        <UserForm
          addUser={updateUser}
          cancelEdit={cancelEdit}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};

export default UserApp;
