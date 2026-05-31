db.restaurants.find({ name: /ces$/ }, { borough: 1, cuisine: 1, name: 1, restaurant_id: 1, _id: 0 }).sort({ name: -1 }).toArray()
