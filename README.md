
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


return restaurants closest based on geolocation
    sort by most trending
check if restaurant rating changes for saved restaurants


total ratings = 0.09 * 2.5
.23 1.00 1
total reviews = 0.5 * 2.5
1.00 5.55 .18
total checkins = 8.07 * 2.5
20.18 85.58 .01

6/20.18

find min and max for % change
    do 0 to 1
    so can find scaled percent change for any change in that set

raw % change per week
    set min amount of reviews/checks/ratings, 40/50,


todo:
    find out whats trending based on raw % change with min amount required to qualify
        % change delta per week
        change of above delta per week

    delete the duplicate entry in the database
    maybe: add lat lng to each doc
    
    geolocate trending in area


    user auth
    setting user database
    saving restaurants

    adding a new restaurant

    data visualizing:
        on graphs: raw change and % change
        on text: % change
        on backend: showing top trending via % change
    
    clean up code!!!
    
    extra: check if rating changes
                    google API
what else to display and how to display it

state that saves the top 30 restaurants by location
filter can sort by distance or score