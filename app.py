from flask import Flask,request

app = Flask(__name__)

products = [
   {"id": 1, "name": "Chopping Board", "price": 360},
   {"id": 2, "name": "Sketch Pens", "price": 30},
   {"id": 3, "name": "Shoes", "price": 519}
]

## Route to get all products
@app.route('/products', methods=['GET'])
def get_products():
  return products

## Route to get all products
@app.route('/products/<product_id>', methods=['GET'])
def get_product(product_id):
  product_id = int(product_id)
  for product in products:
    if product['id'] == product_id:
      return product
    
  # Return an error if the product is not found
  return {"error": "Product not found"}, 404

# ... (previous code remains the same)

# Route to add a new product
@app.route('/products', methods=['POST'])
def add_product():
   new_product = request.get_json()
   
   # Generate a new ID (in a real app, a database would handle this)
   new_product['id'] = len(products) + 1
   products.append(new_product)
   
   return {"message": "Product added!", "product": new_product}, 201

# ... (app.run remains the same)

if __name__ == '__main__':
    app.run(debug=True)