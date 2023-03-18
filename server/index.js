const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
require("dotenv").config();
//Middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get(["/add/item", "/add/location", "/settings"], function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}
app.use(express.static(path.join(__dirname, "../client/build")));
app.get(["/add/item", "/add/location", "/settings"], function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
//create item
app.post("/api/items", async (req, res) => {
  try {
    const barcode = req.body.barcode;
    const product_name = req.body.product_name;
    const items = req.body.items;
    const newProduct = await pool.query(
      "INSERT INTO products (barcode, product_name, items) VALUES($1,$2,$3) RETURNING *",
      [barcode, product_name, items]
    );
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all items
app.get("/api/items", async (req, res) => {
  try {
    const allProducts = await pool.query("SELECT * FROM products");
    res.json(allProducts.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get an item
app.get("/api/items/id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [id]
    );

    res.json(product.rows[0]);
  } catch (error) {}
});

//update an item
app.put("/api/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const barcode = req.body.barcode;
    const items = req.body.items;
    const updateProduct = await pool.query(
      "UPDATE products SET barcode = $1, items = $2 WHERE product_id = $3",
      [barcode, items, id]
    );

    res.json("Product was updated!");
  } catch (error) {
    console.error(error);
  }
});

//delete an item
app.delete("/api/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await pool.query(
      "DELETE FROM products WHERE product_id = $1",
      [id]
    );

    res.json("Product was deleted.");
  } catch (error) {
    console.error(error);
  }
});

//locations
//create location
app.post("/api/locations", async (req, res) => {
  try {
    const location_name = req.body.location_name;
    const location_materials = req.body.location_materials;

    const newLocation = await pool.query(
      "INSERT INTO locations (location_name, location_materials) VALUES($1,$2) RETURNING *",
      [location_name, location_materials]
    );
    res.json(newLocation.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all locations
app.get("/api/locations", async (req, res) => {
  try {
    const allLocations = await pool.query("SELECT * FROM locations");
    res.json(allLocations.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a location
app.get("/api/locations/id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const location = await pool.query(
      "SELECT * FROM locations WHERE location_id = $1",
      [id]
    );

    res.json(location.rows[0]);
  } catch (error) {}
});

//update a location
app.put("/api/locations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const location_name = req.body.location_name;
    const location_materials = req.body.location_materials;
    const updateLocation = await pool.query(
      "UPDATE locations SET location_name = $1, location_materials = $2 WHERE location_id = $3",
      [location_name, location_materials, id]
    );

    res.json("Location was updated!");
  } catch (error) {
    console.error(error);
  }
});

//delete a location
app.delete("/api/locations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await pool.query(
      "DELETE FROM locations WHERE location_id = $1",
      [id]
    );

    res.json("Location was deleted.");
  } catch (error) {
    console.error(error);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
