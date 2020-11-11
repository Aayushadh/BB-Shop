import bcrypt from "bcrypt";

const users = [
  {
    name: "admin",
    email: "admin@abc.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "aayush",
    email: "aayush@abc.com",
    password: bcrypt.hashSync("23456", 10),
  },
  {
    name: "lol",
    email: "lol@abc.com",
    password: bcrypt.hashSync("34567", 10),
  },
];

export default users;
