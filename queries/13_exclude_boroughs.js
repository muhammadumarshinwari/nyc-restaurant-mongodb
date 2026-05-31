db.restaurants.find({ borough: { $nin: ["Brooklyn", "Queens", "Manhattan", "Bronx"] } }, { name: 1, _id: 0 }).sort({ name: 1 }).toArray()
