from flask import Blueprint, render_template
import random

views = Blueprint(__name__, "views")

@views.route("/")
def home():
    return render_template('index.html', a=a(), b=b(), c=c(), d=d(), e=e(), f=f(), g=g(), h=h(), i=i(), j=j(), k=k(), l=l(),)

@views.route("/typing")
def typing():
    return render_template('typing.html')

def a():
    return random.choice([
        "apple", "orange", "garbage", "folder", "cry", "cheese", "gorilla", "kitten", 
        "mountain", "river", "pencil", "dragon", "spaceship", "cloud", "tiger", "guitar", 
        "butterfly", "sunshine", "laptop", "pizza", "wizard", "bicycle", "ocean", "castle", 
        "robot", "moon", "penguin", "jungle", "diamond", "carrot", "volcano", "whale", "zebra"
    ])

def b():
    return random.choice([
        "develop", "It", "should", "shoulders", "arms", "chest", "nack", "if", "oh yea", 
        "legs", "knees", "elbows", "hands", "head", "toes", "ankles", "hips", "eyes", "ears"
    ])

def c():
    return random.choice([
        "fish", "compare", "indian", "Norwegian", "english", "french", "swedish", "malyan", 
        "german", "chinese", "japanese", "spanish", "portuguese", "korean", "russian", 
        "brazilian", "dutch", "greek"
    ])

def d():
    return random.choice([
        "will", "why", "but", "ore", "try", "only", "when", "time", "at", "nor", 
        "and", "though", "where", "if", "whether", "while", "before", "after"
    ])

def e():
    return random.choice([
        "sometime", "maybe", "its", "red", "black", "blue", "orange", "yellow", 
        "green", "purple", "white", "pink", "grey", "silver", "gold", "brown", "violet"
    ])

def f():
    return random.choice([
        "drill", "dop", "deep", "dracula", "drift", "drit", "drop", "dream", "drive", 
        "dance", "draw", "dig", "deliver", "demand", "deny", "destroy", "design"
    ])

def g():
    return random.choice([
        "hole", "hollow", "honey", "honeybee", "hippo", "hollowed", "heart", "helmet", 
        "house", "hamster", "hat", "hill", "holiday", "hope", "horizon", "horn", "hospital"
    ])

def h():
    return random.choice([
        "is", "are", "have", "has", "were", "was", "had", "have", "is", "are", 
        "seems", "looks", "appears", "becomes", "remains", "feels", "turns"
    ])

def i():
    return random.choice([
        "better", "worse", "more", "less", "more", "less", "even", "fewer", 
        "stronger", "weaker", "greater", "smaller", "taller", "lower", "higher", "deeper"
    ])

def j():
    return random.choice([
        "than", "but", "or", "and", "but", "or", "and", "nor", "not", "or", 
        "yet", "for", "so", "still", "besides", "either", "neither", "however"
    ])

def k():
    return random.choice([
        "so", "then", "because", "as", "as", "as", "than", "since", "until", "while", 
        "although", "though", "if", "unless", "before", "after", "when", "whenever"
    ])

def l():
    return random.choice([
        "it", "that", "these", "these", "these", "these", "this", "that", "these", "these", 
        "those", "such", "another", "anything", "everything", "nothing", "something"
    ])