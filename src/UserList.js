import React, { useState, useEffect } from "react";
import "./styles.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    permissions: [],
    image: ""
  });
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    // Здесь вы можете загрузить данные из JSON-файла или любого другого источника данных
    // В данном примере мы просто используем статические данные

    const initialUsers = [
      {
        name: "Артем Иванов",
        email: "artem@gmail.com",
        permissions: ["Блог", "Аналитика"],
        image:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      },
      {
        name: "Лена Новикова",
        email: "lenkan@gmail.com",
        permissions: ["Администратор"],
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
      },
      {
        name: "Максим Иванов",
        email: "maksiim@gmail.com",
        permissions: ["Акции", "Модерация объявлений", "Тех. поддержка"],
        image:
          "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg"
      },
      {
        name: "Айжулдыз Кошкинбай",
        email: "aizhzk@gmail.com",
        permissions: ["Обращение клиентов"],
        image:
          "https://gorodprizrak.com/wp-content/uploads/2021/01/346545.jpg"
      }
    ];

    setUsers(initialUsers);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewUser({ ...newUser, image: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const addUser = () => {
    setUsers([...users, newUser]);
    setNewUser({
      name: "",
      email: "",
      permissions: [],
      image: ""
    });
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
    setEditIndex(-1);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const cancelEdit = () => {
    setEditIndex(-1);
  };

  return (
    <div>
      <h1>User List</h1>
      {users.map((user, index) => (
        <div className="user-container" key={index}>
          <img src={user.image} alt={user.name} />
          <div className="user-info">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) =>
                    editUser(index, { ...user, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) =>
                    editUser(index, { ...user, email: e.target.value })
                  }
                />
              </>
            ) : (
              <>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </>
            )}
            <ul>
              {user.permissions.map((permission, i) => (
                <li key={i}>{permission}</li>
              ))}
            </ul>
            {editIndex === index ? (
              <>
                <button onClick={() => editUser(index, user)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => handleEdit(index)}>Редактировать</button>
                <button onClick={() => deleteUser(index)}>Удалить</button>
              </>
            )}
          </div>
        </div>
      ))}
      {editIndex === -1 && (
        <div className="add-user">
          <h2>Add User</h2>
          <input
            type="text"
            placeholder="ФИО"
            value={newUser.name}
            onChange={(e) =>
              setNewUser({ ...newUser, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) =>
              setNewUser({ ...newUser, email: e.target.value })
            }
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button onClick={addUser}>Добавить</button>
        </div>
      )}
    </div>
  );
};

export default UserList;
