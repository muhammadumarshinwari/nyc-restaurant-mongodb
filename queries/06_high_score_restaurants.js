db.restaurants.find({ "grades.score": { $gt: 85 } }, { borough: 1, cuisine: 1, name: 1, _id: 0 }).sort({ name: 1 }).toArray()
