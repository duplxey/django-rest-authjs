# django-drf-nextauth

## Project setup

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
	
1. Create an *.env* file in the project root with the following contents:

    ```env
    GOOGLE_CLIENT_ID=<your_google_client_id>
	GOOGLE_SECRET=<your_google_secret>
	TWITTER_CLIENT_ID=<your_twitter_client_id>
	TWITTER_SECRET=<your_twitter_secret>
	JWT_SECRET_KEY=<your_jwt_secret>
    ```
	
1. Apply the migrations:

    ```sh
    (venv)$ python manage.py migrate
    ```
	
1. Run the development server:

    ```sh
    (venv)$ python manage.py runserver
    ```

### Frontend

1. Change directory to `frontend`.

1. Install the dependencies:

    ```sh
    $ npm install
    ```
	
1. Create an *.env.local* file in the project root with the following contents:

    ```env
	NEXTAUTH_SECRET=complexsecret
	NEXTAUTH_BACKEND_URL=http://127.0.0.1:8000/api/
	NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000/api/

	GOOGLE_CLIENT_ID=<your_google_client_id>
	GOOGLE_CLIENT_SECRET=<your_google_secret>
	TWITTER_ID=<your_twitter_client_id>
	TWITTER_SECRET=<your_twitter_secret>
    ```
	
1. Run the development server:

    ```sh
    $ next dev
    ```
	
1. Navigate to [http://localhost:3000/](http://localhost:3000/) in your favorite web browser.