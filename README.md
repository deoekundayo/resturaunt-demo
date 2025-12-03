# ChefChain - Restaurant Management System

A comprehensive web-based restaurant management platform designed to streamline operations for restaurants, food items, orders, and customer management. Built with vanilla JavaScript and modern web technologies.

## 📋 Overview

ChefChain is an admin dashboard system that provides a centralized interface for managing multiple aspects of restaurant operations including menu items, cuisines, categories, orders, and user accounts. The system features a dynamic JavaScript-based form system that eliminates the need for multiple HTML pages by using URL parameters and client-side data management.

## ✨ Features

### Admin Dashboard
- Real-time insights and key metrics:
  - Total orders (30-day tracking)
  - Average order value
  - Active menu items monitoring
  - Customer satisfaction ratings
- Centralized navigation to all management modules

### Dynamic Form System
- **Unified Forms**: Single form pages handle both add and edit operations
- **URL-Based Mode Detection**: Use `?id=1` parameter for edit mode, no parameter for add mode
- **JavaScript Handlers**: All form logic managed client-side with localStorage persistence
- **Success Modals**: Beautiful modal popups replace page redirects for better UX
- **Data Management**: Automatic data initialization and persistence
- **Phone Formatting**: Automatic phone number formatting for restaurant and user forms

### Food Items Management
- Add, view, edit, and manage food items via `form_fooditem.html`
- Set pricing, descriptions, and availability
- Link items to cuisines and categories
- Track vegetarian options and availability status
- Dynamic category and cuisine dropdowns

### Cuisines Management
- Organize items by culinary traditions (Italian, Chinese, American, Nigerian, etc.)
- Create and edit cuisine types via `form_cuisine.html`
- Active/inactive status management
- Improve menu discovery and navigation

### Categories Management
- Group items by type (Pizza, Pasta, Burgers, Milkshakes, etc.)
- Create and edit categories via `form_category.html`
- Easy browsing and filtering
- Category-based menu organization
- Active status tracking

### Restaurants Management
- Maintain restaurant information via `form_restaurant.html`
- Update contact details and addresses
- Manage restaurant images
- Track multiple restaurant locations
- Automatic phone number formatting

### Orders Management
- View and track all incoming orders
- Create and edit orders via `form_order.html`
- Monitor order statuses (Delivered, Pending Delivery, Not Delivered)
- Handle order requests with date validation
- Quantity tracking

### User Management
- View registered customers
- Add new users via `form_user.html`
- Manage user access
- Customer account administration
- Automatic phone number formatting

### Authentication & Security
- Secure login system with session management
- Password reset functionality with email templates
- Reset token system with 24-hour expiration
- Password change with validation
- Modal-based forgot password flow

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Web server (recommended for localStorage to work properly)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd restaurant-demo
```

2. **Important**: Serve the project using a local web server (localStorage requires HTTP/HTTPS protocol)

### Using a Local Server (Required)

**Python 3:**
```bash
python -m http.server 8000
```

**Node.js (using http-server):**
```bash
npx http-server
```

**PHP:**
```bash
php -S localhost:8000
```

Then navigate to:
- `http://localhost:8000/sign-in.html` (recommended - login page)
- `http://localhost:8000/admindashbord.html` (direct dashboard access)

### First-Time Setup

1. Open `sign-in.html` in your browser
2. Use default credentials:
   - **User IDs**: 234567, 287654, 215432, 298765, 223456, 276543, 245678, 291234, 267890, 254321
   - **Default Password**: Same as User ID (e.g., User ID "234567" → Password "234567")
3. Data is automatically initialized in localStorage on first load
4. You can change passwords after logging in

## 📁 Project Structure

```
resturaunt-demo/
├── admindashbord.html          # Main admin dashboard
├── admin.css                   # Dashboard styling
├── chefchain-image.png         # Brand logo
│
├── Food Items/
│   ├── form_fooditem.html      # Dynamic add/edit form (replaces add_* and *-edit_*)
│   └── list_fooditems.html     # View all food items
│
├── Cuisines/
│   ├── form_cuisine.html       # Dynamic add/edit form
│   └── list_cuisines.html      # View all cuisines
│
├── Categories/
│   ├── form_category.html      # Dynamic add/edit form
│   └── list_categories.html    # View all categories
│
├── Restaurants/
│   ├── form_restaurant.html    # Dynamic add/edit form
│   └── list_restaurants.html   # View all restaurants
│
├── Orders/
│   ├── form_order.html         # Dynamic add/edit form (replaces order-request and order00*)
│   └── orders.html             # View all orders
│
├── Users/
│   ├── form_user.html          # Dynamic add/edit form
│   ├── users.html              # View registered users
│   └── add_user.css            # User form styling
│
├── Authentication/
│   ├── sign-in.html            # User login page
│   ├── change-password.html    # Password change page
│   └── JS/
│       ├── authentication.js        # Login validation logic
│       ├── change-password.js       # Password change logic with reset token verification
│       ├── forgot-password.js      # Legacy password reset (deprecated)
│       ├── forgot-password-modal.js # Modal-based password reset with token generation
│       ├── email-templates.js      # Email template generators for password resets
│       ├── success-message.js      # Success message modal system
│       ├── utils.js                # Utility functions (data init, phone formatting)
│       └── form-handlers.js         # Dynamic form handlers for all entities
│
├── Styles/
│   ├── table.css               # Table styling
│   ├── food-item-table.css     # Food item table styles
│   ├── form-styles.css         # Form styling (used by all forms)
│   └── edit-id.css             # Edit page styles
│
└── (Legacy files removed - replaced with dynamic JavaScript forms)
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
- **Modal-Based Forgot Password**: No separate page needed - opens as modal overlay

### Password Management
- **Change Password** (`change-password.html`):
  - Users can update their passwords with validation
  - Accessible via direct link or password reset email
  - Validates reset tokens (24-hour expiration)
  - Requires current password verification
  - Horizontal form layout with labels on left, inputs on right
  - Success modal on password change
- **Forgot Password** (Modal):
  - Click "Forgot Password?" link on sign-in page
  - Modal opens with password reset form
  - Generates secure reset tokens
  - Sends email with generic password and reset link
  - Email templates include both HTML and plain text versions
  - Centered modal with no horizontal scrolling
- **Password Requirements**:
  - Minimum 6 characters
  - At least 1 number
  - At least 1 special character
- **Password Storage**: Secure password management using browser localStorage
- **Reset Token System**: 
  - Secure token generation with 24-hour expiration
  - Tokens stored in localStorage with expiration timestamps
  - Automatic validation on password change page

### Email System
- **Password Reset Emails**: Professional HTML email templates
  - Includes generic password for immediate access
  - Contains secure reset link with token
  - 24-hour expiration notice
  - Security warnings and instructions
  - Both HTML and plain text versions generated
  - Ready for backend email service integration

### Default Credentials
- **User IDs**: 234567, 287654, 215432, 298765, 223456, 276543, 245678, 291234, 267890, 254321
- **Default Passwords**: Match the User ID (e.g., User ID "234567" → Password "234567")
- **Generic Reset Password**: `Reset@123` (sent when password is reset)
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
- **CSS3**: Custom styling with modern CSS features including flexbox and animations
- **Vanilla JavaScript (ES6+)**: All functionality implemented without frameworks
- **localStorage API**: Client-side data persistence
- **URL Parameters**: Dynamic form mode detection

### Design Approach
- **No Framework Dependencies**: Built entirely with vanilla web technologies
- **Custom CSS**: Modular CSS files for different components
- **Lightweight**: No external dependencies for fast loading times
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Responsive Design**: Mobile-friendly layouts with media queries

### CSS Organization
- `admin.css`: Dashboard-specific styles
- `table.css`: General table styling
- `food-item-table.css`: Food item table styles
- `form-styles.css`: Unified form styling (used by all dynamic forms)
- `add_user.css`: User management styles
- `edit-id.css`: Order form styles

### JavaScript Architecture
- **Modular Design**: Separate files for different functionalities
- **Utility Functions**: Shared utilities in `utils.js`
- **Form Handlers**: Entity-specific handlers in `form-handlers.js`
- **Event-Driven**: Uses event listeners for form submissions
- **Data Management**: Centralized data initialization and storage

### JavaScript Organization
- `JS/authentication.js`: User login validation and session management
- `JS/change-password.js`: Password change functionality with validation and reset token verification
- `JS/forgot-password.js`: Legacy password reset logic (deprecated - use forgot-password-modal.js)
- `JS/forgot-password-modal.js`: Modal-based password reset functionality with token generation
- `JS/form-handlers.js`: Dynamic form handlers for all entity types (food items, categories, cuisines, restaurants, users, orders)
- `JS/utils.js`: Utility functions including data initialization, phone number formatting, and success message display
- `JS/success-message.js`: Success message modal system (replaces info-saved.html)
- `JS/email-templates.js`: Email template generators for password reset emails (HTML and plain text)

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

### Dynamic Form System
All forms now use a unified JavaScript-based system:
- **Single form pages** handle both add and edit modes (e.g., `form_fooditem.html`)
- **URL parameters** determine mode: `?id=1` for edit, no parameter for add
- **JavaScript handlers** manage form logic, validation, and data persistence
- **Success messages** displayed via modal popups (replaces `info-saved.html`)
- **Data storage** uses localStorage (ready for backend API integration)

### Form Pages
- `form_fooditem.html` - Food items (add/edit)
- `form_category.html` - Categories (add/edit)
- `form_cuisine.html` - Cuisines (add/edit)
- `form_restaurant.html` - Restaurants (add/edit)
- `form_user.html` - Users (add/edit)
- `form_order.html` - Orders (add/edit)

### Redirect Behavior
After successful form submission:
- Success message modal appears with checkmark
- 2-second countdown timer before redirect
- Automatic redirect to corresponding list page:
  - Food Items → `list_fooditems.html`
  - Cuisines → `list_cuisines.html`
  - Categories → `list_categories.html`
  - Restaurants → `list_restaurants.html`
  - Users → `users.html`
  - Orders → `orders.html`

## 📝 Recent Updates & Improvements

### Major Refactoring (Latest Version)
- ✅ **Dynamic Form System**: Replaced 30+ individual HTML form pages with 6 dynamic JavaScript forms
- ✅ **Success Message Modals**: Replaced `info-saved.html` with JavaScript-based modal popups
- ✅ **Modal-Based Forgot Password**: Converted `forgot-password.html` to JavaScript modal
- ✅ **Email Template System**: Created professional HTML email templates for password resets
- ✅ **Reset Token System**: Implemented secure token generation with expiration
- ✅ **Unified Button Styling**: Consistent button format across all forms
- ✅ **Data Initialization**: Automatic localStorage initialization with existing data
- ✅ **Phone Number Formatting**: Automatic formatting for phone inputs
- ✅ **Improved UX**: Faster form interactions without page reloads

### Code Quality Improvements
- ✅ **Reduced File Count**: From 40+ HTML files to 6 dynamic form pages
- ✅ **Better Maintainability**: Single source of truth for form logic
- ✅ **Consistent Styling**: Unified form appearance across all entities
- ✅ **Enhanced Documentation**: Comprehensive README with all features

## 📝 Future Enhancements

- Backend integration for data persistence (API endpoints)
- Server-side authentication and session management
- Real email service integration (SendGrid, AWS SES, Mailgun)
- API integration for order processing
- Mobile application
- Advanced analytics and reporting
- Multi-language support
- Payment gateway integration
- Real-time notifications
- Database integration (replace localStorage)
- Image upload functionality
- Search and filtering capabilities
- Export/import functionality

## 🔧 Development Notes

### Form Usage Examples

**Adding a new food item:**
- Navigate to `form_fooditem.html` (no parameters)
- Fill in the form and submit
- Success modal appears, then redirects to `list_fooditems.html`

**Editing an existing food item:**
- From `list_fooditems.html`, click "Edit" on any item
- Opens `form_fooditem.html?id=1` (where 1 is the item ID)
- Form auto-populates with existing data
- Submit to save changes

**Password Reset Flow:**
1. User clicks "Forgot Password?" on sign-in page
2. Modal opens, user enters User ID
3. System generates reset token and link
4. Email sent with generic password and reset link
5. User clicks link → `change-password.html?token=...&userId=...`
6. Token validated, form pre-filled with User ID
7. User sets new password
8. Success modal, redirect to sign-in

### Data Storage

Currently uses `localStorage` for client-side persistence:
- `foodItems`: Array of food item objects
- `categories`: Array of category objects
- `cuisines`: Array of cuisine objects
- `restaurants`: Array of restaurant objects
- `orders`: Array of order objects
- `users`: Array of user objects
- `userCredentials`: Object mapping User IDs to passwords
- `passwordResetTokens`: Object mapping User IDs to reset tokens with expiration

### Browser Compatibility

- **Chrome/Edge**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support
- **Opera**: Full support
- **IE11**: Not supported (uses ES6+ features)

## 📄 License

This project is available for use under your preferred license.

## 📧 Contact

For questions or support, please contact the development team.

---

**Built with ❤️ for efficient restaurant management**

**Version**: 2.0 - Dynamic JavaScript Forms Update

