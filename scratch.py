import pandas as pd
import numpy as np

data = pd.read_csv("PP_recipes.csv")
df = pd.read_csv("RAW_recipes.csv")

data.shape
df.shape

df_merge = data.merge(df, on='id')


df_clean = df_merge.drop(columns=["i","name_tokens","ingredient_tokens","steps_tokens","techniques","ingredient_ids","contributor_id","submitted","steps","description"])

df_clean.head()
#test


#%%


