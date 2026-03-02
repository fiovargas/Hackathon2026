from django.contrib import admin
from django.urls import include, path

api_urls = [
    path("auth/", include("apps.authentication.urls")),
    path("common/", include("apps.common.urls")),
    path("documents/", include("apps.Documents.urls")),
]

urlpatterns = [path("admin/", admin.site.urls), path("api/", include(api_urls))]
