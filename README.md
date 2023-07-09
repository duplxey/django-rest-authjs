# Django REST-based Authentication with Auth.js

The repository is split into two directories:

1. `backend` -- the backend part of the project (Django, DRF, dj-rest-auth)
2. `frontend` -- the frontend part of the project (Next.js, Auth.js)

> If you're interested only in Django REST framework authentication take a look at [this repo](https://github.com/duplxey/django-rest-allauth).

## Want to learn how to build this?

Check out the [post](#).

## Want to use this project?

Go ahead and fork/clone the repository and then setup backend and frontend individually.

### Backend

1. Change directory to `backend`.

1. Create and activate a virtual environment:

    ```sh
    $ python3 -m venv venv && source venv/bin/activate
    ```

1. Install the requirements:

    ```sh
    (venv)$ pip install -r requirements.txt
    ```

1. Apply the migrations:

    ```sh
    (venv)$ python manage.py migrate
    ```

1. Register your app with social providers and take note of your client IDs and secrets.

1. Enter the client IDs and secrets in *core/settings.py* respectively:

    ```env
    SOCIALACCOUNT_PROVIDERS = {
        "google": {
            "APP": {
                "client_id": "<your google client id>",
                "secret": "<your google secret>",
                "key": "",  # leave empty
            },
            "SCOPE": [
                "profile",
                "email",
            ],
            "AUTH_PARAMS": {
                "access_type": "online",
            },
            "VERIFIED_EMAIL": True,
        },
        "twitter_oauth2": {
            "APP": {
                "client_id": "<your twitter client id>",
                "secret": "<your twitter secret>",
                "key": "",  # leave empty
            },
            "VERIFIED_EMAIL": True,
        },
    }
    ```
	
1. Run the development server:

    ```sh
    (venv)$ python manage.py runserver
    ```
    
1. Your authentication API is now accessible at [http://localhost:8000/api/auth/](http://localhost:8000/api/auth/).

### Frontend

1. Change directory to `frontend`.

1. Install the dependencies:

    ```sh
    $ npm install
    ```
	
1. Create an *.env.local* file in the project root with the following contents:

    ```env
    NEXTAUTH_URL=http://127.0.0.1:3000
    NEXTAUTH_SECRET=<generate_a_secret_key>
    NEXTAUTH_BACKEND_URL=http://127.0.0.1:8000/api/
    NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000/api/

	GOOGLE_CLIENT_ID=<your_google_client_id>
	GOOGLE_CLIENT_SECRET=<your_google_secret>
	TWITTER_CLIENT_ID=<your_twitter_client_id>
	TWITTER_SECRET=<your_twitter_secret>
    ```
	
1. Run the development server:

    ```sh
    $ next dev
    ```
	
1. Navigate to [http://localhost:3000/](http://localhost:3000/) in your favorite web browser.