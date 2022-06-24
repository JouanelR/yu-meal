# -*- coding: utf-8 -*-
"""
Created on Sun Jun 19 15:33:02 2022

@author: jouanel romain
"""
import pandas as pd
from sklearn.metrics.pairwise import sigmoid_kernel
from sklearn.feature_extraction.text import TfidfVectorizer
import pymongo 
from flask import Flask
from flask_cors import CORS

from flask import jsonify

app = Flask(__name__)
CORS(app)


def cleanDf(df,userid,db):
    #------------------ recuperer les info nutrition de l'utilisateur dans la bdd -----------------------#
    users = db["users"]
    users = users.find_one() 
    vegan = False # recuper info bdd
    vegetarian = False # recuper info bdd
    
    '''for i in users:
        print(i)
        if i == "_id" == userid:
            vegan = i["vegan"]
            vegetarien = i["vegetarian"]'''
            
            
    #------------------ netoyer le dataframe -------------------------#
    if(vegan):
        mask = (df['tags'].str.contains('dietary|vegan', case=False, na=False)) 
    elif(vegetarian):
        mask = (df['tags'].str.contains('dietary|vegetarian', case=False, na=False)) 

    else:
        mask = (df['tags'].str.contains('dietary', case=False, na=False)) 
        
    df =df[mask]
    
    allergenes = db["alllergenes"]
    allergenes = allergenes.find_one()
    
    listAllergene = [] #recuper info bdd
    '''for i in allergenes:
        if i["user_id"] == userid:
            listAllergene.append(i["nutriment_id"])'''
            
    #print('|'.join(listAllergene))
    #mask = ((df['tags'].str.contains('|'.join(listAllergene),case=False, na=False)) & (df['ingredients'].str.contains('|'.join(listAllergene),case=False, na=False)))
    
    return df[mask]




def creationDf(listArecommander,userid,db):
    df = pd.read_csv("RAW_recipes.csv")
    
    #supprimer colones inutiles
    df = df.drop(columns=['contributor_id','n_steps',"contributor_id","submitted","steps","description"])
    
    
    
    df_clean = cleanDf(df,userid,db)
    
    
    df_sample = df_clean.sample(n = 100)
    
    #------------------ verifier que les id des recettes a appliquer la recommandation sont bien dans df_sample-----#
    
    for i in listArecommander:
        mask = df_sample["id"] == i
        dff = df_sample[mask]
        if dff.shape[0] == 0:
            df_sample = pd.concat([df_sample,df.loc[df["id"] == i]],ignore_index=True)
    
    #------------------ verifier que les id des recettes dislike ne sont pas dans df_sample-----#
    #listDislike = [1] # faire requete au server pour recup la liste
    
    """for i in listDislike:
        if i in df_sample["id"]:"""
            
        
    #------------------ verifier que les id des recettes dislike ne sont pas dans df_sample-----#
      
    
    return df_sample
        
        
        
        
#-------------------------- creation tfv + sig --------------------------#
    
def give_sig(df_sample):    
    tfv = TfidfVectorizer(min_df=3, max_features=None, strip_accents = 'unicode', analyzer = 'word', token_pattern=r'\w{1,}', ngram_range=(1,3), stop_words = 'english')

    tfv_matrix = tfv.fit_transform(df_sample['ingredients'])

    
    
    sig = sigmoid_kernel(tfv_matrix,tfv_matrix, gamma=.5)
    
    return sig
    
    
    
#-------------------------- recommandation --------------------------#
    
def give_rec(recipe_id, sig, df_sample):

    idx = df_sample.index[df_sample["id"] == recipe_id].tolist()
    idx = idx[0]
    sig_scores = list(enumerate(sig[idx]))
    sig_scores = sorted(sig_scores, key=lambda x: x[1], reverse=True)
    sig_scores = sig_scores[1:21]

    recipe_indices = [i[0] for i in sig_scores]

    return df_sample["name"].iloc[recipe_indices]

@app.route("/dashboard",methods=["GET"])
def getDashboard():
    client = pymongo.MongoClient("mongodb://localhost:27017/") 
    db = client["test"] 
    df = creationDf([137739,66696],0,db)
    sig = give_sig(df)
    rec = give_rec(66696,sig,df)
    rec = [rec.iloc[x] for x in range(5)]
    print(rec)
    print(123456,jsonify(response_value_1=rec))
    return jsonify(response_value_1=1,response_value_2="value")
    



if __name__ == "__main__":
    app.run("localhost", 6969)
    
    