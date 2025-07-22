from rest_framework import serializers
from notes.models import Notes, Category

class CategorySerializer(serializers.ModelSerializer):
    category = serializers.CharField(required=True)
    class Meta:
        model = Category
        fields = "__all__"

class NoteSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=True)
    content = serializers.CharField(required=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    class Meta:
        model = Notes
        fields = "__all__"
