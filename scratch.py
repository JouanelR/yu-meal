import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import sigmoid_kernel
from sklearn.feature_extraction.text import TfidfVectorizer
import time
seconds = time.time()
data = pd.read_csv("PP_recipes.csv")
df = pd.read_csv("RAW_recipes.csv")


data.shape
df.shape

df_merge = data.merge(df, on='id')


df_clean = df_merge.drop(columns=["i","name_tokens","ingredient_tokens","steps_tokens","techniques","ingredient_ids","contributor_id","submitted","steps","description"])

df_2000 = df.head(10000) #echantillon de 20000 (pour l'instant) sinon trop lent
#enlever les id likés et non likés



tfv = TfidfVectorizer(min_df=3, max_features=None, strip_accents = 'unicode', analyzer = 'word', token_pattern=r'\w{1,}', ngram_range=(1,3), stop_words = 'english')
tfv_matrix = tfv.fit_transform(df_2000['ingredients'])
sig = sigmoid_kernel(tfv_matrix,tfv_matrix, gamma=.5)


def give_rec(recipe_id, sig=sig):

    idx = (df_2000.index[df["id"] == recipe_id]).tolist()
    print(idx[0])

    sig_scores = list(enumerate(sig[idx[0]]))
    sig_scores = sorted(sig_scores, key=lambda x: x[1], reverse=True)
    sig_scores = sig_scores[1,21]

    recipe_indices = [i[0] for i in sig_scores]

    return df_2000["id"].iloc[recipe_indices]



print("Seconds since epoch =", seconds-time.time())
print(give_rec(46))
print("Seconds since epoch give rec=", seconds-time.time())





#%%


