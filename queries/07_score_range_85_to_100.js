db.restaurants.find({ grades: { $elemMatch: { score: { $gt: 85, $lt: 100 } } } }, { borough: 1, cuisine: 1, name: 1, _id: 0 }).sort({ name: 1 }).toArray()
