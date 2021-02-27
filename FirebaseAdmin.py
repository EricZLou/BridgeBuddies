from firebase import Firebase

config = {
  "apiKey": "AIzaSyAUrHjLAsNYF7rlJSdWfp5illkXkQH37xk",
  "authDomain": "bridgebuddies-b2de6.firebaseapp.com",
  "storageBucket": "bridgebuddies-b2de6.appspot.com",
  "databaseURL": "https://bridgebuddies-b2de6-default-rtdb.firebaseio.com",
};

class FirebaseAdmin:
    def __init__(self, config):
        firebase = Firebase(config)
        self.db = firebase.database()

    def convert_to_uid(self, username):
        return self.db.child("usernames").child(username).get().val()

    def modify_user_by_path(self, uid, path, data):
        dirs = path.split('/')
        view = self.db.child("users").child(uid)
        for dir in dirs:
            assert dir
            view = view.child(dir)
        view.update(data)

    def modify_all_users_by_path(self, path, data):
        users = self.db.child("usernames").get()
        for uid in users.each():
            self.modify_user_by_path(uid=uid.val(), path=path, data=data)

    def remove_user(self, uid):
        pass


if __name__ == '__main__':
    admin = FirebaseAdmin(config)
    # uid = admin.convert_to_uid("ericlou101")
    admin.modify_all_users_by_path(path="settings", data={"sounds": True})
