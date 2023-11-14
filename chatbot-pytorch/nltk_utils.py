import nltk
import numpy as np
from nltk.stem.porter import PorterStemmer
stemmer = PorterStemmer()


def tokenize(setence):
    return nltk.word_tokenize(setence)


def stem(word):
    return stemmer.stem(word.lower())


def bag_of_words(tokenized_setence, all_words):
    tokenized_setence = [stem(w) for w in tokenized_setence]
    bag = np.zeros(len(all_words), dtype=np.float32)
    for index, w in enumerate(all_words):
        if w in tokenized_setence:
            bag[index] = 1.0
    return bag
