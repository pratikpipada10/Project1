import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [list, setList] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://s3.amazonaws.com/open-to-cors/assignment.json"
        );
        setList(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetch2 = () => {
      const productArray = Object.values(list); // Extract values from the list object
      setProducts(productArray);
    };

    fetch2();
  }, [list]);

  const sortedProducts = products
    .slice()
    .sort((a, b) => b.popularity - a.popularity);

  return (
    <div> 
      <h2 className="h2">Products Lists</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.popularity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
