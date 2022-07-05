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
from collections import Counter
from bson.objectid import ObjectId
#import request
app = Flask(__name__)
CORS(app)


def listLike(db,userid):
    print("la")
    mycol = db["likes"]
    likes = mycol.find()
    listL = []
    for i in likes:
        if i["id_user"] == userid:
            listL.append(i["id_recette"])
    print("listL:",listL)
    return listL


def listDislike(db,idUser):
    print("la")
    mycol = db["dislikes"]
    dislikes = mycol.find()
    listD = []
    for i in dislikes:
        if i["id_user"] == idUser:
            listD.append(i["id_recette"])
    return listD

def cleanDf(df,userid,db):
    print(userid)
    mask = (df['tags'].str.contains('dietary', case=False, na=False)) 
    df = df[mask]
    
    #------------------ recuperer les info nutrition de l'utilisateur dans la bdd -----------------------#
    mycol = db["users"]
    
    #x = mycol.find() 
  
    #for data in x: 
        #   if (data["_id"] == userids)
    
    user = mycol.find_one(ObjectId(userid["userid"])) 
    print(user)
    
            
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
        mask = ((not df['tags'].str.contains('egg', case=False, na=False)) & (not df['ingredient'].str.contains('egg', case=False, na=False)))
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

def creationDfV(userid,db):
    df = pd.read_csv("RAW_recipes_images.csv")
    #supprimer colones inutiles
    #df = df.drop(columns=['contributor_id','n_steps',"contributor_id","submitted","description"])
        
    df_clean = cleanDf(df,userid,db)
    
    
    df_sample = df_clean.sample(n = 5)
    
    return df_sample


def creationDf(ListArec,listL,listD,userid,db):
    df = pd.read_csv("RAW_recipes_images.csv")
    #supprimer colones inutiles
    #df = df.drop(columns=['contributor_id','n_steps',"contributor_id","submitted","description"])
    
    
    
    df_clean = cleanDf(df,userid,db)
    
    
    df_sample = df_clean.sample(n = 100)
    
    #------------------ verifier que les id des recettes a appliquer la recommandation sont bien dans df_sample-----#
    
    for i in ListArec:
        mask = df_sample["id"] == i
        dff = df_sample[mask]
        if dff.shape[0] == 0:
            df_sample = pd.concat([df_sample,df.loc[df["id"] == i]],ignore_index=True)
    
    #------------------ verifier que les id des recettes dislike ne sont pas dans df_sample-----#
    
    df_sample.drop(df_sample[ df_sample['id'] in listD ].index , inplace=True)
    if(len(listL)>5):
        df_sample.drop(df_sample[ df_sample['id'] in listL[:-5] ].index , inplace=True) 
    
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

    return df_sample["id"].iloc[recipe_indices]

#-------------------------- Similarités entre les Listes --------------------------#

def most_frequent(List):

    #transforme la liste de liste en liste flat
    flat_list = []
    for item in List:
        flat_list.extend(item)
    print(flat_list)

    # va compter les occurrences et renvoyer une liste de tuples (x,y)
    # x = valeur, y = occurrence
    occ = Counter(flat_list)
    occList = occ.most_common(4)
    return [x[0] for x in occList]

#-------------------------- Transformer liste des likes en listes de recommendations --------------------------#

def like_to_rec(listLikes,sig,df):

    multiRec = []

    for i in listLikes :
        multiRec.append(give_rec(i,sig,df))

    return multiRec

#-------------------------- Retourner les Dictionnaires avec les rangs --------------------------#

def give_Dic(list_rec,df):
    list_dict = []
    for i in list_rec:
        print(i)
        list_dict.extend(df[df['id']==i].to_dict('records'))

        print("test", df[df['id']==i])
    return list_dict

#-------------------------Liste vide ou non---------------------------#

def list_empty(list):
    emptyList = []

    if list == emptyList:
        return True
    else:
        return False


@app.route("/dashboard",methods=["GET","POST"])
def getDashboard():
    
    if request.method == "GET":
        print(1)
        print(jsonify(response=1))
        return jsonify(response=1)
    
    
    if request.method == "POST":
        print(2)
        received_data = request.get_json()
        message = received_data['data']
        print(message)
        
        return_data = recommendationClean(message)
        print("return_data :",return_data)
        return Response(response=json.dumps(return_data), status=201)

def allRecomendation(idUser):
    client = pymongo.MongoClient("mongodb://localhost:27017/") 
    db = client["test"] 
    df = creationDf([458,8558,9447,13404,16746],0,db)
    sig = give_sig(df)
    rec = give_rec(13404,sig,df)
    rec = [rec.iloc[x] for x in range(5)]
    x = give_Dic([458,8558,9447,13404,16746], df)
    print("x :",x)
    return x


def recommendationClean(idUser):
    client = pymongo.MongoClient("mongodb://localhost:27017/") 
    print(1)
    db = client["test"]
    print(1)
    listL = listLike(db,idUser)
    print(1)
    listD = listDislike(db,idUser)
    print(1)
    # recommender uniquement les 5 derniers likes
    #df = creationDf(listL, idUser, db)
    
    if(len(listL) == 0):
        return creationDfV(idUser, db).to_dict # transformer en dictionnaire
    
    
    
    
    ListArec = listL[-5:]
    print(1)
    df = creationDf(ListArec,listL,listD,idUser,db)
    print(1)
    sig = give_sig(df)
    return give_Dic(most_frequent(like_to_rec(ListArec,sig,df)),df)
    
    

if __name__ == "__main__":
    app.run("localhost", 6969)
    



