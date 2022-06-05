from tkinter.font import names
import pandas as pd
import numpy as np
from pymongo import MongoClient
from slugify import slugify

class DataMigration:
    def __init__(self, fromDB, toDB):
        self.fromDB = fromDB
        self.toDB = toDB

    def migrate_user(self):
        users = self.fromDB['users']
        df = pd.DataFrame(users.find())
        df.rename(columns={'isProvider': 'isMerchant'},
          inplace=True, errors='raise')
        emails = list(df.email)
        for index, email in enumerate(emails): 
            arr = email.split('@')
            arr[1] = 'halabook.com'
            arr = arr[0] + str(index) + '@' + arr[1]
            emails[index] = arr
        df['email'] = emails
        df.drop([
            'magicPasswordEnabled',
            'isSuperAdmin',
        ],
        axis=1, inplace=True, errors='raise')
        
        
        self.toDB["users"].insert_many(df.to_dict(orient="records"))

    def migrate_userProfile(self):
        profiles = self.fromDB['userprofiles']
        df = pd.DataFrame(profiles.find())
        df.drop([
            'language',
            'setting',
            'isProfileCreated',
            'profilePic',
            'firstName',
            'lastName',
            'mobile'
        ],
        axis=1, inplace=True, errors='raise')
        self.toDB["userprofiles"].insert_many(df.to_dict(orient="records"))
        
    def migrate_saloonProfile(self):
        profiles = self.fromDB['serviceprofiles']
        df = pd.DataFrame(profiles.find())
        df.rename(columns={'title': 'name'},
          inplace=True, errors='raise')
        df.drop([
            'category',
            'parentCategory',  
            'location',          
            'thumbnail',
            'pictures',
            'elasticsearch',
            'compensation',
            'email',
            'serviceAreas',
            'isSubscribed',
        ],
        axis=1, inplace=True, errors='raise')
        df['profilePercentage'] = 25
        nameList = list(df.name)
        description = list()
        nameSlug = list()
        for index, name in enumerate(nameList): 
            nameList[index] = 'Sample Saloon ' + str(index)
            nameSlug.append(slugify('Sample Saloon ' + str(index)))
            description.append("This is sample saloon for halabook project. The index is " + str(index))
        df['name'] = nameList
        df['nameSlug'] = nameSlug
        df['description'] = description
        self.toDB["saloonprofiles"].insert_many(df.to_dict(orient="records"))
        
    def migrate_saloonProvider(self):
        merchant = self.fromDB['serviceproviders']
        df = pd.DataFrame(merchant.find())
        df.rename(columns={'provider': 'merchant', 'serviceProfile': 'saloonProfile'},
          inplace=True, errors='raise')
        self.toDB["merchants"].insert_many(df.to_dict(orient="records"))

def get_database(dbName):
    CONNECTION_STRING = "mongodb://localhost:27017"
    client = MongoClient(CONNECTION_STRING)

    return client[dbName]

if __name__ == '__main__':
    ilafeDB = get_database("ilafe")
    hbDB = get_database("halabook")

    Migration = DataMigration(ilafeDB, hbDB)
    Migration.migrate_user()
    Migration.migrate_userProfile()
    Migration.migrate_saloonProfile()
    Migration.migrate_saloonProvider()

    
