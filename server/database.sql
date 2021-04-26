CREATE DATABASE perntodo;

CREATE TABLE todolist(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE DATABASE recycleapp;

CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    barcode VARCHAR(13) UNIQUE,
    product_name VARCHAR(100) UNIQUE,
    items TEXT[],
    record_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE locations(
    product_id SERIAL PRIMARY KEY,
    location_name VARCHAR(50),
    location_materials TEXT[],
    record_date DATE DEFAULT CURRENT_DATE
);