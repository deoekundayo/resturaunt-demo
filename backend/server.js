const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database setup
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database with users and food_items tables
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      contact_number TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Users table ready');
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS food_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      category TEXT,
      cuisine TEXT,
      available INTEGER DEFAULT 1,
      vegetarian INTEGER DEFAULT 0,
      price TEXT DEFAULT '$0.00',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating food_items table:', err.message);
    } else {
      console.log('Food items table ready');
    }
  });
}

// API Routes

// Get all users
app.get('/api/users', (req, res) => {
  db.all('SELECT id, name, email, contact_number, created_at, updated_at FROM users ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.json(rows);
  });
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT id, name, email, contact_number, created_at, updated_at FROM users WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching user:', err.message);
      return res.status(500).json({ error: 'Failed to fetch user' });
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(row);
  });
});

// Create new user
app.post('/api/users', async (req, res) => {
  const { name, email, contact_number, password } = req.body;

  // Validation
  if (!name || !email || !contact_number || !password) {
    return res.status(400).json({ error: 'All fields are required: name, email, contact_number, password' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Check if email already exists
  db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) {
      console.error('Error checking email:', err.message);
      return res.status(500).json({ error: 'Failed to check email' });
    }
    
    if (row) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Insert user
      db.run(
        'INSERT INTO users (name, email, contact_number, password) VALUES (?, ?, ?, ?)',
        [name, email, contact_number, hashedPassword],
        function(err) {
          if (err) {
            console.error('Error creating user:', err.message);
            return res.status(500).json({ error: 'Failed to create user' });
          }
          
          // Return created user (without password)
          db.get('SELECT id, name, email, contact_number, created_at, updated_at FROM users WHERE id = ?', [this.lastID], (err, user) => {
            if (err) {
              console.error('Error fetching created user:', err.message);
              return res.status(500).json({ error: 'User created but failed to fetch' });
            }
            res.status(201).json({ 
              message: 'User created successfully',
              user: user
            });
          });
        }
      );
    } catch (hashError) {
      console.error('Error hashing password:', hashError);
      return res.status(500).json({ error: 'Failed to process password' });
    }
  });
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, contact_number, password } = req.body;

  // Check if user exists
  db.get('SELECT id FROM users WHERE id = ?', [id], async (err, row) => {
    if (err) {
      console.error('Error checking user:', err.message);
      return res.status(500).json({ error: 'Failed to check user' });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check email uniqueness if email is being updated
    if (email) {
      db.get('SELECT id FROM users WHERE email = ? AND id != ?', [email, id], async (emailErr, emailRow) => {
        if (emailErr) {
          console.error('Error checking email:', emailErr.message);
          return res.status(500).json({ error: 'Failed to check email' });
        }
        
        if (emailRow) {
          return res.status(400).json({ error: 'Email already exists' });
        }

        // Continue with update
        performUpdate();
      });
    } else {
      performUpdate();
    }

    async function performUpdate() {
      // Build update query dynamically
      const updates = [];
      const values = [];

      if (name) {
        updates.push('name = ?');
        values.push(name);
      }
      if (email) {
        updates.push('email = ?');
        values.push(email);
      }
      if (contact_number) {
        updates.push('contact_number = ?');
        values.push(contact_number);
      }
      if (password) {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          updates.push('password = ?');
          values.push(hashedPassword);
        } catch (hashErr) {
          console.error('Error hashing password:', hashErr);
          return res.status(500).json({ error: 'Failed to process password' });
        }
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      updates.push('updated_at = CURRENT_TIMESTAMP');
      values.push(id);
      
      const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
      
      db.run(query, values, function(updateErr) {
        if (updateErr) {
          console.error('Error updating user:', updateErr.message);
          return res.status(500).json({ error: 'Failed to update user' });
        }
        
        // Return updated user
        db.get('SELECT id, name, email, contact_number, created_at, updated_at FROM users WHERE id = ?', [id], (fetchErr, user) => {
          if (fetchErr) {
            console.error('Error fetching updated user:', fetchErr.message);
            return res.status(500).json({ error: 'User updated but failed to fetch' });
          }
          res.json({ 
            message: 'User updated successfully',
            user: user
          });
        });
      });
    }
  });
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Error deleting user:', err.message);
      return res.status(500).json({ error: 'Failed to delete user' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  });
});

// ========== Food Items API ==========

// Get all food items
app.get('/api/food-items', (req, res) => {
  db.all(
    'SELECT id, name, description, image_url, category, cuisine, available, vegetarian, price, created_at, updated_at FROM food_items ORDER BY id ASC',
    [],
    (err, rows) => {
      if (err) {
        console.error('Error fetching food items:', err.message);
        return res.status(500).json({ error: 'Failed to fetch food items' });
      }
      const items = rows.map(row => ({
        ...row,
        available: Boolean(row.available),
        vegetarian: Boolean(row.vegetarian),
        imageUrl: row.image_url
      }));
      res.json(items);
    }
  );
});

// Get food item by ID
app.get('/api/food-items/:id', (req, res) => {
  const { id } = req.params;
  db.get(
    'SELECT id, name, description, image_url, category, cuisine, available, vegetarian, price, created_at, updated_at FROM food_items WHERE id = ?',
    [id],
    (err, row) => {
      if (err) {
        console.error('Error fetching food item:', err.message);
        return res.status(500).json({ error: 'Failed to fetch food item' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Food item not found' });
      }
      res.json({
        ...row,
        available: Boolean(row.available),
        vegetarian: Boolean(row.vegetarian),
        imageUrl: row.image_url
      });
    }
  );
});

// Create new food item
app.post('/api/food-items', (req, res) => {
  const { name, description, imageUrl, image_url, category, cuisine, available, vegetarian, price } = req.body;
  const img = imageUrl || image_url || '';

  if (!name || !category || !cuisine) {
    return res.status(400).json({ error: 'Required fields: name, category, cuisine' });
  }

  const availableInt = available === true || available === 'true' || available === 'yes' ? 1 : 0;
  const vegetarianInt = vegetarian === true || vegetarian === 'true' || vegetarian === 'yes' ? 1 : 0;
  const priceStr = price && String(price).trim() ? String(price).trim() : '$0.00';

  db.run(
    'INSERT INTO food_items (name, description, image_url, category, cuisine, available, vegetarian, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, description || '', img, category, cuisine, availableInt, vegetarianInt, priceStr],
    function(err) {
      if (err) {
        console.error('Error creating food item:', err.message);
        return res.status(500).json({ error: 'Failed to create food item' });
      }
      db.get(
        'SELECT id, name, description, image_url, category, cuisine, available, vegetarian, price, created_at, updated_at FROM food_items WHERE id = ?',
        [this.lastID],
        (fetchErr, row) => {
          if (fetchErr) {
            console.error('Error fetching created food item:', fetchErr.message);
            return res.status(500).json({ error: 'Food item created but failed to fetch' });
          }
          res.status(201).json({
            message: 'Food item created successfully',
            foodItem: {
              ...row,
              available: Boolean(row.available),
              vegetarian: Boolean(row.vegetarian),
              imageUrl: row.image_url
            }
          });
        }
      );
    }
  );
});

// Update food item
app.put('/api/food-items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, imageUrl, image_url, category, cuisine, available, vegetarian, price } = req.body;

  db.get('SELECT id FROM food_items WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error checking food item:', err.message);
      return res.status(500).json({ error: 'Failed to check food item' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    const updates = [];
    const values = [];

    if (name !== undefined) {
      updates.push('name = ?');
      values.push(name);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }
    if (imageUrl !== undefined || image_url !== undefined) {
      updates.push('image_url = ?');
      values.push(imageUrl !== undefined ? imageUrl : image_url);
    }
    if (category !== undefined) {
      updates.push('category = ?');
      values.push(category);
    }
    if (cuisine !== undefined) {
      updates.push('cuisine = ?');
      values.push(cuisine);
    }
    if (available !== undefined) {
      const availableInt = available === true || available === 'true' || available === 'yes' ? 1 : 0;
      updates.push('available = ?');
      values.push(availableInt);
    }
    if (vegetarian !== undefined) {
      const vegetarianInt = vegetarian === true || vegetarian === 'true' || vegetarian === 'yes' ? 1 : 0;
      updates.push('vegetarian = ?');
      values.push(vegetarianInt);
    }
    if (price !== undefined && String(price).trim()) {
      updates.push('price = ?');
      values.push(String(price).trim());
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const query = `UPDATE food_items SET ${updates.join(', ')} WHERE id = ?`;

    db.run(query, values, function(updateErr) {
      if (updateErr) {
        console.error('Error updating food item:', updateErr.message);
        return res.status(500).json({ error: 'Failed to update food item' });
      }
      db.get(
        'SELECT id, name, description, image_url, category, cuisine, available, vegetarian, price, created_at, updated_at FROM food_items WHERE id = ?',
        [id],
        (fetchErr, updated) => {
          if (fetchErr) {
            console.error('Error fetching updated food item:', fetchErr.message);
            return res.status(500).json({ error: 'Food item updated but failed to fetch' });
          }
          res.json({
            message: 'Food item updated successfully',
            foodItem: {
              ...updated,
              available: Boolean(updated.available),
              vegetarian: Boolean(updated.vegetarian),
              imageUrl: updated.image_url
            }
          });
        }
      );
    });
  });
});

// Delete food item
app.delete('/api/food-items/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM food_items WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Error deleting food item:', err.message);
      return res.status(500).json({ error: 'Failed to delete food item' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.json({ message: 'Food item deleted successfully' });
  });
});

// ========== Auth ==========

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find user by email
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      console.error('Error finding user:', err.message);
      return res.status(500).json({ error: 'Failed to authenticate' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    try {
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Return user data (without password)
      res.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          contact_number: user.contact_number,
          created_at: user.created_at
        }
      });
    } catch (compareErr) {
      console.error('Error comparing password:', compareErr);
      return res.status(500).json({ error: 'Failed to authenticate' });
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});

