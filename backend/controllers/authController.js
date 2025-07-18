const users = [];
//references chatgpt, https://www.youtube.com/watch?v=UuhnalzKwE0
// Function to handle registration
function registerUser(req, res) {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(409).json({ error: 'User already exists' });
  }

  users.push({ email, password, role });
  res.status(201).json({ message: 'User registered' });
}

function loginUser(req, res) {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', role: user.role });
}

module.exports = { registerUser, loginUser };
