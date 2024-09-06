# Generated by Django 4.2.15 on 2024-09-05 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserManagement', '0014_user_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(default='/assets/images/avatar.jpg', upload_to='profile_pictures/'),
        ),
    ]
