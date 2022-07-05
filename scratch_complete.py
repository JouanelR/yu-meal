import pandas as pd
from sklearn.metrics.pairwise import sigmoid_kernel
from sklearn.feature_extraction.text import TfidfVectorizer
#import pymongo
from collections import Counter
import time

def cleanDf(df,userid):
    #------------------ recuperer les info nutrition de l'utilisateur dans la bdd -------------------#
    #users = db["users"]
    #users = users.find_one()
    vegan = False # recuper info bdd
    vegetarian = False # recuper info bdd
    '''
    for i in users:
        print(i)
        if i == "_id" == userid:
            vegan = i["vegan"]
            vegetarien = i["vegetarian"]
         '''
            
    #------------------ netoyer le dataframe -------------------------#
    if(vegan):
        mask = (df['tags'].str.contains('dietary|vegan', case=False, na=False)) 
    elif(vegetarian):
        mask = (df['tags'].str.contains('dietary|vegetarian', case=False, na=False)) 

    else:
        mask = (df['tags'].str.contains('dietary', case=False, na=False)) 
        
    return df[mask]
    
    #allergenes = db["alllergenes"]
    #allergenes = allergenes.find_one()
    '''
    listAllergene = [] #recuper info bdd
    for i in allergenes:
        if i["user_id"] == userid:
            listAllergene.append(i["nutriment_id"])
            
    print('|'.join(listAllergene))
    mask = ((df['tags'].str.contains('|'.join(listAllergene),case=False, na=False)) & (df['ingredients'].str.contains('|'.join(listAllergene),case=False, na=False)))
    
    return df[mask]'''




def creationDf(listArecommander,userid):
    df = pd.read_csv("RAW_recipes_images.csv")
    
    #supprimer colones inutiles
    df = df.drop(columns=['contributor_id','n_steps',"contributor_id","submitted","description"])
    
    
    
    df_clean = cleanDf(df,userid)
    
    
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


#----------------------------Creation sigmoid-----------------------------#
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

def like_to_rec(listLikes):

    multiRec = []

    for i in listLikes:
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

if __name__ == '__main__' :
    temps = time.time()
    #client = pymongo.MongoClient("mongodb://localhost:27017/")
    #db = client["test"]
    df = creationDf([137739,49,9447,9071,9228,74583,91763,61621,94073,15588],0)
    sig = give_sig(df)
    print(temps-time.time())
    rec = give_rec(9447,sig,df)
    rec = [rec.iloc[x] for x in range(20)]
    print("rec")
    print(rec)

    #liste des indices likés
    listLikes = []
    print(list_empty(listLikes))
    multiRec = like_to_rec(listLikes)
    multiRec2 = [[12162, 4, 3], [1216, 95, 4, 58, 95, 3, 4, 4, 3]]
    #trouver les plus récurrents
    list_rec = most_frequent(multiRec2)
    print("liste rec", list_rec)
    '''print("Dict")
    x = give_Dic([137739,49,9447,9071,9228,74583,91763,61621,94073,15588], df)
    print("X = ",x)

    print("Image : ", x[2]["Images Solo"])'''
#%%
