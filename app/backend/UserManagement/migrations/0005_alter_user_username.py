# Generated by Django 4.2.15 on 2024-09-02 12:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserManagement', '0004_user_bio_user_display_name_user_mobile_number_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(default='', max_length=30),
        ),
    ]
