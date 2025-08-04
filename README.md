# Cryptoexchange

This is a minimal demonstration of a crypto exchange-like service with an admin panel.

Features:
- Users can deposit funds, withdraw funds, and transfer funds to other users.
- Each operation applies a commission that is credited to the admin account.
- Admin panel endpoint `/admin/summary` shows all user balances and total commission collected.

## Setup

```bash
pip install -r requirements.txt
```

## Running the app

```bash
python app.py
```

The application exposes HTTP endpoints and runs on `http://localhost:5000` by default.

## Running tests

```bash
pytest
```
