from flask import Flask, request, jsonify

app = Flask(__name__)

users = {}
admin = {"commission": 0.0}

DEPOSIT_COMMISSION_RATE = 0.01
WITHDRAWAL_COMMISSION_RATE = 0.01
TRANSFER_COMMISSION_RATE = 0.01

def get_user(username: str):
    if username not in users:
        users[username] = {"balance": 0.0}
    return users[username]

def reset_state():
    users.clear()
    admin["commission"] = 0.0

@app.post("/deposit")
def deposit():
    data = request.get_json(force=True)
    user = get_user(data["user"])
    amount = float(data["amount"])
    commission = amount * DEPOSIT_COMMISSION_RATE
    user["balance"] += amount - commission
    admin["commission"] += commission
    return jsonify({"balance": user["balance"], "commission": commission})

@app.post("/withdraw")
def withdraw():
    data = request.get_json(force=True)
    user = get_user(data["user"])
    amount = float(data["amount"])
    commission = amount * WITHDRAWAL_COMMISSION_RATE
    total = amount + commission
    if user["balance"] < total:
        return jsonify({"error": "insufficient funds"}), 400
    user["balance"] -= total
    admin["commission"] += commission
    return jsonify({"balance": user["balance"], "commission": commission})

@app.post("/transfer")
def transfer():
    data = request.get_json(force=True)
    from_user = get_user(data["from"])
    to_user = get_user(data["to"])
    amount = float(data["amount"])
    commission = amount * TRANSFER_COMMISSION_RATE
    total = amount + commission
    if from_user["balance"] < total:
        return jsonify({"error": "insufficient funds"}), 400
    from_user["balance"] -= total
    to_user["balance"] += amount
    admin["commission"] += commission
    return jsonify({
        "from_balance": from_user["balance"],
        "to_balance": to_user["balance"],
        "commission": commission,
    })

@app.get("/admin/summary")
def admin_summary():
    return jsonify({"admin_commission": admin["commission"], "users": users})

if __name__ == "__main__":
    app.run(debug=True)
