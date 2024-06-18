/* eslint-disable */
import React, { useState, useEffect } from "react";
const img =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAL0AygMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAABAUGAwIB/8QAPRAAAQMCAQgGCQMEAgMAAAAAAQACAwQRBRIVITFBU5LRNFJxc5GxExQyQlFhgcHhIqGiNWJj8CNDM3Lx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDeIiIoiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiaNq9sjfMQIml52ZAug8IrCHCamSxeGxt25R0/sp0OD07bGVz5D8L2CCiAJNgLn5KVDhtTNYsjyR8Xmy0MUEcItGxrOwLo7QCSbDtsoKiHBgB/zTEn4M0Lhi1FHTtifECGnQdN9Oz7q5ZPFLIY2SMc8DSGlccTiE1E8e8P1t7QqM2viXJuTrRAREQEREBERAREQEREBF9FydGv5KTDh1VPYtjyR8XmyCKh1a7K5hwUaPTS3PwYFPgoaaGxjhAI946T+6DOw0s81hFE519tvup0ODSut6aRrBtA/UVeCw0DwXGaqgp7+kla35X+yg4Q4XTR2Lo8tw2v0qYxoa2zAABsAVXNjEbbiKNz/mf0hQZ8UqZLhr8hp2N0KjQPkZC0l7gwf3GyhTYtTx6Iy6Q/2jmqB7nOdd5JJ2kr4gsp8YqHXETGMHZcqDLPLKbySOcfmVzRBKwyUw1zD7rv0O+q0pAtYarFZC5GkawtXBIJoI5RqcAT/vagzNRH6GeWLqOtyXJWeOxZFU2TeD9xr+yrEBERAREQEXprS5wa3WdAVlDgsxN5pGsG0NF0FXo2my9sjfM4CNpcdlgtBDhdNFYuj9I4bX8lMYxrW5LGBo+AFkFBDhNVJYyhsY/uPJTYcHp22Mr3vPbYKwfJHGCXvDQPibKFNitPHoa50h/tHNQS4YI4dEcbW9gXU2A06lRTYzO64hYxn0uVBlnmmN5ZHO7SqNBPiNLBfKkyj8GC6gTY0dPoYrD4vKqUQSJ66plvlzOsdjdHkuBtrAFzrXxEBemMdI4MY0ucdQC8q4wCFtpJzpN8lp+G0/ZB8hwYlg9NNkv+DW/deajBntGVBIH291w0lXaa0GQIIc64sRrXxWeOQtZOyRv/YNPaFWIPqvcClyqV0e7P7HV91RWup2CS5FZk7xpHhpQWOMxZdHl7twPjoVAQtZI0SROYdTgQso9hY4sPtNNig8oiICIiD6DYgrVUsnp4I5euAVlVeYFLl0ro92f2Or7qDtiNcaMMAjLy6+m9gLKubXVdZO2GKVseVfVo+etTsZiMlFlj3HA/b7qswkDOMX1t4FUd34RVON3yxuJ2lx5Lzmao60XieSvjqXD1yluf8Ami4ggqMzVHWi8TyTM1R1ovE8lb+t02/i4wnrdNv4uMIKjM1R1ovE8kzNUdaLxPJW/rdNv4uMJ63Tb+LjCCozNUdaLxPJMzVHWi8TyVv63Tb+LjCet02/i4wgqMzVHXiH1PJWOGUstJG+OUtIJuMk/wC/ALt63Tb+LjCet02/i4woO6Lh63Tb+LjCet02/i4wgi4lRS1ZjLCwNaPevrKhZmqOtF4nkrf1um38XGE9bpt/FxhUVGZqjrReJ5L1FhNTHI17XxXaQdZ5K19bpt/FxhPW6bfxcYUHc7dFrbVT1mFSTVMkkT2BrrGxvr/26sfW6bfxcYX1tVTk2E0ZJ0aHXKCnGDVF9DovE8lXvZkPc22lpsStcRa1h2rKVXS5+8d5qjkiIgWup+DShlaGn/saR4aVAXqNxZI17faaQQg1j2iSNzHew4EFZ7DGFmJxsf7TS4HwK0MbhI1rmey4AhVTovRY6w7JLuHgfuoLYawsgNQWvGsLIDUFQREQEREBERAREQERfQLm3xQfEVvS4OHMD6l5BPuDZ2rvLg9ORZhex2wk/hBQou1VTyUsvo5W2Ox3WXFAXeh6ZB3jfNcF3oemQd43zQakrKVXS5+8d5rVlZSq6XP3jvNByREQEKIg0WDy+lomt2xnJP2+y7TxZdTTzbWEj6EFVeBS5E74tjxf6j/6rw6lB8GsLIDUFrxrCyA1BUF97fFfF3pIDPUMiHvHT2bUFhRYa2ehypRkvebtd8Aq2ogkp5THKLEavn81qmgBoaB+kC3guVVTx1LDHI2+0O2hBlUUispJKSTJfpadThqP5UdARfRpIFiSTYALvVUktKW+maLEXBGrs7UEdT8FjEtdp9xpd9lAUvDKj1arY6Q2a8ZJ+qDSgk6fEIfkmvTs2IoK7G42voxJtYbj66FQK7xuoa2IU7dLibu+QVIqC70PTIO8b5rgu9D0yDvG+aDUlZSq6XP3jvNasrKVXS5+8d5oOSIiAiIg7UsvoKiOTY06exanZ8tiyGjatPh8vp6OKQ6wMk9o0fZQSBrCyA1Ba8awsgNQVH1XeBU+RE6d3tP0N7P98lT08RnmZEPeNvotVG0RsaxvstFh9FB6REQc5Y2SscyRuU06CFn66gfSOygMqI6j8PkVpF8e1rmlrgCDsKCgwam9NUeleLsj09p2K+ljZKxzJAHNOsFc6WnjpozHELNvfTpXZBQYhhjoLvgu+LWRtbzVcTf2iCNl1sFVV+FNkypKcBr9rNjuSog0+I1FOMkEPYNQfpsusuMTubaNjGE7dar3tdG8seCCNh0EFeUHp7nyPL5CS86ydJK8oiAu9D0yDvG+a4LvQ9Mg7xvmg1JWUqulz947zWrKylV0ufvHeaDkiIgIiICuMBl/TJDs9off7Kn0bVNwgluIRf3XB8CoNENYWQGoLYjWFjdJaLfBUXWBU+h9Q7X7LfurdcqZrY4I2s1BoXVQEREBERAREQEtdEQRayijq2nK/S8ey8DzWfqKeSlkLJW2J1HrLVdi5zQx1EZZM27dqoyaKbXYe+lJc05cWx20dvNQ0Hxd6HpkHeN81wXeh6ZB3jfNQakrKVXS5+8d5rVlZSq6XP3jvNUckREBERAUzCf6hF9fIqGpmE/1CL6+RUGjGsLIDUFrxrCyHujsVGtg/wDCz/0C9qiZjEjWBohZYADSTpXrPcm4Z4lQXaKlz3JuG8RTPb9sDeMoLpFS57duG8Z5L7nt24bx/hBcoqbPbtwOP8Jns7YP5/hBcoqbPf8Ag/n+F9z3/g/n+EFwip89/wCD+f4TPfxg/n+EFwbEWOpU2IYTrkpRa+kx8uS9Z7buHcf4TPbdsB4xyVFObhxBGka/ku1D0yDvG+a7VtVBU/qEBZJ1sq9+3QuVF0yDvG+ag1BWUqulz947zWrKylV0ufvHeao5IiICIiApmEf1GL6+RUNd6Of1apZKW5WTfRe2yyDUnQCTqsoOaaPqO168sqPntu4dxjkme27h3GOSgkZppOq7jKZppOq7jKj57buHcY5Jntu4dxjkgkZppOq7jKZppOq7jKj57buHcY5Jntu4dxjkgkZppOq7jKZppOq7jKj57buHcY5Jntu4dxjkgkZppOq7jKZppOq7jKj57buHcY5Jntu4dxjkgkZppOq7jKZppOq7jKj57buHcY5Jntu4dxjkgkZppOq7jKZppOq7jKj57buHcY5Jntu4dxjkgkZppOq7jKZppOq7jKj57buHcY5Jntu4dxjkgkZppOq7jK9Mw2lie2QNILTcfqJUXPbdw7jHJM9t3DuMckFt8brKVXS5+8d5q1z2NkB4xyVPI/0kjn6rkm1/jpVHlERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf/9k=";
const mockApi = "https://fakestoreapi.com/products"; // Mock API URL

// Products.js

const Products = ({ products, addToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="shadow-md rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-medium">{product.name}</h3>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <span className="text-gray-900 font-bold">${product.price}</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4 mt-2"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Cart.js

const Cart = ({ cart, removeFromCart, updateCartQuantity }) => {
  return (
    <div className="shadow-md rounded-lg mt-8">
      <h2 className="text-lg font-medium p-4 border-b">Your Cart</h2>
      {cart.length === 0 && (
        <p className="px-4 py-2 text-gray-700">Your cart is currently empty.</p>
      )}
      {cart.map((item) => (
        <div key={item.id} className="flex items-center p-4 border-b">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 mr-4 object-cover rounded-full"
          />
          <div className="flex-grow">
            <p className="text-lg font-medium">{item.name}</p>
            <span className="text-gray-700 mb-2">
              Quantity: {item.quantity} (Update below)
            </span>
            <div className="flex items-center mt-2">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded-md mr-2"
                onClick={() => updateCartQuantity(item, item.quantity - 1)}
              >
                -
              </button>
              <input
                type="number"
                className="w-16 text-center border rounded-md px-2 py-1"
                value={item.quantity}
                onChange={(e) =>
                  updateCartQuantity(item, parseInt(e.target.value))
                }
              />
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded-md ml-2"
                onClick={() => updateCartQuantity(item, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <button
            className="text-red-500 hover:text-red-700 font-bold ml-auto"
            onClick={() => removeFromCart(item)}
          >
            Remove
          </button>
        </div>
      ))}
      {cart.length > 0 && (
        <div className="flex justify-between p-4">
          <span className="text-gray-700">Subtotal:</span>
          <span className="font-bold">${calculateSubtotal(cart)}</span>
        </div>
      )}
    </div>
  );
};

// Helper function to calculate subtotal (replace with your logic)
const calculateSubtotal = (cart) => {
  let total = 0;
  cart.forEach((item) => (total += item.price * item.quantity));
  return total.toFixed(2);
};

// Checkout.js

const Checkout = ({ cart }) => {
  // Implement your checkout functionality here (payment processing, order confirmation, etc.)
  // For this example, we'll just display a summary

  return (
    <div className="shadow-md rounded-lg mt-8">
      <h2 className="text-lg font-medium p-4 border-b">Checkout</h2>
      <p className="px-4 py-2">
        You are about to checkout with the following items:
      </p>
      <ul className="list-disc list-inside px-4">
        {cart.map((item) => (
          <li key={item.id}>
            {item.quantity} x {item.name} - ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p className="px-4 py-2 font-bold">
        Subtotal: ${calculateSubtotal(cart)}
      </p>
      {/* Replace with your checkout buttons or form */}
      <button className="bg-green-500 hover:bg-green-700 cursor-pointer text-white font-bold py-2 px-4 rounded-full m-4 disabled:opacity-50">
        Place Order (Functionality not implemented yet)
      </button>
    </div>
  );
};

function ONE() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products (replace with your API call)
  useEffect(() => {
    // fetch("https://example.com/api/products") // Replace with your API endpoint
    //   .then((response) => response.json())
    //   .then((data) => setProducts(data));
    setProducts([
      {
        id: 1,
        image: img,
        quantity: 100,
        name: "Awesome T-Shirt",
        description:
          "A super comfortable and stylish t-shirt made from high-quality cotton.",
        price: 19.99,
      },
      {
        id: 2,
        image: img,
        quantity: 50,
        name: "Travel Mug",
        description:
          "This sleek and insulated mug keeps your drinks hot or cold for hours.",
        price: 24.95,
      },
      {
        id: 4,
        image: img,
        quantity: 25,
        name: "Wireless Headphones",
        description:
          "Enjoy crystal-clear audio with these comfortable wireless headphones.",
        price: 79.99,
      },
      {
        id: 5,
        image: img,
        quantity: 15,
        name: "Cozy Blanket",
        description: "Snuggle up with this ultra-soft and warm blanket.",
        price: 39.99,
      },
    ]);
  }, []);

  // Add to cart functionality
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remove from cart functionality
  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  // Update cart quantity functionality (optional)
  const updateCartQuantity = (product, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Products products={products} addToCart={addToCart} />
      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        updateCartQuantity={updateCartQuantity}
      />
      {cart.length > 0 && <Checkout cart={cart} />}
    </div>
  );
}

function TWO() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch products from a dummy API (simulated here)
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Simulating API call to fetch products
      //   const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10');
      //   const data = await response.json();
      //   setProducts(data);
      setProducts([
        {
          id: 1,
          url: img,
          title: "Awesome T-Shirt",
          price: 19.99,
        },
        {
          id: 2,
          url: img,
          title: "Travel Mug",
          price: 24.95,
        },
        {
          id: 4,
          url: img,
          title: "Wireless Headphones",
          price: 79.99,
        },
        {
          id: 5,
          url: img,
          title: "Cozy Blanket",
          price: 39.99,
        },
      ]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      const newCartItem = { ...product, quantity: 1 };
      setCart([...cart, newCartItem]);
    }

    updateCartTotal();
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    updateCartTotal();
  };

  const updateCartTotal = () => {
    const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPriceValue = cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setTotalItems(totalItemsCount);
    setTotalPrice(totalPriceValue);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        E-commerce Store
      </h1>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 rounded-lg p-4 shadow-lg"
          >
            <img
              src={product.url}
              alt={product.title}
              className="rounded-md mb-4 w-full"
            />
            <h2 className="text-xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-2">${product.price}</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Shopping Cart */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border border-gray-300 rounded-lg p-4 mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="rounded-md mr-4"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-gray-700">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 font-bold focus:outline-none"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">Total:</p>
              <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-center mt-4">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Checkout ({totalItems} {totalItems === 1 ? "item" : "items"})
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("");
  const [page] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(`${mockApi}?limit=${itemsPerPage}&page=${page}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, [page]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const checkout = () => {
    alert("Proceeding to checkout");
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <TWO />
      <hr/>
      <br/>
      <hr/>
      <br/>
      <hr/>
      <ONE />
      <hr/>
      <br/>
      <hr/>
      <br/>
      <hr/>
      <div className="container mx-auto my-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          E-commerce Store
        </h1>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-xl py-2 px-3 mb-4"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded-lg p-6"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full mb-4"
              />
              <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
              <p className="text-gray-700 mb-4">${product.price}</p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
          <div className="border border-gray-300 rounded-lg p-6">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between mb-4">
                <span>{item.title}</span>
                <span>${item.price}</span>
              </div>
            ))}
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={checkout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
