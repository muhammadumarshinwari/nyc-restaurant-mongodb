# NYC Restaurant Queries — MongoDB

Querying a collection of NYC restaurant inspection records using MongoDB and `mongosh`. Each document has nested inspection grades (with scores and letter grades), address info, borough, and cuisine type.

The main things I was working with: projection, filtering on nested arrays, regex name matching, and combining operators like `$or`, `$nor`, `$in`, and `$elemMatch`.

One thing that tripped me up early — using `$gt` on an array field doesn't guarantee both conditions apply to the *same* grade entry. `$elemMatch` is what you need for that.

---

## Queries

| File | What it does |
|---|---|
| `01_all_documents.js` | Fetch all documents |
| `02_cuisine_name_borough.js` | Project only cuisine, name, borough |
| `03_exclude_id.js` | Same but suppress `_id` |
| `04_queens_only.js` | Filter by borough |
| `05_top10_queens_alphabetical.js` | Sort and limit |
| `06_high_score_restaurants.js` | Any grade score above 85 |
| `07_score_range_85_to_100.js` | Score between 85–100 in the same grade entry |
| `08_manhattan_non_american_grade_a.js` | Manhattan, not American cuisine, grade A |
| `09_name_starts_with_wil.js` | Regex on name |
| `10_name_ends_with_ces.js` | Regex end-of-string match |
| `11_brooklyn_soul_food_or_chinese.js` | `$or` on cuisine type |
| `12_multi_borough.js` | `$in` across boroughs |
| `13_exclude_boroughs.js` | `$nin` exclusion |
| `14_advanced_filter.js` | `$nor` + `$or` combined |

---

## Running

The dataset is MongoDB's [sample_restaurants](https://www.mongodb.com/docs/atlas/sample-data/sample-restaurants/) collection, which you can load for free via MongoDB Atlas.

Once you have a cluster with the sample data loaded:

```bash
mongosh "mongodb+srv://<your-cluster>.mongodb.net/sample_restaurants" \
  --username <user> \
  --file queries/07_score_range_85_to_100.js
```
