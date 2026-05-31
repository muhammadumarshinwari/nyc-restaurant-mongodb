db.restaurants.find({ borough: "Manhattan", cuisine: { $not: /^American/i }, grades: { $elemMatch: { grade: "A" } } }, { borough: 1, cuisine: 1, name: 1, _id: 0 }).sort({ name: 1 }).toArray()
