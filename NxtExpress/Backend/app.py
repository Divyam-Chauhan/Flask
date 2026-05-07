from flask import Flask 
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

products = [

    
]

@app.route('api/products')
def get_products():
    return products

app.run(debug=true)