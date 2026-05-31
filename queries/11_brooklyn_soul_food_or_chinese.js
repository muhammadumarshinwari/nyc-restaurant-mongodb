db.restaurants.find({ borough: "Brooklyn", $or: [{ cuisine: /Soul Food/i }, { cuisine: /^Chinese/i }] }, { borough: 1, cuisine: 1, name: 1, restaurant_id: 1, _id: 0 }).toArray()
