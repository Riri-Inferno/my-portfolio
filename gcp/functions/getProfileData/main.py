import functions_framework
import firebase_admin
from firebase_admin import firestore
from flask import jsonify
import os
import logging

# Firebase SDKの初期化
if not firebase_admin._apps:
    firebase_admin.initialize_app()

# 環境変数の取得
API_KEY = os.environ.get('API_KEY')
DATABASE_ID = os.environ.get('DATABASE_ID')
COLLECTION_NAME = os.environ.get('PROFILE_COLLECTION_NAME', 'profiles')
DOCUMENT_ID = os.environ.get('PROFILE_CREDENTIAL_DOCUMENT_ID', 'myProfile')

if not API_KEY:
    raise ValueError("Missing environment variable: API_KEY")
if not DATABASE_ID:
    raise ValueError("Missing environment variable: DATABASE_ID")

# Firestoreクライアントの初期化
db = firestore.Client(database=DATABASE_ID)

@functions_framework.http
def get_profile_data(request):
    """HTTP Cloud Function that retrieves data from Firestore."""
    
    # CORSヘッダーを設定
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Api-Key'
    }
    
    # OPTIONSリクエストの処理（プリフライト）
    if request.method == 'OPTIONS':
        return ('', 204, headers)

    # APIキー認証
    received_api_key = request.headers.get('X-Api-Key')
    if not received_api_key or received_api_key != API_KEY:
        return jsonify({'error': 'Unauthorized'}), 401, headers

    try:
        doc_ref = db.collection(COLLECTION_NAME).document(DOCUMENT_ID)
        doc = doc_ref.get()

        if doc.exists:
            return jsonify(doc.to_dict()), 200, headers
        else:
            return jsonify({'error': 'No such document!'}), 404, headers

    except Exception:
        logging.error("Error fetching Firestore document", exc_info=True)
        return jsonify({'error': 'Internal Server Error'}), 500, headers
