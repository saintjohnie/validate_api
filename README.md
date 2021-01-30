# validate_api

#Get request:https://validat-api.glitch.me/
#Post request:https://validat-api.glitch.me/validate-api
# This is an api that validate a post request with the following payload format
#{
  "rule": {
    "field": "missions"
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": 45
  }
}
