# Generated by Django 2.1.1 on 2018-09-20 05:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flights', '0012_auto_20180920_0520'),
    ]

    operations = [
        migrations.AlterField(
            model_name='aircraft',
            name='photo',
            field=models.ImageField(default='/plane.jpg', upload_to='aircraft/%Y/%m/%D/'),
        ),
    ]