// Utility functions for form handling and data management

// Initialize data storage with existing data
function initializeData() {
  if (!localStorage.getItem('foodItems')) {
    const foodItems = [
      {
        id: 1,
        name: "Pepperoni Pizza",
        description: "A classic favorite topped with rich tomato sauce, melted mozzarella cheese, and generous slices of spicy pepperoni.",
        imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRDyJEalW-IRBh84gsK2fYUAUhWTgBjSK8WyD62a7Q7UgyEdg-yunD5cZNmJn23BGetNNsAnG6AGF4bfPU4Le5VcwkBIUhK5iqZRbdzAUUb&usqp=CAc",
        category: "Pizza",
        cuisine: "Italian",
        available: true,
        vegetarian: false,
        price: "$12.99"
      },
      {
        id: 2,
        name: "Classic Chz. burg.",
        description: "Juicy grilled beef patty layered with melted cheddar cheese, crisp lettuce, fresh tomato, onions, and pickles, all stacked on a toasted brioche bun.",
        imageUrl: "https://images.themodernproper.com/production/posts/2016/ClassicCheeseBurger_9.jpg?w=1200&h=1200&q=60&fm=jpg&fit=crop&dm=1749310239&s=463b18fc3bb51dc5d96e866c848527c4",
        category: "Burger",
        cuisine: "American",
        available: true,
        vegetarian: false,
        price: "$9.99"
      },
      {
        id: 3,
        name: "Macaroni & Cheese",
        description: "Creamy elbow macaroni baked in a rich, velvety cheese sauce and topped with a golden, crispy breadcrumb crust.",
        imageUrl: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F03%2F19%2F238691-Simple-Macaroni-And-Cheese-mfs_006.jpg&w=160&q=60&c=sc&poi=auto&orient=true&h=90",
        category: "Pasta",
        cuisine: "American",
        available: true,
        vegetarian: false,
        price: "$8.99"
      },
      {
        id: 4,
        name: "Classic Hotdog",
        description: "A grilled all-beef frank nestled in a soft, toasted bun, topped with your choice of ketchup, mustard, relish, and onions.",
        imageUrl: "https://images.ctfassets.net/hhv516v5f7sj/6qGAfeOJOREdrdA3cDUrB8/42ed66b48dc251c6b17630846fd78d5e/selling-page-hotdog-C118-group3-1000x1000.png?w=3840&q=75&fm=webp",
        category: "Sandwich",
        cuisine: "American",
        available: false,
        vegetarian: false,
        price: "$6.99"
      }
    ];
    localStorage.setItem('foodItems', JSON.stringify(foodItems));
  }

  if (!localStorage.getItem('categories')) {
    const categories = [
      { id: 1, name: "Pasta", description: "All Pastas", imageUrl: "https://res.cloudinary.com/hz3gmuqw6/image/upload/c_fill,q_auto,w_750/f_auto/types-of-pasta-phpciJX1a", active: true },
      { id: 2, name: "Pizza", description: "All Pizzas", imageUrl: "https://pizarospizza.com/wp-content/uploads/2025/06/pizaros-march22-92-2-scaled-1.webp", active: true },
      { id: 3, name: "Burger", description: "All Burgers", imageUrl: "https://www.mashed.com/img/gallery/culvers-burgers-ranked-worst-to-best/l-intro-1685326274.jpg", active: true },
      { id: 4, name: "Milkshake", description: "All Milkshakes", imageUrl: "https://www.gelq.it/modules/ybc_blog/views/img/post/MS_POST.jpg", active: false }
    ];
    localStorage.setItem('categories', JSON.stringify(categories));
  }

  if (!localStorage.getItem('cuisines')) {
    const cuisines = [
      { id: 1, name: "Italian", description: "All Italian", imageUrl: "https://static.wixstatic.com/media/2cbff6_ac782b0eaff94ec0881f0299fdb76ab6~mv2.jpg/v1/fill/w_528,h_410,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2cbff6_ac782b0eaff94ec0881f0299fdb76ab6~mv2.jpg", active: true },
      { id: 2, name: "American", description: "All American", imageUrl: "https://res.cloudinary.com/hz3gmuqw6/image/upload/c_fill,f_auto,q_60,w_750/v1/classpop/679a768f61781", active: true },
      { id: 3, name: "Nigerian", description: "All Nigerian", imageUrl: "https://blog.remitly.com/wp-content/uploads/2022/09/different-Nigerian-dishes.jpeg", active: false },
      { id: 4, name: "Chinese", description: "All Chinese", imageUrl: "https://hips.hearstapps.com/hmg-prod/images/chinese-food-68602c98ca7ab.jpg", active: false }
    ];
    localStorage.setItem('cuisines', JSON.stringify(cuisines));
  }

  if (!localStorage.getItem('restaurants')) {
    const restaurants = [
      { id: 1, name: "Food Palace", address: "4727 East Cider street Charlotte, NC", imageUrl: "https://northwoodoffice-assets.imgix.net/goBallantyne/images/heroes/NORTHITALIA156-2.jpg", phone: "704-858-2285" },
      { id: 2, name: "Gourmet Central", address: "2863 Baylor street Greensboro, NC", imageUrl: "https://commonmarketrestaurants.com/wp-content/uploads/2024/03/BALLAST-13.jpg", phone: "336-824-8482" },
      { id: 3, name: "The Grill", address: "2737 North Stockton boulevard Atlanta, GA", imageUrl: "https://assets.bonappetit.com/photos/57d6d72babffea600db60d74/master/pass/tbd-restaurant-grillworks.jpg", phone: "404-295-9869" },
      { id: 4, name: "Taste Hut", address: "8172 Driver road Charleston, SC", imageUrl: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_760,q_65,w_640,x_4800,y_3225/v1/clients/chandler-redesign/Ginger_Monkey_127_HDR_no_logo_405eedca-205a-48f2-94a3-a2abe902dca5.jpg", phone: "843-237-5297" }
    ];
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }

  if (!localStorage.getItem('orders')) {
    const orders = [
      { id: 1, orderId: "ORD001", content: "Burgers", date: "2020-01-12", status: "Delivered", quantity: 100, userId: "298765" },
      { id: 2, orderId: "ORD002", content: "Pizza", date: "2020-02-04", status: "Delivered", quantity: 300, userId: "287654" },
      { id: 3, orderId: "ORD003", content: "Pasta", date: "2020-03-07", status: "Delivered", quantity: 200, userId: "298765" },
      { id: 4, orderId: "ORD004", content: "Burgers", date: "2020-04-04", status: "Delivered", quantity: 200, userId: "234567" },
      { id: 5, orderId: "ORD005", content: "Pizza", date: "2020-06-21", status: "Delivered", quantity: 500, userId: "234567" },
      { id: 6, orderId: "ORD006", content: "Pasta", date: "2020-07-05", status: "Delivered", quantity: 500, userId: "276543" }
    ];
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  if (!localStorage.getItem('users')) {
    const users = [];
    localStorage.setItem('users', JSON.stringify(users));
  }
}

// Format phone number as user types
function formatPhoneNumber(input) {
  input.addEventListener("input", function(e) {
    let x = e.target.value.replace(/\D/g, "");
    if (x.length > 0) {
      x = "(" + x;
    }
    if (x.length > 4) {
      x = x.slice(0, 4) + ")-" + x.slice(4);
    }
    if (x.length > 9) {
      x = x.slice(0, 9) + "-" + x.slice(9);
    }
    if (x.length > 14) {
      x = x.slice(0, 14);
    }
    e.target.value = x;
  });
}

// Show success message and redirect
function showSuccessMessage(message, redirectUrl, delay = 2000) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;

  // Create message box
  const messageBox = document.createElement('div');
  messageBox.style.cssText = `
    background: white;
    padding: 40px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
  `;

  const checkmark = document.createElement('div');
  checkmark.innerHTML = '✓';
  checkmark.style.cssText = `
    font-size: 60px;
    color: #4CAF50;
    margin-bottom: 20px;
  `;

  const messageText = document.createElement('h2');
  messageText.textContent = message || 'Your information has been successfully saved';
  messageText.style.cssText = `
    margin: 0 0 20px 0;
    color: #333;
    font-size: 24px;
  `;

  const redirectText = document.createElement('p');
  redirectText.textContent = `Redirecting in ${delay / 1000} seconds...`;
  redirectText.style.cssText = `
    color: #666;
    margin: 0;
  `;

  messageBox.appendChild(checkmark);
  messageBox.appendChild(messageText);
  messageBox.appendChild(redirectText);
  overlay.appendChild(messageBox);
  document.body.appendChild(overlay);

  // Countdown
  let countdown = delay / 1000;
  const countdownInterval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      redirectText.textContent = `Redirecting in ${countdown} seconds...`;
    } else {
      clearInterval(countdownInterval);
    }
  }, 1000);

  // Redirect after delay
  setTimeout(() => {
    document.body.removeChild(overlay);
    window.location.href = redirectUrl;
  }, delay);
}

// Get URL parameter
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Initialize data on page load
if (typeof window !== 'undefined') {
  initializeData();
}

