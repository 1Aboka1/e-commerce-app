from django import forms

class CategoryChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        if obj.is_greatest is True:
            return obj