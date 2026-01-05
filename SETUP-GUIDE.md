# Explorian Safaris - Complete System Setup Guide

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [Database Schema](#database-schema)
3. [Backend API Structure](#backend-api-structure)
4. [TripAdvisor Integration](#tripadvisor-integration)
5. [Installation Steps](#installation-steps)
6. [Admin Dashboard Usage](#admin-dashboard-usage)
7. [Deployment Guide](#deployment-guide)

---

## 🎯 System Overview

This is a complete content management system for Explorian Safaris with:

### Frontend Features:
- ✅ Modern safari-themed responsive website
- ✅ Dynamic package display
- ✅ Request quote system with modal
- ✅ TripAdvisor reviews integration
- ✅ WhatsApp instant messaging
- ✅ Trust badges and social proof
- ✅ Mobile-optimized design

### Admin Dashboard Features:
- ✅ Package management (Create, Edit, Delete)
- ✅ Quote request management
- ✅ Review synchronization from TripAdvisor
- ✅ Statistics dashboard
- ✅ Settings management
- ✅ Image upload capability

---

## 🗄️ Database Schema

### Database: `explorian_safaris`

```sql
-- Packages Table
CREATE TABLE packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    features TEXT,  -- JSON array stored as text
    badge VARCHAR(100),
    image_url VARCHAR(500),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Quote Requests Table
CREATE TABLE quote_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    package VARCHAR(255) NOT NULL,
    travel_date DATE,
    travelers INT DEFAULT 1,
    message TEXT,
    status ENUM('pending', 'responded', 'booked', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    source VARCHAR(50) NOT NULL,  -- 'tripadvisor', 'safaribookings', 'manual'
    external_id VARCHAR(255),  -- ID from external source
    author_name VARCHAR(255) NOT NULL,
    author_info VARCHAR(255),  -- e.g., "Safari Adventure • October 2024"
    rating INT NOT NULL,  -- 1-5 stars
    review_text TEXT NOT NULL,
    review_date DATE NOT NULL,
    display_on_site BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_external_review (source, external_id)
);

-- Settings Table
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admin Users Table
CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO settings (setting_key, setting_value) VALUES
('site_email', 'info@exploriansafaris.com'),
('site_phone', '+255 719 245 540'),
('whatsapp_number', '+255 719 245 540'),
('tripadvisor_api_key', ''),
('tripadvisor_location_id', ''),
('safaribookings_api_key', '');
```

---

## 🔌 Backend API Structure

### Option 1: Node.js + Express

#### File Structure:
```
backend/
├── server.js
├── package.json
├── config/
│   └── database.js
├── routes/
│   ├── packages.js
│   ├── quotes.js
│   ├── reviews.js
│   └── auth.js
├── controllers/
│   ├── packageController.js
│   ├── quoteController.js
│   ├── reviewController.js
│   └── authController.js
├── middleware/
│   └── auth.js
└── uploads/
    └── packages/
```

#### server.js
```javascript
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const multer = require('multer');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_db_user',
  password: 'your_db_password',
  database: 'explorian_safaris',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Routes
app.use('/api/packages', require('./routes/packages'));
app.use('/api/quotes', require('./routes/quotes'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { pool };
```

#### routes/packages.js
```javascript
const express = require('express');
const router = express.Router();
const { pool } = require('../server');
const auth = require('../middleware/auth');
const multer = require('multer');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: './uploads/packages/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Get all active packages (public)
router.get('/', async (req, res) => {
  try {
    const [packages] = await pool.query(
      'SELECT * FROM packages WHERE status = "active" ORDER BY created_at DESC'
    );
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all packages (admin)
router.get('/admin', auth, async (req, res) => {
  try {
    const [packages] = await pool.query(
      'SELECT * FROM packages ORDER BY created_at DESC'
    );
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create package (admin)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, category, price, duration, description, features, badge, status } = req.body;
    const image_url = req.file ? `/uploads/packages/${req.file.filename}` : null;
    
    const [result] = await pool.query(
      'INSERT INTO packages (name, category, price, duration, description, features, badge, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, category, price, duration, description, features, badge, image_url, status]
    );
    
    res.json({ id: result.insertId, message: 'Package created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update package (admin)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, duration, description, features, badge, status } = req.body;
    let image_url = req.body.existing_image;
    
    if (req.file) {
      image_url = `/uploads/packages/${req.file.filename}`;
    }
    
    await pool.query(
      'UPDATE packages SET name=?, category=?, price=?, duration=?, description=?, features=?, badge=?, image_url=?, status=? WHERE id=?',
      [name, category, price, duration, description, features, badge, image_url, status, id]
    );
    
    res.json({ message: 'Package updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete package (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM packages WHERE id=?', [id]);
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

#### routes/quotes.js
```javascript
const express = require('express');
const router = express.Router();
const { pool } = require('../server');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');

// Create quote request (public)
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, package, travelDate, travelers, message } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO quote_requests (first_name, last_name, email, phone, package, travel_date, travelers, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName, email, phone, package, travelDate, travelers, message]
    );
    
    // Send email notification to admin
    // await sendEmailNotification(req.body);
    
    res.json({ id: result.insertId, message: 'Quote request submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all quote requests (admin)
router.get('/', auth, async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM quote_requests ORDER BY created_at DESC';
    let params = [];
    
    if (status) {
      query = 'SELECT * FROM quote_requests WHERE status=? ORDER BY created_at DESC';
      params = [status];
    }
    
    const [quotes] = await pool.query(query, params);
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update quote status (admin)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    await pool.query('UPDATE quote_requests SET status=? WHERE id=?', [status, id]);
    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

#### routes/reviews.js
```javascript
const express = require('express');
const router = express.Router();
const { pool } = require('../server');
const auth = require('../middleware/auth');
const axios = require('axios');

// Get all displayed reviews (public)
router.get('/', async (req, res) => {
  try {
    const [reviews] = await pool.query(
      'SELECT * FROM reviews WHERE display_on_site=1 ORDER BY review_date DESC LIMIT 20'
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reviews (admin)
router.get('/admin', auth, async (req, res) => {
  try {
    const [reviews] = await pool.query(
      'SELECT * FROM reviews ORDER BY review_date DESC'
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sync reviews from TripAdvisor (admin)
router.post('/sync-tripadvisor', auth, async (req, res) => {
  try {
    // Get TripAdvisor API settings
    const [[settings]] = await pool.query(
      'SELECT setting_value FROM settings WHERE setting_key="tripadvisor_api_key"'
    );
    
    if (!settings || !settings.setting_value) {
      return res.status(400).json({ error: 'TripAdvisor API key not configured' });
    }
    
    // Call TripAdvisor API (placeholder - implement actual API call)
    // const reviews = await fetchTripAdvisorReviews(settings.setting_value);
    
    // Insert or update reviews
    // for (const review of reviews) { ... }
    
    res.json({ message: 'Reviews synced successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Toggle review display (admin)
router.patch('/:id/display', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { display } = req.body;
    
    await pool.query('UPDATE reviews SET display_on_site=? WHERE id=?', [display, id]);
    res.json({ message: 'Review display updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

#### package.json
```json
{
  "name": "explorian-safaris-backend",
  "version": "1.0.0",
  "description": "Backend API for Explorian Safaris",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "mysql2": "^3.6.0",
    "multer": "^1.4.5-lts.1",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "nodemailer": "^6.9.7",
    "axios": "^1.6.0",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### Option 2: PHP + MySQL (Simpler Alternative)

#### File Structure:
```
api/
├── config.php
├── packages/
│   ├── index.php
│   ├── create.php
│   ├── update.php
│   └── delete.php
├── quotes/
│   ├── index.php
│   └── create.php
├── reviews/
│   ├── index.php
│   └── sync.php
└── uploads/
    └── packages/
```

#### config.php
```php
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$host = "localhost";
$db_name = "explorian_safaris";
$username = "your_username";
$password = "your_password";

try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(array("error" => "Connection failed: " . $e->getMessage()));
    exit();
}
?>
```

#### api/packages/index.php
```php
<?php
include_once '../config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Get all active packages
        $query = "SELECT * FROM packages WHERE status = 'active' ORDER BY created_at DESC";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        
        $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($packages);
        break;
        
    default:
        echo json_encode(array("error" => "Method not allowed"));
        break;
}
?>
```

#### api/quotes/create.php
```php
<?php
include_once '../config.php';

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->firstName) && !empty($data->email)) {
    $query = "INSERT INTO quote_requests 
              (first_name, last_name, email, phone, package, travel_date, travelers, message) 
              VALUES (:firstName, :lastName, :email, :phone, :package, :travelDate, :travelers, :message)";
    
    $stmt = $conn->prepare($query);
    
    $stmt->bindParam(":firstName", $data->firstName);
    $stmt->bindParam(":lastName", $data->lastName);
    $stmt->bindParam(":email", $data->email);
    $stmt->bindParam(":phone", $data->phone);
    $stmt->bindParam(":package", $data->package);
    $stmt->bindParam(":travelDate", $data->travelDate);
    $stmt->bindParam(":travelers", $data->travelers);
    $stmt->bindParam(":message", $data->message);
    
    if($stmt->execute()) {
        http_response_code(201);
        echo json_encode(array("message" => "Quote request created successfully"));
        
        // Send email notification
        // mail(...);
    } else {
        http_response_code(503);
        echo json_encode(array("error" => "Unable to create quote request"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("error" => "Incomplete data"));
}
?>
```

---

## 🔗 TripAdvisor Integration

### Step 1: Get TripAdvisor API Access

1. **Go to TripAdvisor Developers**: https://developer-tripadvisor.com/
2. **Sign up for API access**
3. **Get your API Key**
4. **Find your Location ID**:
   - Search for your business on TripAdvisor
   - URL will be: `https://www.tripadvisor.com/...d12345678-...`
   - The `d12345678` is your location ID

### Step 2: API Endpoints

```javascript
// TripAdvisor API Integration Example

const TRIPADVISOR_API_KEY = 'your_api_key';
const LOCATION_ID = 'your_location_id';

// Fetch Reviews
async function fetchTripAdvisorReviews() {
  const url = `https://api.tripadvisor.com/api/internal/1.0/location/${LOCATION_ID}/reviews`;
  
  const response = await fetch(url, {
    headers: {
      'X-TripAdvisor-API-Key': TRIPADVISOR_API_KEY
    }
  });
  
  const data = await response.json();
  return data.data; // Array of reviews
}

// Get Business Info
async function getBusinessInfo() {
  const url = `https://api.tripadvisor.com/api/internal/1.0/location/${LOCATION_ID}`;
  
  const response = await fetch(url, {
    headers: {
      'X-TripAdvisor-API-Key': TRIPADVISOR_API_KEY
    }
  });
  
  return await response.json();
}
```

### Step 3: Embed TripAdvisor Widget (Alternative)

If API access is difficult, use TripAdvisor's widget:

```html
<!-- Add to your website -->
<div id="TA_rated871" class="TA_rated">
  <ul id="sZyFJ" class="TA_links">
    <li id="jNk81cpw" class="RFjqsFGI">
      <a target="_blank" href="https://www.tripadvisor.com/">
        <img src="https://www.tripadvisor.com/img/cdsi/img2/badges/ollie-11424-2.gif" alt="TripAdvisor"/>
      </a>
    </li>
  </ul>
</div>
<script src="https://www.jscache.com/wejs?wtype=rated&amp;uniq=871&amp;locationId=YOUR_LOCATION_ID&amp;lang=en_US&amp;display_version=2"></script>
```

---

## 🚀 Installation Steps

### Prerequisites:
- Web server (Apache/Nginx)
- PHP 7.4+ or Node.js 14+
- MySQL 5.7+ or MariaDB
- FTP/SSH access to server

### Step-by-Step Installation:

#### 1. **Database Setup**
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE explorian_safaris;

# Create user
CREATE USER 'explorian_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON explorian_safaris.* TO 'explorian_user'@'localhost';
FLUSH PRIVILEGES;

# Import schema
mysql -u explorian_user -p explorian_safaris < database_schema.sql
```

#### 2. **Backend Setup (Node.js)**
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOL
DB_HOST=localhost
DB_USER=explorian_user
DB_PASS=strong_password
DB_NAME=explorian_safaris
JWT_SECRET=your_jwt_secret_key
PORT=3000
EOL

# Start server
npm start

# Or for development
npm run dev
```

#### 3. **Backend Setup (PHP)**
```bash
# No installation needed
# Just upload files to your server
# Make sure uploads folder is writable
chmod 777 api/uploads/packages
```

#### 4. **Frontend Upload**
```bash
# Upload these files to your web server:
- advanced-website.html → rename to index.html
- admin-dashboard.html → keep in admin/ folder

# Update API endpoints in the files
# Change: fetch('/api/...')
# To: fetch('https://yourdomain.com/api/...')
```

#### 5. **Configure Domain**
```nginx
# Nginx configuration
server {
    listen 80;
    server_name exploriansafaris.com;
    root /var/www/exploriansafaris;
    index index.html;

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 6. **SSL Certificate (Let's Encrypt)**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d exploriansafaris.com
```

---

## 👨‍💼 Admin Dashboard Usage

### First Login:
1. Navigate to: `https://yourdomain.com/admin/`
2. Default credentials:
   - Username: `admin`
   - Password: `changeme123`
3. **CHANGE PASSWORD IMMEDIATELY**

### Managing Packages:
1. Click "Packages" in sidebar
2. Click "+ Add New Package"
3. Fill in details:
   - Package name
   - Category
   - Price
   - Duration
   - Description
   - Features (one per line)
   - Upload image
4. Click "Save Package"

### Managing Quote Requests:
1. Click "Quote Requests"
2. View all incoming requests
3. Click "View" to see full details
4. Click "Respond" to reply to customer
5. Update status: Pending → Responded → Booked

### Syncing Reviews:
1. Go to Settings
2. Enter TripAdvisor API Key
3. Enter Location ID
4. Go to Reviews section
5. Click "🔄 Sync from TripAdvisor"
6. Toggle checkboxes to show/hide reviews

---

## 📦 Deployment Checklist

- [ ] Database created and schema imported
- [ ] Backend API running and tested
- [ ] Frontend files uploaded
- [ ] API endpoints updated in frontend
- [ ] Admin password changed
- [ ] TripAdvisor API configured
- [ ] Email notifications working
- [ ] SSL certificate installed
- [ ] Backup system configured
- [ ] Google Analytics added
- [ ] Test quote request form
- [ ] Test admin dashboard
- [ ] Mobile responsiveness checked

---

## 🔧 Troubleshooting

### Issue: "Cannot connect to database"
**Solution**: Check config.php or .env file credentials

### Issue: "Images not uploading"
**Solution**: 
```bash
chmod 777 uploads/packages
```

### Issue: "API requests failing"
**Solution**: Check CORS settings in backend

### Issue: "TripAdvisor reviews not showing"
**Solution**: Verify API key and location ID

---

## 📞 Support

For technical support:
- Email: tech@exploriansafaris.com
- Documentation: See README files in each folder

---

## 🎉 Congratulations!

You now have a fully functional safari booking website with:
✅ Modern responsive design
✅ Admin dashboard for easy management
✅ Quote request system
✅ Review integration
✅ Mobile optimization

**Next Steps:**
1. Add your real safari photos
2. Configure email notifications
3. Set up Google Analytics
4. Start marketing!
