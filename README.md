# ChefChain - Restaurant Management System

A comprehensive web-based restaurant management platform designed to streamline operations for restaurants, food items, orders, and customer management.

## 📋 Overview

ChefChain is an admin dashboard system that provides a centralized interface for managing multiple aspects of restaurant operations including menu items, cuisines, categories, orders, and user accounts.

## ✨ Features

### Admin Dashboard
- Real-time insights and key metrics:
  - Total orders (30-day tracking)
  - Average order value
  - Active menu items monitoring
  - Customer satisfaction ratings
- Centralized navigation to all management modules

### Food Items Management
- Add, view, edit, and manage food items
- Set pricing and descriptions
- Track availability and stock status
- Link items to cuisines and categories

### Cuisines Management
- Organize items by culinary traditions (Italian, Chinese, American, Nigerian, etc.)
- Create and edit cuisine types
- Improve menu discovery and navigation

### Categories Management
- Group items by type (Pizza, Pasta, Burgers, Milkshakes, etc.)
- Easy browsing and filtering
- Category-based menu organization

### Restaurants Management
- Maintain restaurant information
- Update contact details and addresses
- Manage restaurant images
- Track multiple restaurant locations

### Orders Management
- View and track all incoming orders
- Monitor order statuses
- Handle order requests
- Individual order detail pages (order001 - order006)

### User Management
- View registered customers
- Manage user access
- Customer account administration

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Web server (optional, for local development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resturaunt-demo
```

2. Open the project:
   - Simply open `admindashbord.html` in your web browser to access the admin dashboard
   - Or serve the directory using a local web server

### Using a Local Server (Optional)

**Python 3:**
```bash
python -m http.server 8000
```

**Node.js (using http-server):**
```bash
npx http-server
```

Then navigate to `http://localhost:8000/admindashbord.html`

## 📁 Project Structure

```
resturaunt-demo/
├── admindashbord.html          # Main admin dashboard
├── admin.css                   # Dashboard styling
├── chefchain-image.png         # Brand logo
│
├── Food Items/
│   ├── add_fooditem.html       # Add new food items
│   ├── list_fooditems.html     # View all food items
│   └── *-edit_f.item.html      # Edit individual items
│
├── Cuisines/
│   ├── add_cuisine.html        # Add new cuisines
│   ├── list_cuisines.html      # View all cuisines
│   └── *-edit_cuisine.html     # Edit individual cuisines
│
├── Categories/
│   ├── add_category.html       # Add new categories
│   ├── list_categories.html    # View all categories
│   └── *-edit_cat.html         # Edit individual categories
│
├── Restaurants/
│   ├── add_restaurant.html     # Add new restaurants
│   ├── list_restaurants.html   # View all restaurants
│   └── *-edit.p.html           # Edit individual restaurants
│
├── Orders/
│   ├── orders.html             # View all orders
│   ├── order-request.html      # Request new order
│   └── order00*.html           # Individual order pages
│
├── Users/
│   ├── users.html              # View registered users
│   ├── add_user.html           # Add new user
│   └── add_user.css            # User form styling
│
├── Styles/
│   ├── table.css               # Table styling
│   ├── food-item-table.css     # Food item table styles
│   ├── form-styles.css         # Form styling
│   └── edit-id.css             # Edit page styles
│
└── info-saved.html             # Success confirmation page
```

## 🎨 User Interface

The application features:
- Clean, modern design with intuitive navigation
- Responsive card-based layout
- Key metrics at a glance
- Easy access to CRUD operations
- Consistent styling across all pages

## 🔐 Authentication

The dashboard includes Sign In/Sign Out buttons for user authentication (implementation pending).

## 📊 Dashboard Metrics

The main dashboard provides insights on:
- **Total Orders**: 30-day order volume with month-over-month comparison
- **Average Order Value**: Revenue metrics based on recent orders
- **Active Menu Items**: Track available items and stock status
- **Customer Satisfaction**: Rating based on recent customer reviews

## 🛠️ Technologies & Frameworks

### Core Technologies
- **HTML5**: Semantic markup for all pages
- **CSS3**: Custom styling with modern CSS features
- **Vanilla JavaScript (ES6+)**: All functionality implemented without frameworks

### Design Approach
- **No Framework Dependencies**: Built entirely with vanilla web technologies
- **Custom CSS**: Modular CSS files for different components
- **Lightweight**: No external dependencies for fast loading times

### CSS Organization
- `admin.css`: Dashboard-specific styles
- `table.css`: General table styling
- `food-item-table.css`: Food item table styles
- `form-styles.css`: Form elements
- `add_user.css`: User management styles
- `edit-id.css`: Edit page styles

## 🛠️ Development

### File Naming Conventions
- List pages: `list_*.html`
- Add pages: `add_*.html`
- Edit pages: `*-edit*.html`
- Order pages: `order*.html`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📝 Future Enhancements

- Backend integration for data persistence
- Real authentication system
- API integration for order processing
- Mobile application
- Advanced analytics and reporting
- Multi-language support
- Payment gateway integration
- Real-time notifications

## 📄 License

This project is available for use under your preferred license.

## 📧 Contact

For questions or support, please contact the development team.

---

**Built with ❤️ for efficient restaurant management**

