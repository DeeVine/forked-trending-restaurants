# Script for collecting data
import json
print(json.__version__)
import requests
print(requests.__version__)
import pymongo
print(pymongo.__version__)
from pymongo import MongoClient

# import pprint
# pp = pprint.PrettyPrinter(indent=4)

import datetime
print(datetime.__version__)
now = datetime.datetime.now()

client = MongoClient('mongodb://admin:bootcamp123@ds125113.mlab.com:25113/trendingreviewapp')
db = client.trendingreviewapp

# Updates yelpId database based on id_arrays.json
jsondata = json.load(open('id_arrays.json'))
yelp_ids = jsondata['yelpArrIds']

yelpIds = db.yelpIds
# for doc in yelp_ids:
# 	yelpIds.update_one({'yelpId': doc['yelpId']},
# 		{"$set":doc}, upsert=True)
# ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

items = list(yelpIds.find())
my_list = []

# import os

# cwd = os.getcwd()  # Get the current working directory (cwd)
# files = os.listdir(cwd)  # Get all the files in that directory
# print("Files in '%s': %s" % (cwd, files))

# for looping through Ids and fresh inputting into db
# for val in items:
# 	yelp_id = val['yelpId']
# 	r = requests.get('https://api.yelp.com/v3/businesses/' + yelp_id, 
# 		headers={"Authorization": 'Bearer Dt0X2kf0ef_hQ5Jc_5FNnxheSlXdFX1-svTZE6AJP0J4lBoVuMFRl66QgPFblxpMN-_AHN9OL3mek81qVap7DEtTMK2MrXxXpTxV31SVTbe-qajxmCEGj_nHwuEuWnYx'}).json()
	
# 	data={}
# 	data['name']= r['name']
# 	data['yelpId']= r['id']
# 	data['price'] = r.get('price')
# 	data['rating']= r['rating']
# 	data['reviews']= [{
# 		'review_count': r['review_count'],
# 		'query_date': str(now)
# 		}
# 	]
# 	data['categories']= r['categories']
# 	data['phone']= r['display_phone']
# 	data['yelpURL']= r['url']
# 	my_list.append(data)

# # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
updated_list = []
# # for looping through ids and returning new rating and review count
# for val in items:
# 	yelp_id = val['yelpId']
# 	r = requests.get('https://api.yelp.com/v3/businesses/' + yelp_id, 
# 		headers={"Authorization": 'Bearer Dt0X2kf0ef_hQ5Jc_5FNnxheSlXdFX1-svTZE6AJP0J4lBoVuMFRl66QgPFblxpMN-_AHN9OL3mek81qVap7DEtTMK2MrXxXpTxV31SVTbe-qajxmCEGj_nHwuEuWnYx'}).json()
	
# 	data={}

# 	data['yelpId']= r['id']
# 	data['rating']= r['rating']
# 	data['reviews']= {
# 		'review_count': r['review_count'],
# 		'query_date': str(now)
# 		}
# 	updated_list.append(data)
# # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
# pp.pprint(updated_list)
# # insert my_list into the collection
restaurants = db.restaurants
# # 
# # To insert the array of new restaurants
# for data in my_list:
# 	restaurants.update_one({'yelpId': data['yelpId']},
# 		{"$set":data}, upsert=True)
# print(restaurants.count())
# # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

# # to update rating and reviews
# for value in updated_list:
# 	restaurants.find_one_and_update({
# 		'yelpId': value['yelpId']
# 		},
# 		{
# 		'$push': {
# 			'reviews': value['reviews']
# 		},
# 		'$set': {'rating': value['rating']}
# 		}
# 	)
# # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

print('done')
