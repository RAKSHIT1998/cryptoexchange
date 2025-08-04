import json
import pytest
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from app import app, users, admin, reset_state

@pytest.fixture(autouse=True)
def run_around_tests():
    reset_state()
    yield
    reset_state()

def test_deposit_commission():
    client = app.test_client()
    response = client.post("/deposit", json={"user": "alice", "amount": 100})
    assert response.status_code == 200
    assert users["alice"]["balance"] == pytest.approx(99.0)
    assert admin["commission"] == pytest.approx(1.0)

def test_withdraw_commission():
    client = app.test_client()
    client.post("/deposit", json={"user": "alice", "amount": 100})
    response = client.post("/withdraw", json={"user": "alice", "amount": 50})
    assert response.status_code == 200
    assert users["alice"]["balance"] == pytest.approx(48.5)
    assert admin["commission"] == pytest.approx(1.5)

def test_transfer_commission():
    client = app.test_client()
    client.post("/deposit", json={"user": "alice", "amount": 100})
    response = client.post("/transfer", json={"from": "alice", "to": "bob", "amount": 20})
    assert response.status_code == 200
    assert users["alice"]["balance"] == pytest.approx(78.8)
    assert users["bob"]["balance"] == pytest.approx(20.0)
    assert admin["commission"] == pytest.approx(1.2)
