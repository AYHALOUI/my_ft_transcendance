# Generated by Django 4.2.15 on 2024-09-01 14:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('UserManagement', '0002_alter_user_password'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='username',
        ),
    ]
