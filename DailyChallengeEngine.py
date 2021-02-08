from datetime import datetime, timedelta
from firebase import Firebase
from random import shuffle

config = {
  "apiKey": "AIzaSyAUrHjLAsNYF7rlJSdWfp5illkXkQH37xk",
  "authDomain": "bridgebuddies-b2de6.firebaseapp.com",
  "storageBucket": "bridgebuddies-b2de6.appspot.com",
  "databaseURL": "https://bridgebuddies-b2de6-default-rtdb.firebaseio.com",
};

firebase = Firebase(config)
db = firebase.database()

SUITS = ['C', 'D', 'H', 'S'];
VALUES = [2,3,4,5,6,7,8,9,10,11,12,13,14];
class SEATS:
    NORTH = "north"
    EAST = "east"
    SOUTH = "south"
    WEST = "west"

class Deck:
    @staticmethod
    def deal():
        deck = [{"value": value, "suit": suit} for value in VALUES for suit in SUITS]
        shuffle(deck)

        north_hand = sorted(deck[0:13], key=Deck.cmpkey)
        east_hand = sorted(deck[13:26], key=Deck.cmpkey)
        south_hand = sorted(deck[26:39], key=Deck.cmpkey)
        west_hand = sorted(deck[39:52], key=Deck.cmpkey)

        return {
            SEATS.NORTH: north_hand,
            SEATS.EAST: east_hand,
            SEATS.SOUTH: south_hand,
            SEATS.WEST: west_hand,
        }

    @staticmethod
    def cmpkey(card):
        return 13 * SUITS.index(card["suit"]) + (14 - card["value"])

for delta in range(366):
    day = datetime.now() - timedelta(days=delta)
    date_str = day.strftime("%m-%d")
    hands = Deck.deal()
    contract = {
      "suit": 'S',
      "level": 4,
      "declarer": SEATS.SOUTH,
      "doubled": False,
      "redoubled": False,
    };
    hands_and_contract = {"hands": hands, "contract": contract}

    db.child('daily_challenges').update({
        date_str: hands_and_contract,
    })
