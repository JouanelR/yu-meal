import pandas as pd
import numpy as np

data = pd.read_csv("PP_recipes.csv")
df = pd.read_csv("RAW_recipes.csv")

data.shape
df.shape

df_merge = data.merge(df, on='id')

df_merge.head()




#%%


