# -*- coding: utf-8 -*-
"""
Created on Sun Jun 19 15:33:02 2022

@author: jouanel romain
"""
import pandas as pd
from sklearn.metrics.pairwise import sigmoid_kernel
from sklearn.feature_extraction.text import TfidfVectorizer
import pymongo 
import json
from flask import Flask,request,Response
from flask_cors import CORS
from flask import jsonify
#import request
app = Flask(__name__)
CORS(app)


def cleanDf(df,userid,db):
    #------------------ recuperer les info nutrition de l'utilisateur dans la bdd -----------------------#
    mycol = db["users"]
    user = mycol.find_one({},{"_id":userid})
    print(user)
    
    mask = (df['tags'].str.contains('dietary', case=False, na=False)) 
    df = df[mask]
            
    #------------------ netoyer le dataframe -------------------------#
    if(user["vegan"]):
        mask = (df['tags'].str.contains('vegan', case=False, na=False)) 
        df = df[mask]
    if(user["gluten_free"]):
        mask = (df['tags'].str.contains('gluten_free', case=False, na=False)) 
        df = df[mask]
    if(user["vegetarien"]):
        mask = (df['tags'].str.contains('vegetarien', case=False, na=False)) 
        df = df[mask]
    if(user["egg"]):
        mask = (not df['tags'].str.contains('egg', case=False, na=False)) 
        df = df[mask]
    if(user["lactose"]):
        mask = (not df['tags'].str.contains('lactose', case=False, na=False)) 
        df = df[mask]
    if(user["nuts"]):
        mask = (not df['tags'].str.contains('nuts', case=False, na=False)) 
        df = df[mask]
    if(user["peanuts"]):
        mask = (not df['tags'].str.contains('peanuts', case=False, na=False)) 
        df = df[mask]
    if(user["seafood"]):
        mask = (not df['tags'].str.contains('seafood', case=False, na=False)) 
        df = df[mask]
    if(user["sesame"]):
        mask = (not df['tags'].str.contains('sesame', case=False, na=False)) 
        df = df[mask]
    if(user["soy"]):
        mask = (not df['tags'].str.contains('soy', case=False, na=False)) 
        df = df[mask]
    
    return df




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

@app.route("/dashboard",methods=["GET","POST"])
def getDashboard():
    '''client = pymongo.MongoClient("mongodb://localhost:27017/") 
    db = client["test"] 
    df = creationDf([137739,66696],0,db)
    sig = give_sig(df)
    rec = give_rec(66696,sig,df)
    rec = [rec.iloc[x] for x in range(5)]'''
    
    if request.method == "GET":
        print(1)
        print(jsonify(response=1))
        return jsonify(response=1)
    
    
    if request.method == "POST":
        print(2)
        received_data = request.get_json()
        message = received_data['data']
        print(message)
        
        return_data = {
            "status": "success",
            "message": f"received: {allRecomendation(message)}"
        }
        return Response(response=json.dumps(return_data), status=201)

def allRecomendation(idUser):
    client = pymongo.MongoClient("mongodb://localhost:27017/") 
    db = client["test"] 
    df = creationDf([137739,66696],0,db)
    sig = give_sig(df)
    rec = give_rec(66696,sig,df)
    rec = [rec.iloc[x] for x in range(5)]
    return rec


if __name__ == "__main__":
    app.run("localhost", 6969)
    
    