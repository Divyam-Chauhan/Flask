# Divyam Chauhan | Store

A modern, premium e-commerce web application.

## Backend Architecture

The backend is built using Flask, a lightweight Python web framework. It handles product data management and serves it to the frontend via a REST API.

### Core Components (`NxtExpress/Backend/app.py`)

1. **Flask Application Initialization:**
   The backend initializes a simple Flask application instance:
   ```python
   app = Flask(__name__)
   ```

2. **CORS (Cross-Origin Resource Sharing):**
   ```python
   CORS(app)
   ```
   This is a critical security setting. Since the frontend is running on a different origin (e.g., loaded directly as a file or via a development server like Live Server), the browser would normally block it from requesting data from the backend. The `flask_cors` extension explicitly tells the browser that it is safe to accept data from our Flask API.

3. **Product Data:**
   The backend stores the products in a Python list of dictionaries. Each dictionary represents a product with an `id`, `name`, `price`, `description`, and `image` URL. In a production environment, this would typically be replaced by a database query, but for now, it acts as a reliable mock database.

4. **API Endpoint (`/products`):**
   ```python
   @app.route('/products')
   def get_products():
       return products
   ```
   This defines the main route for our application. When a GET request is made to `http://127.0.0.1:5000/products`, the server returns the entire list of products. Flask automatically converts the Python list and dictionaries into a JSON format that the frontend can easily read.

5. **Running the Server:**
   ```python
   app.run(debug=True)
   ```
   Starts the Flask server on the default port 5000. `debug=True` automatically restarts the server when code changes are detected and provides helpful error pages if something goes wrong.

## Frontend Integration

The frontend seamlessly requests this data using modern JavaScript.

### Fetching Data (`NxtExpress/Frontend/index.js`)

The bridge between the user interface and the backend is handled entirely by the `fetchProducts` function:

```javascript
async function fetchProducts() {
    try {
        const response = await fetch('http://127.0.0.1:5000/products');
        if (!response.ok) throw new Error('Failed to fetch');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.warn('Failed to fetch products:', error);
        renderProducts([]);
    }
}
```

**How it works:**
- It uses the asynchronous `fetch()` API to make an HTTP GET request to our Flask backend URL: `http://127.0.0.1:5000/products`.
- It awaits the response and checks if the network request was successful.
- Once the response is received, it extracts the JSON payload using `await response.json()`.
- The array of product objects is then passed into `renderProducts(products)`, which dynamically generates the HTML for each product card and injects it into the DOM.
- If the backend is offline or unreachable, the `catch` block intercepts the error, logs a warning, and gracefully falls back to rendering an empty grid so the site doesn't completely break.
