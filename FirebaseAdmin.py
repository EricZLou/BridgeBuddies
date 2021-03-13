from dataclasses import dataclass
from firebase import Firebase

config = {
  "apiKey": "AIzaSyAUrHjLAsNYF7rlJSdWfp5illkXkQH37xk",
  "authDomain": "bridgebuddies-b2de6.firebaseapp.com",
  "storageBucket": "bridgebuddies-b2de6.appspot.com",
  "databaseURL": "https://bridgebuddies-b2de6-default-rtdb.firebaseio.com",
};

"""
NOTE: Firebase Database APIs
main --
    child, get, push, remove, set, update
order --
    limit_to_first, limit_to_last, order_by_child, order_by_key, order_by_value
others --
    build_headers, build_request_url, check_token, end_at, equal_to,
    generate_key, shallow, sort, start_at, stream
"""

@dataclass
class OPS:
    REMOVE='REMOVE'
    SET='SET'
    UPDATE='UPDATE'

class FirebaseAdmin:
    def __init__(self, config):
        firebase = Firebase(config)
        self.db = firebase.database()

    def convert_to_uid(self, username):
        return self.db.child("usernames").child(username).get().val()

    def modify_user_by_path(self, uid, op, path="", data=None):
        view = self.db.child("users").child(uid)
        dirs = []
        if path: dirs = path.split('/')
        for dir in dirs:
            assert dir
            view = view.child(dir)
        if op is OPS.REMOVE:
            view.remove()
        elif op is OPS.SET:
            view.set(data)
        elif op is OPS.UPDATE:
            view.update(data)
        else:
            raise Exception("Not a valid operation.")

    def modify_all_users_by_path(self, op, path, data=None):
        users = self.db.child("usernames").get()
        for uid in users.each():
            self.modify_user_by_path(uid=uid.val(), op=op, path=path, data=data)

    def remove_user(self, uid):
        username = self.db.child("users").child(uid).child("details").child("username").get().val()
        self.modify_user_by_path(uid, OPS.REMOVE)
        self.db.child("usernames").child(username).remove()


if __name__ == '__main__':
    admin = FirebaseAdmin(config)
    uid = admin.convert_to_uid("ericky13")
    admin.remove_user(uid)
