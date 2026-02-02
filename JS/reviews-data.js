/**
 * Customer reviews data: 195 additional reviews (117×5-star, 78×4-star).
 * With the 5 existing reviews (sum 23), total 200 reviews average 4.6.
 */
(function() {
  var NAMES = [
    'Alex T.', 'Amy W.', 'Ben S.', 'Beth H.', 'Carlos M.', 'Claire D.', 'Dan R.', 'Emma F.',
    'Eric N.', 'Grace L.', 'Henry P.', 'Ivy K.', 'Jack B.', 'Julia V.', 'Kevin J.', 'Laura G.',
    'Mark C.', 'Mia O.', 'Nick Y.', 'Olivia Z.', 'Paul A.', 'Quinn E.', 'Rachel I.', 'Sam U.',
    'Tina X.', 'Tom H.', 'Uma R.', 'Vera S.', 'Will D.', 'Zoe F.', 'Adam L.', 'Bella K.',
    'Chris P.', 'Diana N.', 'Evan Q.', 'Fiona W.', 'Greg T.', 'Hannah J.', 'Ian M.', 'Jenna R.',
    'Kyle B.', 'Leah S.', 'Mike G.', 'Nora C.', 'Owen V.', 'Paula H.', 'Ryan E.', 'Sara D.',
    'Tyler A.', 'Vanessa L.', 'Wendy O.', 'Yuki K.', 'Aaron P.', 'Cindy M.', 'Derek F.',
    'Gina R.', 'Hugo S.', 'Jade T.', 'Liam W.', 'Maya N.', 'Noah B.', 'Rita C.'
  ];
  var TEXTS = [
    'Great food and friendly service. We will be back soon!',
    'The pasta was amazing. Best Italian in town.',
    'Loved the atmosphere and the burger. Five stars.',
    'Service was a bit slow but the food was worth the wait.',
    'Fresh ingredients and generous portions. Highly recommend.',
    'Perfect date night spot. Wine list was excellent.',
    'The salmon was cooked perfectly. Staff was very attentive.',
    'Good value for money. Kids loved the mac and cheese.',
    'Cozy place with delicious comfort food. Will return.',
    'Brunch here is fantastic. The pancakes are incredible.',
    'Clean, tasty, and quick. Exactly what we needed.',
    'Nice variety on the menu. Everything we tried was great.',
    'A bit crowded on Saturday but the pizza made up for it.',
    'Solid burgers and fries. Beer selection is good too.',
    'The dessert menu is to die for. Try the cheesecake.',
    'Family-friendly and the staff remembered us. So nice.',
    'Portions are huge. We took leftovers home and enjoyed them.',
    'Consistently good. This is our go-to spot for dinner.',
    'The tacos were fresh and flavorful. Great margaritas.',
    'Quiet enough to talk. Food came out hot and tasty.',
    'We come here every week. Never had a bad meal.',
    'The soup of the day was delicious. Cozy on a rainy day.',
    'Good sushi and quick service. Will order again.',
    'The steak was cooked exactly as requested. Impressive.',
    'Vegetarian options were creative and satisfying.',
    'Lunch specials are a great deal. Always leave full.',
    'Love the outdoor seating. Food and views both great.',
    'The wings are the best in town. Sauces are perfect.',
    'Had a wonderful anniversary dinner here. So romantic.',
    'Breakfast burrito hit the spot. Coffee was strong and good.',
    'The salad was fresh and the dressing was perfect.',
    'Friendly bartender and great happy hour specials.',
    'The curry had just the right amount of spice. So good.',
    'Clean restaurant and polite staff. Food was excellent.',
    'We tried the special and were not disappointed.',
    'The bread basket alone is worth coming back for.',
    'Great for groups. We had a party of eight and had a blast.',
    'The fish and chips reminded me of London. Authentic.',
    'Quick service without feeling rushed. Food was hot.',
    'The appetizers could be a meal. So much flavor.',
    'Always consistent. You know what you are going to get.',
    'The pho was comforting and full of flavor.',
    'Nice wine pairing with our meal. Server was knowledgeable.',
    'The BBQ ribs fell off the bone. Sauce was perfect.',
    'We had the tasting menu. Every course was a hit.',
    'The pad thai was authentic and delicious.',
    'Good place to bring out-of-town guests. They loved it.',
    'The lobster roll was worth every penny.',
    'Sunday brunch crowd but we got seated quickly.',
    'The risotto was creamy and perfectly seasoned.',
    'Kids ate free and our server was so patient. Thank you.',
    'The gyro was huge and tasty. Tzatziki was fresh.',
    'We ordered takeout and it traveled well. Still hot.',
    'The ramen was rich and satisfying. Great for cold days.',
    'Gluten-free options were clearly marked. Very helpful.',
    'The crab cakes were full of crab. No filler.',
    'Happy hour oysters were a steal. Fresh and briny.',
    'The chicken parm was huge. Could not finish it.',
    'Nice neighborhood spot. Feels like a local secret.',
    'The falafel was crispy outside and soft inside. Perfect.',
    'We shared several small plates. All were delicious.',
    'The pie was homemade and reminded me of my grandma.',
    'Great spot for a business lunch. Quiet and professional.',
    'The nachos were loaded. Enough for three people.',
    'The espresso was perfect. Dessert was divine.',
    'The clam chowder was thick and hearty. Loved it.',
    'The stir fry was fresh and the sauce was not too sweet.',
    'We had the chef special. Creative and delicious.',
    'The Reuben was stacked high and tasted amazing.',
    'The ice cream was homemade. You can tell the difference.',
    'The lamb chops were tender and flavorful.',
    'Good portion sizes. Left full and happy.',
    'The Caesar salad had the right amount of dressing.',
    'The shrimp scampi was garlicky and perfect.',
    'We came for dessert only. The brownie was huge.',
    'The pho broth was deep and complex. So good.',
    'The server recommended the special and she was right.',
    'The calamari was tender, not rubbery. Great appetizer.',
    'The chicken sandwich was juicy and the bun was fresh.',
    'The margarita was strong and the tacos were tasty.',
    'The eggplant parm was a pleasant surprise. So good.',
    'We will definitely be back. Everything was on point.',
    'The soup and sandwich combo hit the spot.',
    'The fried chicken was crispy and not greasy.',
    'Nice presentation on every plate. Tasted as good as it looked.',
    'The veggie burger was one of the best I have had.',
    'The lobster bisque was rich and creamy.',
    'The outdoor patio was lovely. Food was great too.',
    'The mozzarella sticks were gooey and delicious.',
    'The paella had plenty of seafood. Authentic taste.',
    'The cobb salad was fresh and filling.',
    'The bread pudding was warm and decadent.',
    'The server was attentive without being intrusive.',
    'The gumbo had a nice kick. Perfect for a cold night.',
    'The flatbread was thin and crispy. Toppings were fresh.',
    'The hot chocolate was rich. Kids loved it.',
    'The meatballs were tender and the sauce was savory.',
    'The quinoa bowl was healthy and satisfying.',
    'The key lime pie was tangy and sweet. Perfect.',
    'The sliders were perfect for sharing. All three were great.',
    'The trout was light and flaky. Cooked perfectly.',
    'The hummus was smooth and the pita was warm.',
    'The French onion soup had plenty of cheese. So good.',
    'The pulled pork was smoky and tender.',
    'The creme brulee had a perfect sugar crust.',
    'The club sandwich was stacked high. Classic and good.',
    'The miso soup was a great start to the meal.',
    'The tempura was light and crispy. Not oily.',
    'The burrito was massive. Could not finish it.',
    'The lemonade was fresh. Not too sweet.',
    'The biscuits and gravy were Southern perfection.',
    'The poke bowl was colorful and fresh.',
    'The tiramisu was light and not too sweet.',
    'The chili was hearty with a nice spice level.',
    'The avocado toast was Instagram-worthy and tasty.',
    'The shepherd pie was comforting. Great on a cold day.',
    'The caprese was simple and perfect. Fresh basil.',
    'The fish tacos were light and flavorful.',
    'The apple pie was warm with a flaky crust.',
    'The pad see ew had great wok flavor.',
    'The BLT was crispy and the tomatoes were ripe.',
    'The matcha latte was smooth. Pastry was fresh.',
    'The jambalaya was spicy and loaded with meat.',
    'The Greek salad was huge. Feta was generous.',
    'The churros were crispy and the chocolate was rich.',
    'The banh mi was packed with flavor. Great sandwich.',
    'The waffles were fluffy. Syrup was real maple.',
    'The enchiladas were cheesy and satisfying.',
    'The dumplings were juicy. Dipping sauce was perfect.',
    'The croissant was buttery and flaky. Perfect with coffee.',
    'The brisket was tender. BBQ sauce was tangy.',
    'The smoothie was thick and fruity. Refreshing.',
    'The carbonara was creamy and indulgent.',
    'The spring rolls were fresh and the sauce was sweet.',
    'The moussaka was layers of flavor. So good.',
    'The bagel was fresh and the cream cheese was generous.',
    'The cioppino was full of seafood. Broth was rich.',
    'The donuts were fresh. Still warm when we got them.',
    'The paella had a nice socarrat. Authentic.',
    'The poke was fresh. Rice was seasoned well.',
    'The croque madame was rich and delicious.',
    'The bibimbap was colorful and the egg was runny. Perfect.',
    'The lobster tail was buttered and perfect.',
    'The acai bowl was refreshing and not too sweet.',
    'The schnitzel was crispy and the potato salad was good.',
    'The philly cheesesteak was messy and delicious.',
    'The oysters were fresh. Mignonette was perfect.',
    'The cioppino had a nice tomato base. Loads of seafood.',
    'The ramen egg was runny. Broth was deep.',
    'The cuban sandwich was pressed and crispy.',
    'The baklava was sweet and nutty. Perfect end.',
    'The eggs benedict were perfect. Hollandaise was smooth.',
    'The gumbo was thick and full of flavor.',
    'The tartare was fresh and well seasoned.',
    'The gnocchi was pillowy. Sauce was rich.',
    'The bao buns were soft and the filling was tasty.',
    'The crepes were thin and filled with Nutella. Yum.',
    'The cioppino was the best I have had outside San Francisco.',
    'The poke bowl was healthy and filling.',
    'The biscuits were flaky. Gravy was creamy.',
    'The tacos al pastor were spicy and delicious.',
    'The French toast was thick and custardy. Perfect.',
    'The gumbo had andouille and shrimp. So good.',
    'The scallops were seared perfectly. Melt in your mouth.',
    'The bibimbap had a nice crunch from the rice.',
    'The lobster roll had big chunks of lobster. Worth it.',
    'The huevos rancheros were spicy and satisfying.',
    'The croissant was perfect. Butter was evident.',
    'The pho had tender beef and fresh herbs.',
    'The carbonara was classic and well executed.',
    'The tacos were street style. Simple and good.',
    'The eggs were cooked perfectly. Toast was buttery.',
    'The ramen had a rich tonkotsu broth. Amazing.',
    'The burger was juicy. Bun was toasted. Perfect.',
    'The pad thai had the right balance of sweet and sour.',
    'The salmon was moist. Vegetables were crisp.',
    'The pizza had a thin crust and fresh mozzarella.',
    'The curry was aromatic. Rice was fluffy.',
    'The steak frites were classic. Fries were crisp.',
    'The sushi was fresh. Rice was seasoned well.',
    'The clam chowder was creamy. Bacon was a nice touch.',
    'The chicken was juicy. Mashed potatoes were smooth.',
    'The salad was huge. Could have been a meal.',
    'The pasta was al dente. Sauce was homemade.',
    'The sandwich was messy in the best way.',
    'The soup was hot and comforting.',
    'The dessert was the perfect end to the meal.',
    'The coffee was strong. Pastry was fresh.',
    'The service was quick. Food was hot.',
    'The atmosphere was relaxed. We stayed for hours.',
    'The wine list had something for everyone.',
    'The special was creative. We were impressed.',
    'The portion was huge. Took half home.',
    'The seasoning was perfect. Not too salty.',
    'The presentation was beautiful. Tasted even better.',
    'The staff was welcoming. Felt like family.',
    'The menu had great variety. Hard to choose.',
    'The recommendation was spot on. Thank you.',
    'The kitchen was fast. Food was fresh.',
    'The ingredients were top quality. You could tell.',
    'The place was busy but we got a table. Worth the wait.',
    'The chef knows what they are doing. Bravo.',
    'The dining room was clean. Restrooms too.',
    'The parking was easy. Restaurant was even better.',
    'The reservation was honored. No wait. Great experience.',
    'The kids menu had real food. Our picky eater ate everything.',
    'The outdoor seating was lovely. Food matched.',
    'The bartender made a great cocktail. Food was great too.',
    'The bread was warm. Olive oil was good quality.',
    'The water was refilled without asking. Nice touch.',
    'The check came quickly when we asked. No rush before.',
    'The manager stopped by. Classy place.',
    'The music was at a good volume. Could still talk.',
    'The lighting was cozy. Perfect for dinner.',
    'The whole experience was top notch. Will recommend.'
  ];

  function escapeHtml(s) {
    if (s == null) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }

  function buildExtraReviews() {
    var scroll = document.querySelector('.reviews-page .reviews-scroll');
    if (!scroll) return;
    var extra = [];
    for (var i = 0; i < 117; i++) extra.push(5);
    for (var i = 0; i < 78; i++) extra.push(4);
    extra = shuffle(extra);
    for (var i = 0; i < 195; i++) {
      var rating = extra[i];
      var stars = rating === 5 ? '★★★★★' : '★★★★☆';
      var aria = rating === 5 ? '5 stars' : '4 stars';
      var name = NAMES[i % NAMES.length];
      var text = TEXTS[i % TEXTS.length];
      var div = document.createElement('div');
      div.className = 'review-item';
      div.innerHTML =
        '<div class="review-meta">' +
          '<span class="reviewer-name">' + escapeHtml(name) + '</span>' +
          '<span class="review-stars" aria-label="' + aria + '">' + stars + '</span>' +
        '</div>' +
        '<p class="review-text">' + escapeHtml(text) + '</p>';
      scroll.appendChild(div);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildExtraReviews);
  } else {
    buildExtraReviews();
  }
})();
