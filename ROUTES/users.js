import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Mock database with unique IDs
let users = [
  { id: uuidv4(), first_name: 'John', last_name: 'Doe', email: 'johndoe@example.com' },
  { id: uuidv4(), first_name: 'Alice', last_name: 'Smith', email: 'alicesmith@example.com' },
];

// ✅ Get all users
router.get('/', (req, res) => {
  res.json({ users });
});

// ✅ Add a new user with validation
router.post('/', (req, res) => {
  const { first_name, last_name, email } = req.body;

  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newUser = { id: uuidv4(), first_name, last_name, email };
  users.push(newUser);

  res.status(201).json({ message: `${first_name} has been added`, user: newUser });
});

// ✅ Get a single user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  if (!foundUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(foundUser);
});

// ✅ Delete a user by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1); // Remove user from array

  res.json({ message: `User with ID ${id} deleted successfully.` });
});

// ✅ Update a user by ID
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email } = req.body;

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (first_name) user.first_name = first_name;
  if (last_name) user.last_name = last_name;
  if (email) user.email = email;

  res.json({ message: `User with ID ${id} has been updated`, user });
});

export default router;
