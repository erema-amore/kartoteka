import React, { useState, useEffect } from "react";
import "./styles.css";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Если нет сохраненных данных, загружаем начальные данные из JSON-файла
      const initialUsers = [
        {
          name: "Артем Иванов",
          email: "artem@gmail.com",
          permissions: ["Блог", "Аналитика"],
          image:
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        },
        {
          name: "Лена Новикова",
          email: "lenkan@gmail.com",
          permissions: ["Администратор"],
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        },
        {
          name: "Максим Иванов",
          email: "maksiim@gmail.com",
          permissions: ["Акции", "Модерация объявлений", "Тех. поддержка"],
          image:
            "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg",
        },
        {
          name: "Айжулдыз Кошкинбай",
          email: "aizhzk@gmail.com",
          permissions: ["Обращение клиентов"],
          image:
            "https://gorodprizrak.com/wp-content/uploads/2021/01/346545.jpg",
        },
      ];

      setUsers(initialUsers);
    }
  }, []);

  useEffect(() => {
    // Сохранение пользователей в localStorage при изменении
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const deleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  const editUser = (index, updatedUser) => {
    const updatedUsers = [...users];
    updatedUsers[index] = updatedUser;
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>User List</h1>
      {users.map((user, index) => (
        <div className="user-container" key={index}>
          <img src={user.image} alt={user.name} />
          <div className="user-details">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <ul>
              {user.permissions.map((permission, index) => (
                <li key={index}>{permission}</li>
              ))}
            </ul>
          </div>
          <div className="user-actions">
            <button onClick={() => deleteUser(index)}>Delete</button>
            <button
              onClick={() =>
                editUser(index, {
                  ...user,
                  name: user.name + " Edited",
                })
              }
            >
              Edit
            </button>
          </div>
        </div>
      ))}
      <UserForm addUser={addUser} />
    </div>
  );
};

const UserForm = ({ addUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [permissions, setPermissions] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Создание объекта пользователя
    const newUser = {
      name,
      email,
      permissions: permissions.split(",").map((permission) => permission.trim()),
      image: photo ? URL.createObjectURL(photo) : null, // Получение URL-адреса выбранной фотографии
    };

    addUser(newUser);

    // Сброс значений полей
    setName("");
    setEmail("");
    setPermissions("");
    setPhoto(null);
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
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
      <label htmlFor="photo">Photo:</label>
      <input type="file" id="photo" onChange={handlePhotoChange} />
      <button type="submit">Add</button>
    </form>
  );
};

export default UserList;
