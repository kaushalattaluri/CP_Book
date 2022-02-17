from flask import Flask, render_template
from flask_restful import Api, Resource
from flask_cors import CORS
import threading
from details_soup import UserData, UsernameError, PlatformError, BrokenChangesError
from send_mail import Mail
from details_soup import update
from requests.utils import DEFAULT_CA_BUNDLE_PATH 
app = Flask(__name__)
CORS(app)
api = Api(app)


class Details(Resource):
    def get(self, platform, username):
        if platform == 'register':
            user_data = UserData(username)
            try:
                return user_data.register(platform)

            except UsernameError:
                return {'status': 'Failed', 'details': 'Invalid username'}

            except PlatformError:
                return {'status': 'Failed', 'details': 'Invalid Platform'}
            
            except BrokenChangesError:
                return {'status': 'Failed', 'details': 'API broken due to site changes'}
        if platform == 'user':
            user_data = UserData(username)
            try:
                return user_data.user_details(username)

            except UsernameError:
                return {'status': 'Failed', 'details': 'Invalid username'}

            except PlatformError:
                return {'status': 'Failed', 'details': 'Invalid Platform'}
            
            except BrokenChangesError:
                return {'status': 'Failed', 'details': 'API broken due to site changes'}
        
        if platform == 'all_users':
            user_data = UserData()
            try:
                return user_data.all_users()

            except UsernameError:
                return {'status': 'Failed', 'details': 'Invalid username'}

            except PlatformError:
                return {'status': 'Failed', 'details': 'Invalid Platform'}
            
            except BrokenChangesError:
                return {'status': 'Failed', 'details': 'API broken due to site changes'}
        
        if platform == 'user_update':
            user_data = UserData(username)
            try:
                return user_data.user_update()

            except UsernameError:
                return {'status': 'Failed', 'details': 'Invalid username'}

            except PlatformError:
                return {'status': 'Failed', 'details': 'Invalid Platform'}
            
            except BrokenChangesError:
                return {'status': 'Failed', 'details': 'API broken due to site changes'}
        if platform == 'login':
            user_data = UserData(username)
            try:
                return user_data.login(username)

            except UsernameError:
                return {'status': 'Failed', 'details': 'Invalid username'}

            except PlatformError:
                return {'status': 'Failed', 'details': 'Invalid Platform'}
            
            except BrokenChangesError:
                return {'status': 'Failed', 'details': 'API broken due to site changes'}

        else:
            user_data = UserData(username)
            print(platform,username)

            try:
                return user_data.get_details(platform)

            except UsernameError:
                return {'status': 'Failed', 'details': 'Invalid username'}

            except PlatformError:
                return {'status': 'Failed', 'details': 'Invalid Platform'}
            
            except BrokenChangesError:
                return {'status': 'Failed', 'details': 'API broken due to site changes'}


api.add_resource(Details,'/api/<string:platform>/<string:username>')


@app.errorhandler(404)
def invalid_route(e):
    return render_template('404.html')

def runapi():
    print('hey')
    app.run()
def updatedb():
    from apscheduler.schedulers.blocking import BlockingScheduler
    scheduler = BlockingScheduler()
    scheduler.add_job(update, "interval", hours=6)
    scheduler.start()

if __name__ == '__main__':
    t1 = threading.Thread(target=runapi)
    t2 = threading.Thread(target=updatedb)
    t1.start()
    t2.start()
    t1.join()
    # starting thread 2
    t2.join()
