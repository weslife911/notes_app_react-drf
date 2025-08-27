from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteView.as_view()),
    path("category/", views.CategoryView.as_view()),
    path("notes/<str:pk>/", views.NoteDetailView.as_view()),
    path("category/<str:pk>/", views.CategoryDetailView.as_view()),
]
