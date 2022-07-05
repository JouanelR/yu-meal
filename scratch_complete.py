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
    mycol = db["likes"]
    likes = mycol.find()
    listL = []
    for i in likes:
        if i["id_user"] == userid:
            listL.append(i["id_recette"])
    listL = list(set(listL))
    return listL


def listDislike(db,userid):
    mycol = db["dislikes"]
    dislikes = mycol.find()
    listD = []
    for i in dislikes:
        if i["id_user"] == userid:
            listD.append(i["id_recette"])
    listD = list(set(listD))
    return listD

def cleanDf(df,userid,db):
    
    
    mask = (df['tags'].str.contains('dietary', case=False, na=False)) 
    df = df[mask]
    
    #------------------ recuperer les info nutrition de l'utilisateur dans la bdd -----------------------#
    mycol = db["users"]
    
    #x = mycol.find() 
  
    #for data in x: 
        #   if (data["_id"] == userids)
    
    user = mycol.find_one(ObjectId(userid["userid"])) 
    print("user:",user)
    
            
    #------------------ netoyer le dataframe -------------------------#
    """if(user["vegan"]):
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
        df = df[mask]"""
    
    return df

def creationDfV(userid,db):
    df = pd.read_csv("RAW_recipes_images.csv")
    #supprimer colones inutiles
    #df = df.drop(columns=['contributor_id','n_steps',"contributor_id","submitted","description"])
        
    df_clean = cleanDf(df,userid,db)
    
    
    df_sample = df_clean.sample(n = 5)
    
    return df_sample


def creationDf(listL,listD,userid,db):
    df = pd.read_csv("RAW_recipes_images.csv")
    #supprimer colones inutiles
    #df = df.drop(columns=['contributor_id','n_steps',"contributor_id","submitted","description"])
    
    
    df_clean = cleanDf(df,userid,db)
    print(df_clean.shape)
    df_sample = df_clean.sample(n = 200)
    
    #------------------ verifier que les id des recettes a appliquer la recommandation sont bien dans df_sample-----#
    
    for i in listL[-5:]:
        mask = df_sample['id'] == i
        dff = df_sample[mask]
        if dff.shape[0] == 0:
            #df_sample.append(df[ df["id"] == i ] , ignore_index=True)
            print(i)
            df_sample = pd.concat([df_sample,df[df['id'] == i]],ignore_index=True)
            
    
    print(df_sample[ df_sample['id'] == 38 ])
    print("fin fdp")
    #print(df[ df["id"] == 38 ])      
            
            
    
    #------------------ verifier que les id des recettes dislike ne sont pas dans df_sample-----#
    
    """
    df_sample.drop(df_sample[ df_sample['id'] in listD ].index , inplace=True)
    if(len(listL)>5):
        df_sample.drop(df_sample[ df_sample['id'] in listL[:-5] ].index , inplace=True) 
    
    print(16)"""
    return df_sample
        
        
def creationDfTest(listL):
    df = pd.read_csv("RAW_recipes_images.csv")
    #supprimer colones inutiles
    #df = df.drop(columns=['contributor_id','n_steps',"contributor_id","submitted","description"])
    
    
    print(11)
    df_sample = df.sample(n = 200)
    
    #------------------ verifier que les id des recettes a appliquer la recommandation sont bien dans df_sample-----#
    
    print("la fonction de fdp")
    for i in listL[-5:]:
        mask = df_sample['id'] == i
        dff = df_sample[mask]
        if dff.shape[0] == 0:
            #df_sample.append(df[ df["id"] == i ] , ignore_index=True)
            print(type(i),i)
            df_sample = pd.concat([df_sample,df[df['id'] == int(i)]],ignore_index=True)
            
    
    print(df_sample[ df_sample['id'] == 38 ])
    print("fin fdp")
    #print(df[ df["id"] == 38 ])      
            
            
    
    #------------------ verifier que les id des recettes dislike ne sont pas dans df_sample-----#
    
    """
    df_sample.drop(df_sample[ df_sample['id'] in listD ].index , inplace=True)
    if(len(listL)>5):
        df_sample.drop(df_sample[ df_sample['id'] in listL[:-5] ].index , inplace=True) 
    
    print(16)"""
    return df_sample        
        
#-------------------------- creation tfv + sig --------------------------#
    
def give_sig(df_sample):    
    tfv = TfidfVectorizer(min_df=3, max_features=None, strip_accents = 'unicode', analyzer = 'word', token_pattern=r'\w{1,}', ngram_range=(1,3), stop_words = 'english')

    tfv_matrix = tfv.fit_transform(df_sample['ingredients'])

    
    
    sig = sigmoid_kernel(tfv_matrix,tfv_matrix, gamma=.5)
    
    return sig
    
    
    
#-------------------------- recommandation --------------------------#
    
def give_rec(recipe_id, sig, df_sample):
    
    idx = df_sample.index[df_sample["id"] == int(recipe_id)].tolist()
    
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
        list_dict.extend(df[df['id']==int(i)].to_dict('records'))

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



@app.route("/favoris",methods=["GET","POST"])
def getLike():   
    if request.method == "GET":
        print(1)
        print(jsonify(response=1))
        return jsonify(response=1)
    
    
    if request.method == "POST":
        received_data = request.get_json()
        message = received_data['data']
        message = message["userid"]
        print(message)
        
        return_data = recupLike(message)
        print("return_data : ",return_data)
        return Response(response=json.dumps(return_data), status=201)
    

def recupLike(userid):
    client = pymongo.MongoClient("mongodb://localhost:27017/") 
    db = client["test"]
    df = pd.read_csv("RAW_recipes_images.csv")
    listL = listLike(db, userid)
    listL 
    print("ici",listL)
    return give_Dic(listL,df)




def recommendationClean(idUser):
    iduser = idUser["userid"]
    client = pymongo.MongoClient("mongodb://localhost:27017/") 
    print(1)
    db = client["test"]
    print(2)
    listL = listLike(db,iduser)
    print(3)
    listD = listDislike(db,iduser)
    print(4)
    # recommender uniquement les 5 derniers likes
    #df = creationDf(listL, idUser, db)
    
    if(len(listL) == 0):
        return creationDfV(iduser, db).to_dict # transformer en dictionnaire
    
    
    
    
    print(51)
    df = creationDfTest(listL)
    print(52)
    
    sig = give_sig(df)
    print(6)
    
    var = give_Dic(most_frequent(like_to_rec(listL[-5:],sig,df)),df)
    print(var)
    return var
    
    

if __name__ == "__main__":
    app.run("localhost", 6969)
    #client = pymongo.MongoClient("mongodb://localhost:27017/") 
    #db = client["test"] 
    
    #X = (creationDf([38],[],123,db))
    #print(X[X["id"] == 38])




