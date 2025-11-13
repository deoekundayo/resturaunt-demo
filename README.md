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
- Add new users to the system
- Manage user access
- Customer account administration
- User authentication and password management

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
   - Start by opening `sign-in.html` to log in
   - Use User ID (234567, 287654, 215432, 298765, 223456, 276543, 245678, 291234, 267890, 254321) and password to authenticate
   - Or open `admindashbord.html` directly (will require authentication)
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

Then navigate to:
- `http://localhost:8000/sign-in.html` (recommended - login page)
- `http://localhost:8000/admindashbord.html` (direct dashboard access)

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
├── Authentication/
│   ├── sign-in.html            # User login page
│   ├── change-password.html    # Password change page
│   ├── forgot-password.html    # Password reset page
│   └── JS/
│       ├── authentication.js   # Login validation logic
│       ├── change-password.js # Password change logic
│       └── forgot-password.js # Password reset logic
│
├── Styles/
│   ├── table.css               # Table styling
│   ├── food-item-table.css     # Food item table styles
│   ├── form-styles.css         # Form styling (used by all forms)
│   └── edit-id.css             # Edit page styles
│
└── info-saved.html             # Success confirmation page with auto-redirect
```

## 🎨 User Interface

The application features:
- Clean, modern design with intuitive navigation
- Responsive card-based layout
- Key metrics at a glance
- Easy access to CRUD operations
- Consistent styling across all pages
- Unified form layouts across add and edit pages
- Auto-redirect after form submissions (4-second countdown)

## 🔐 Authentication & Security

### User Authentication
- **Sign In Page**: Secure login with User ID and password validation
- **User ID Validation**: Validates against registered users in the system
- **Password Protection**: Secure password-based authentication
- **Session Management**: Authentication status tracked via sessionStorage

### Password Management
- **Change Password**: Users can update their passwords with validation
- **Forgot Password**: Password reset functionality with email-based recovery
- **Password Requirements**:
  - Minimum 6 characters
  - At least 1 number
  - At least 1 special character
- **Password Storage**: Secure password management using browser localStorage

### Default Credentials
- User IDs: 234567, 287654, 215432, 298765, 223456, 276543, 245678, 291234, 267890, 254321 (from registered users table)
- Default passwords: Match the User ID (e.g., 234567 → password: "234567")
- Users can change their passwords after first login

### Navigation
- All Sign In buttons redirect to `sign-in.html`
- All Sign Out buttons redirect to `sign-in.html`
- Consistent authentication UI across all pages

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
- `form-styles.css`: Unified form styling (used by all add/edit forms)
- `add_user.css`: User management styles
- `edit-id.css`: Legacy edit page styles (being phased out)

### JavaScript Organization
- `JS/authentication.js`: User login validation and session management
- `JS/change-password.js`: Password change functionality with validation
- `JS/forgot-password.js`: Password reset and email notification logic

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

## 🔄 Form Submission & Redirects

All forms in the system include automatic redirect functionality:
- After successful form submission, users are redirected to the corresponding list page
- 4-second countdown timer shows before redirect
- Redirect destinations:
  - Food Items → `list_fooditems.html`
  - Cuisines → `list_cuisines.html`
  - Categories → `list_categories.html`
  - Restaurants → `list_restaurants.html`
  - Users → `users.html`
  - Orders → `orders.html`

## 📝 Future Enhancements

- Backend integration for data persistence
- Server-side authentication and session management
- API integration for order processing
- Mobile application
- Advanced analytics and reporting
- Multi-language support
- Payment gateway integration
- Real-time notifications
- Email service integration for password resets

## 📄 License

This project is available for use under your preferred license.

## 📧 Contact

For questions or support, please contact the development team.

---

**Built with ❤️ for efficient restaurant management**

