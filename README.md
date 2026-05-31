# NYC Restaurant Queries — MongoDB

Exploring a collection of NYC restaurant inspection records using MongoDB. The dataset has documents with nested arrays (inspection grades and scores), address sub-documents, and a mix of boroughs and cuisine types — good for practicing document-model querying.

I used `mongosh` to run all queries against a live MongoDB instance.

---

## What I worked through

Starting simple and building up:

- Basic `find()` with projection to control which fields come back
- Filtering by borough, cuisine type, and nested array values (`grades.score`)
- `$elemMatch` to match conditions within the same array element (not just across the array)
- Regex patterns for partial name matching — starts with, ends with, case-insensitive
- `$or`, `$nor`, `$in`, `$nin` for combining and excluding conditions
- Sorting and limiting results

A few things that came up: MongoDB's default behavior of including `_id` in every result, how `$gt` on an array field behaves differently than `$elemMatch`, and combining `$nor` with `$or` for the final query.

---

## Queries

All queries are in the `queries/` folder and can be run in `mongosh`.

| File | What it does |
|---|---|
| `01_all_documents.js` | Fetch everything |
| `02_cuisine_name_borough.js` | Project specific fields |
| `03_exclude_id.js` | Suppress `_id` from output |
| `04_queens_only.js` | Filter by borough |
| `05_top10_queens_alphabetical.js` | Sort and limit |
| `06_high_score_restaurants.js` | Filter on nested array field |
| `07_score_range_85_to_100.js` | `$elemMatch` for range within one grade |
| `08_manhattan_non_american_grade_a.js` | Combine negation, regex, and array filter |
| `09_name_starts_with_wil.js` | Regex on name field |
| `10_name_ends_with_ces.js` | Regex end-of-string match |
| `11_brooklyn_soul_food_or_chinese.js` | `$or` on cuisine |
| `12_multi_borough.js` | `$in` across multiple values |
| `13_exclude_boroughs.js` | `$nin` exclusion |
| `14_advanced_filter.js` | `$nor` combined with `$or` |

---

## Running the queries

Connect to any MongoDB instance with a `restaurants` collection:

```bash
mongosh "mongodb://<host>:<port>/<database>" \
  --username <user> \
  --authenticationDatabase admin
```

Then load a query file:

```bash
mongosh <connection-string> --file queries/06_high_score_restaurants.js
```

---

## Dataset structure

Each document looks roughly like this:

```json
{
  "address": { "building": "...", "street": "...", "zipcode": "..." },
  "borough": "Manhattan",
  "cuisine": "Italian",
  "grades": [
    { "date": "...", "grade": "A", "score": 12 }
  ],
  "name": "Some Restaurant",
  "restaurant_id": "40356068"
}
```
