from django.urls import path

from .views import CantonListView, CategoryListView, CurrencyListView, ProvinceListView, RequirementListView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('currencies/', CurrencyListView.as_view(), name='currency-list'),
    path('provinces/', ProvinceListView.as_view(), name='province-list'),
    path('cantons/', CantonListView.as_view(), name='canton-list'),
    path('requirements/', RequirementListView.as_view(), name='requirement-list'),
]
