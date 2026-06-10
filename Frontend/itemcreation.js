

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const SECRET = process.env.ITEM_SECRET || 'dev_secret_change_me';

// In-memory store (replace with DB in production)
const items = [];
const users = [{ id: 1, username: 'admin' }];

function authRequired(req, res, next) {
	const auth = req.headers.authorization;
	if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
	const token = auth.slice(7);
	try {
		const payload = jwt.verify(token, SECRET);
		// attach user info
		req.user = payload;
		next();
	} catch (e) {
		return res.status(401).json({ error: 'Invalid token' });
	}
}

// Simple login for demo: accepts username and returns a token if user exists
app.post('/login', (req, res) => {
	const { username } = req.body;
	if (!username) return res.status(400).json({ error: 'username required' });
	const user = users.find(u => u.username === username);
	if (!user) return res.status(401).json({ error: 'Invalid credentials' });
	const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '8h' });
	res.json({ token });
});

app.post('/items', authRequired, (req, res) => {
	const { name, price } = req.body;
	if (!name || typeof name !== 'string') return res.status(400).json({ error: 'name required' });
	const p = Number(price);
	if (Number.isNaN(p)) return res.status(400).json({ error: 'price must be a number' });
	const item = { id: items.length + 1, name, price: p, createdBy: req.user.username };
	items.push(item);
	res.status(201).json(item);
});

app.get('/items', authRequired, (req, res) => {
	res.json(items);
});

// Basic health
app.get('/', (req, res) => res.send('Item creation backend running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server listening on port', PORT));
