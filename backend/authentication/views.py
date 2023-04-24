from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.twitter_oauth2.views import TwitterOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from dj_rest_auth.social_serializers import TwitterLoginSerializer


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:3000/api/auth/callback/google"
    client_class = OAuth2Client


class TwitterLogin(SocialLoginView):
    adapter_class = TwitterOAuth2Adapter
    callback_url = "http://localhost:3000/api/auth/callback/twitter"
    serializer_class = TwitterLoginSerializer
