from django.contrib import admin
from django.urls import include, path

api_urls = [
    path("auth/", include("apps.authentication.urls")),
    path("common/", include("apps.common.urls")),
    path("documents/", include("apps.Documents.urls")),
    path("postulations/", include("apps.Postulations.urls")),
    path("vacancies/", include("apps.Vacancies.urls")),
    path("notifications/", include("apps.Notificattions.urls")),
    path("admin/", include("apps.Admin.urls")),
    path("profiles/", include("apps.Profiles.urls")),
]

urlpatterns = [path("admin/", admin.site.urls), path("api/", include(api_urls))]
