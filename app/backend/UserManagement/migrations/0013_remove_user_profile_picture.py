# Generated by Django 4.2.15 on 2024-09-05 12:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('UserManagement', '0012_alter_user_profile_picture'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='profile_picture',
        ),
    ]
