from django.apps import AppConfig


class MyapiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "myapi"


class UsersConfig(AppConfig):
    name = 'users'

    def ready(self):
        import myapi.signals