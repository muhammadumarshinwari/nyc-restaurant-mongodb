db.restaurants.find({ borough: { $in: ["Brooklyn", "Queens", "Manhattan", "Bronx"] } }, { borough: 1, cuisine: 1, name: 1, restaurant_id: 1, _id: 0 }).toArray()
