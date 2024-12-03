export let users = [
  {
    id: 1,
    firstName: "Graham",
    lastName: "Fernando",
    email: "graham@gmail.com",
    password: "Graham1234*",
    cart: [],
  },
  {
    id: 2,
    firstName: "Noelle",
    lastName: "Perera",
    email: "noelle@gmail.com",
    password: "1234Noelle&",
    cart: [],
  },
  {
    id: 3,
    firstName: "Amal",
    lastName: "Silva",
    email: "amal@gmail.com",
    password: "1234Amal#",
    cart: [],
  },
];

export const addUser = (newUser) => {
  const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);

  users = [...users, { id: maxId + 1, ...newUser }];

  return { id: maxId + 1, ...newUser };
};
