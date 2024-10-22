from flask import Blueprint, render_template
import random
import time

views = Blueprint(__name__, "views")

@views.route("/")
def home():
    return render_template('index.html', a=a(), b=b(), c=c(), d=d(), e=e(), f=f(), g=g(), h=h(), i=i(), j=j(), k=k(), l=l(), timer=timer_countdown())

@views.route("/typing")
def typing():
    return render_template('typing.html')

@views.route("/timer")
def timer():
    countdown = 30
    while countdown >= 0:
        time.sleep(1)
        countdown -= 1
    return "Time is up!"

def a():
    return random.choice([
        "apple", "orange", "garbage", "folder", "cry", "cheese", "gorilla", "kitten", 
        "mountain", "river", "pencil", "dragon", "spaceship", "cloud", "tiger", "guitar", 
        "butterfly", "sunshine", "laptop", "pizza", "wizard", "bicycle", "ocean", "castle", 
        "robot", "moon", "penguin", "jungle", "diamond", "carrot", "volcano", "whale", "zebra"
    ])

def b():
    return random.choice([
        "develop", "it", "should", "shoulders", "arms", "chest", "nack", "if", "oh yea", 
        "legs", "knees", "elbows", "hands", "head", "toes", "ankles", "hips", "eyes", "ears", "boots", "butt",
    ])

def c():
    return random.choice([
        "fish", "compare", "black indian", "Norwegian", "english", "french", "swedish", "malyan", 
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
        "freak", "I hate", "kill", "black", "indian", "purple", "curry eater", "dead", "eat", "deepfry", "murder", "harm", 
        "slap", "fry", "not", "weak", "small", "thiny", "downfall of", "steal", "bark at", "knock out",
    ])

def f():
    return random.choice([
        "jasan drill", "jasan dop", "deep", "jasan dracula", "jasan drift", "jasan drit", "jasan drop", "jasan dream", "jasan drive", 
        "jasan dance", "jasan draw", "jasan dig", "jasan deliver", "jasan demand", "jasan deny", "jasan destroyer", "jasan design"
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
        "red", "black", "blue", "orange", "yellow", 
        "green", "purple", "white", "pink", "grey", "silver", "gold", "brown", "violet"
    ])

def k():
    return random.choice([
        "so", "then", "because", "as", "as", "as", "than", "since", "until", "while", 
        "although", "though", "if", "unless", "before", "after", "when", "whenever"
    ])

def l():
    return random.choice([
        "rare", "common", "uncommon", "legendary", "mytical", "star", "moon", "sun", "epic", "classified", 
        "corrupt", "divine", "ancor", "seen", "better", "gloryfied", "something"
    ])

def timer_countdown():
    countdown = 30
    while countdown >= 0:
        yield countdown
        time.sleep(1)
        countdown -= 1
