# NYC Restaurant Queries — MongoDB

This project explores a collection of NYC restaurant health inspection records using MongoDB. The dataset is MongoDB's official sample restaurants collection, which contains restaurants across all five NYC boroughs with information on cuisine type, location, and health inspection history.

Each restaurant document stores its inspection history as a nested array of grades. Each grade entry has a date, a letter grade (A, B, or C), and a numerical score. Lower scores are better — the score reflects the number of violations found during the inspection. A score above 85 is pretty bad. The nested structure of the data is what makes this interesting to query, because you need different operators depending on whether you want to match conditions across the array or within a single inspection entry.

---

## The Dataset

Each document looks like this:

```json
{
  "name": "Sal's Deli",
  "borough": "Queens",
  "cuisine": "Delicatessen",
  "address": {
    "building": "129-08",
    "street": "20 Avenue",
    "zipcode": "11356"
  },
  "grades": [
    { "date": "2014-08-16", "grade": "A", "score": 12 },
    { "date": "2013-08-27", "grade": "A", "score": 9 },
    { "date": "2012-09-20", "grade": "A", "score": 7 }
  ],
  "restaurant_id": "40361618"
}
```

The grades array is the most interesting field. A restaurant can have many inspection entries over the years, and querying against it correctly requires understanding how MongoDB handles array matching.

---

## Key Queries and What They Show

**Restaurants with a score above 85**

Only 4 restaurants in the dataset ever received a score above 85, and all of them are in Manhattan. A score that high means inspectors found a significant number of violations. The query uses a simple `$gt` on the grades array.

```
Manhattan  Pizza/Italian  Bella Napoli
Manhattan  Indian         Gandhi
Manhattan  American       Murals On 54/Randolph's
Manhattan  American       West 79th Street Boat Basin Cafe
```

**Why $elemMatch matters for score ranges**

When you want a score between 85 and 100, you cannot just use `$gt: 85` and `$lt: 100` at the top level. MongoDB would match any document where one grade entry has a score above 85 and a different grade entry has a score below 100. Those conditions do not have to come from the same inspection. Using `$elemMatch` forces both conditions to apply to the same grade entry. With `$elemMatch`, only 3 restaurants come back instead of 4, because one of them had the high score in one inspection and the sub-100 score in a different inspection.

**Top Queens restaurants alphabetically**

```
Borough   Cuisine       Name
-------   -------       ----
Queens    Delicatessen  101 Deli
Queens    American      111 Restaurant
Queens    Mexican       5 Burro Cafe
Queens    American      7 Stars
Queens    American      A & B Deli & Catering
Queens    Italian       Acquista Trattoria
Queens    American      Adria Hotel
Queens    American      Adrian & Rocky's Caterers
Queens    African       Africana Restaurant
Queens    French        Air France Lounge
```

**Non-American Manhattan restaurants with a grade A**

This query filters by borough, excludes American cuisine using a regex negation, and requires at least one grade A inspection. It returns hundreds of restaurants and is a good example of combining three separate conditions in a single find.

```
Manhattan  Pizza          10th Avenue Pizza & Cafe
Manhattan  Japanese       15 East Restaurant
Manhattan  Italian        44 SW Ristorante & Bar
Manhattan  Seafood        A Salt & Battery
...
```

**Restaurants whose name ends in "ces"**

A regex end-of-string match returns restaurants like Pieces, Alices, and Re: Sources, sorted in reverse alphabetical order.

**Brooklyn restaurants serving Soul Food or Chinese**

Using `$or` on the cuisine field with case-insensitive regex returns Chinese restaurants in Brooklyn (Soul Food has very few entries in this dataset). The results include places like Golden Pavillion, May May Kitchen, Yen Yen Restaurant, and Kum Kau Kitchen.

**Restaurants outside the four main boroughs**

Using `$nin` to exclude Brooklyn, Queens, Manhattan, and Bronx returns the small set of restaurants listed under Staten Island and a handful of edge-case entries. Sorted alphabetically it starts with A & S Pizzeria, African Market, and African Terrace.

---

## Queries

| File | What it does |
|---|---|
| `01_all_documents.js` | Fetch everything in the collection |
| `02_cuisine_name_borough.js` | Return only cuisine, name, and borough fields |
| `03_exclude_id.js` | Same but remove the default `_id` field from output |
| `04_queens_only.js` | Filter to Queens restaurants only |
| `05_top10_queens_alphabetical.js` | First 10 Queens restaurants sorted by name |
| `06_high_score_restaurants.js` | Restaurants with any inspection score above 85 |
| `07_score_range_85_to_100.js` | Score between 85 and 100 within the same inspection entry |
| `08_manhattan_non_american_grade_a.js` | Manhattan, non-American cuisine, at least one grade A |
| `09_name_starts_with_wil.js` | Restaurants whose name starts with "Wil" |
| `10_name_ends_with_ces.js` | Restaurants whose name ends with "ces", descending order |
| `11_brooklyn_soul_food_or_chinese.js` | Brooklyn restaurants serving Soul Food or Chinese |
| `12_multi_borough.js` | Restaurants in Brooklyn, Queens, Manhattan, or Bronx |
| `13_exclude_boroughs.js` | Restaurants outside those four boroughs |
| `14_advanced_filter.js` | Cuisines that are not Irish or Chinese, plus any name starting with "Wil" |

---

## Running the Queries

The dataset is MongoDB's [sample_restaurants](https://www.mongodb.com/docs/atlas/sample-data/sample-restaurants/) collection. You can load it for free through MongoDB Atlas by creating a free cluster and selecting "Load Sample Dataset."

Once your cluster is up:

```bash
mongosh "mongodb+srv://<your-cluster>.mongodb.net/sample_restaurants" \
  --username <user> \
  --file queries/07_score_range_85_to_100.js
```

Or paste any query directly into the mongosh shell after connecting.
