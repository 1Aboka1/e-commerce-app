from django import forms

class CategoryChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        return obj