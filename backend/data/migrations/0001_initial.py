# Generated by Django 4.2 on 2024-03-12 17:52

import data.models
from django.db import migrations, models
import django.db.models.deletion
import users.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='item category name', max_length=64, unique=True, verbose_name='name')),
                ('description', models.CharField(help_text='item category description', max_length=256, verbose_name='description')),
            ],
            options={
                'verbose_name_plural': 'categories',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='WebSite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.URLField(help_text='site url address', verbose_name='url')),
                ('name', models.CharField(blank=True, help_text='site name', max_length=64, verbose_name='name')),
                ('slogan', models.CharField(blank=True, help_text='site slogan', max_length=256, verbose_name='slogan')),
                ('banner', models.ImageField(blank=True, help_text='website header banner image', upload_to=data.models.banner_path, verbose_name='website banner image')),
                ('email', models.EmailField(blank=True, help_text='email contact', max_length=64, verbose_name='email')),
                ('telegram', models.CharField(blank=True, help_text='telegram contact', max_length=64, verbose_name='telegram')),
                ('phone', models.CharField(blank=True, help_text='phone contact number', max_length=18, null=True, unique=True, validators=[users.models.phone_validator], verbose_name='phone number')),
                ('address', models.CharField(blank=True, max_length=256, verbose_name='address')),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='item name', max_length=64, unique=True, verbose_name='name')),
                ('description', models.CharField(help_text='item description', max_length=256, verbose_name='description')),
                ('picture', models.ImageField(help_text='item picture', upload_to=data.models.item_picture_path, verbose_name='picture')),
                ('price', models.DecimalField(decimal_places=2, help_text='item price', max_digits=10, verbose_name='price')),
                ('visible', models.BooleanField(default=False, help_text='make item visible to users', verbose_name='visible')),
                ('featured', models.BooleanField(default=False, help_text='display item in featured', verbose_name='featured')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='items', to='data.category', verbose_name='category')),
            ],
            options={
                'ordering': ['id'],
            },
        ),
    ]
