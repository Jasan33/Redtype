from flask import Flask, render_template, request, redirect, session, url_for, flash
import random
from flask_mysqldb import MySQL
import MySQLdb.cursors
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")

# Configurations
app.config['MYSQL_HOST'] = os.getenv("HOST")
app.config['MYSQL_USER'] = os.getenv("USER")
app.config['MYSQL_PASSWORD'] = os.getenv("PASSWORD")
app.config['MYSQL_DB'] = os.getenv("DATABASE")

mysql = MySQL(app)

AES_KEY = os.getenv("AES_KEY")

@app.route("/")
def home():
    username = session.get('username', None)  # Get username if logged in, otherwise None
    words = select_words()  # Generates a list of words
    return render_template('index.html', words=words, username=username)


@app.route("/leaderboard")
def leaderboard():
    if 'username' not in session:
        flash("Please log in to access this page.")
        return redirect(url_for('login'))
    
    username = session['username']
    cur = mysql.connection.cursor()
    cur.execute("SELECT username, characters, total_words FROM user ORDER BY total_words DESC")
    people = cur.fetchall()
    cur.close()
    return render_template('leaderboard.html', people=people, username=username)

def select_words():
    # Select 45 words from category 'a'
    words = random.sample(word_categories['a'], 45)
    random.shuffle(words)  # Randome and Shuffled words are selected
    return words

# Word categories
word_categories = {
    'a': [
        "the", "develop", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for", "they", "much", "with", "as", "not", "on", "she",
        "at", "by", "this", "we", "you", "do", "but", "from", "or", "which", "one", "would", "all", "will", "there", "say", "who",
        "make", "when", "can", "more", "if", "no", "man", "out", "other", "so", "what", "time", "up", "go", "about", "than", "into",
        "could", "state", "only", "new", "year", "some", "take", "come", "these", "know", "see", "use", "get", "like", "then", "first",
        "any", "work", "now", "may", "such", "give", "over", "think", "most", "even", "find", "day", "also", "after", "way", "many",
        "must", "look", "before", "great", "back", "through", "long", "where", "much", "should", "well", "people", "down", "own", "just",
        "because", "good", "each", "those", "feel", "seem", "how", "high", "too", "place", "little", "world", "very", "still", "nation",
        "hand", "old", "life", "tell", "write", "become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop",
        "under", "last", "right", "move", "thing", "general", "school", "never", "same", "another", "begin", "while", "number", "part",
        "turn", "real", "leave", "might", "want", "point", "form", "off", "child", "few", "small", "since", "against", "ask", "late",
        "home", "interest", "large", "person", "end", "open", "public", "follow", "during", "present", "without", "again", "hold",
        "govern", "around", "possible", "head", "consider", "word", "program", "problem", "however", "lead", "system", "set", "order",
        "eye", "plan", "run", "keep", "face", "fact", "group", "play", "stand", "increase", "early", "course", "change", "help", "line"
    ]
}

@app.route("/update_total_words", methods=["POST"])
def update_total_words():
    if 'user_id' not in session:
        return {"error": "User not logged in"}, 401

    user_id = session['user_id']
    cur = mysql.connection.cursor()
    cur.execute("""
        UPDATE user 
        SET total_words = total_words + 1 
        WHERE id = %s
    """, (user_id,))
    mysql.connection.commit()
    cur.close()
    return {"success": True}

@app.route("/update_total_Characters", methods=["POST"])
def update_total_Characters():
    if 'user_id' not in session:
        return {"error": "User not logged in"}, 401

    data = request.get_json()
    if not data or 'characters' not in data:
        return {"error": "Invalid request data"}, 400

    user_id = session['user_id']
    characters = data['characters']

    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            UPDATE user
            SET characters = characters + %s
            WHERE id = %s
        """, (characters, user_id))
        mysql.connection.commit()
        cur.close()
        return {"success": True}
    except Exception as e:
        print(f"Error updating characters: {e}")
        return {"error": "Failed to update characters"}, 500


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        
        # Checks if the passwords match
        if password != confirm_password:
            flash("Passwords do not match. Please try again.")
            return render_template('register.html')

        # Add user to the redtype database
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO user (username, email, password)
            VALUES (%s, %s, AES_ENCRYPT(%s, %s))
        """, (username, email, password, AES_KEY))
        mysql.connection.commit()
        cur.close()
        
        flash("Registration successful! Please log in.")
        return redirect(url_for('login'))

    return render_template('register.html')



@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']

        cur = mysql.connection.cursor()
        cur.execute("""
            SELECT id, username, AES_DECRYPT(password, %s)
            FROM user
            WHERE username = %s
        """, (AES_KEY, username))
        user = cur.fetchone()
        cur.close()

        if user and user[2].decode('utf-8') == password:  # Decrypt and compare password
            session['user_id'] = user[0]
            session['username'] = user[1]  # Store username in session
            flash("Login successful!")
            return redirect(url_for('home'))
        else:
            flash("Invalid credentials. Please try again.")
    
    return render_template('login.html')

@app.route("/logout")
def logout():
    session.clear()  # Clear all session data
    flash("You have been logged out.")
    return redirect(url_for('home'))

@app.route("/about")
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)