db.restaurants.find({ borough: "Queens" }, { borough: 1, cuisine: 1, name: 1, _id: 0 }).toArray()
