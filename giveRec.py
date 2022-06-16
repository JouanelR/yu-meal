from sklearn.metrics.pairwise import sigmoid_kernel
from sklearn.feature_extraction.text import TfidfVectorizer

def give_sig(df_to_sig):

    tfv = TfidfVectorizer(min_df=3, max_features=None, strip_accents = 'unicode', analyzer = 'word', token_pattern=r'\w{1,}', ngram_range=(1,3), stop_words = 'english')
    tfv_matrix = tfv.fit_transform(df_to_sig['ingredients'])
    sig = sigmoid_kernel(tfv_matrix,tfv_matrix, gamma=.5)
    return sig

def give_rec(df_to_rec, recipe_id, sig):

    idx = df_to_rec[id][recipe_id]

    sig_scores = list(enumerate(sig[idx]))
    sig_scores = sorted(sig_scores, key=lambda x: x[1], reverse=True)
    sig_scores = sig_scores[1,21]

    recipe_indices = [i[0] for i in sig_scores]

    return df_to_rec[id].iloc[recipe_indices]
