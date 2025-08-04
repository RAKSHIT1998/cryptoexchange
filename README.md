# CryptoExchange

This repository contains a simple demonstration of a crypto trading interface and API.

## Backend

The backend server (`backend/server.js`) is a Node.js Express app that exposes:

- `GET /api/markets` – list available trading pairs
- `POST /api/orders` – place a new limit order
- `GET /api/orders/open` – view open orders

Run the server:

```bash
node backend/server.js
```

## Frontend

A lightweight UI in `frontend/` lets users submit orders and view them in the browser. Open `frontend/index.html` in a browser while the backend is running.

## Python service

`app.py` provides deposit, withdraw and transfer endpoints with commission tracking. Tests cover this service:

```bash
pytest
```
