import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import sigmoid_kernel
from sklearn.feature_extraction.text import TfidfVectorizer
import time
seconds = time.time()


df = pd.read_csv("Recipes Cleaned.csv")







tfv = TfidfVectorizer(min_df=3, max_features=None, strip_accents = 'unicode', analyzer = 'word', token_pattern=r'\w{1,}', ngram_range=(1,3), stop_words = 'english')
tfv_matrix = tfv.fit_transform(df['ingredients'])
print("Seconds since epoch =", seconds-time.time())

sig = sigmoid_kernel(tfv_matrix,tfv_matrix, gamma=.5)
print("Seconds since epoch =", seconds-time.time())
indices = pd.Series(df.index, index=df["name"]).drop_duplicates()

def give_rec(recipe_id, sig=sig):

    idx = indices[recipe_id]

    sig_scores = list(enumerate(sig[idx]))
    sig_scores = sorted(sig_scores, key=lambda x: x[1], reverse=True)
    sig_scores = sig_scores[1:21]

    recipe_indices = [i[0] for i in sig_scores]

    return df["name"].iloc[recipe_indices]




print(give_rec(5789))
print("Seconds since epoch give rec=", seconds-time.time())





#%%


