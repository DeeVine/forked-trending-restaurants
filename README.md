# nytreact
nytimes scraper app built with Node/Express/MongoDB/ReactJS

- [ ] testing


* Updates to make:
 * Display query date/info in results so user knows to reference
 * Hover effects
 * form styling
 * styling to main header
 * Text annotation
 * Add footer

* find % increase per week (require a minimum such as 40 reviews to qualify)

Reviews (yelp)
Ratings (fb)
Checkins (fb)

* Sort restaurants by raw percentage increase in each category (reviews, ratings, checkins)
	- Consider finding a weighted number based on combined percentage changes (only count categories meeting minimum required)

(150% + 80% + 50%) / 3 = 93.33

* Compare % change of increase week over week for all restaurants.
	Week1 % increase 60%
	Week2 % increase 90%
	90%-60% = 30% change of increase

* Sort restaurants by % change of increase