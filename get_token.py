import time
import jwt
import requests
import os

# Get values from your environment
app_id = os.getenv("GITHUB_APP_ID")
install_id = os.getenv("GITHUB_INSTALLATION_ID")
key_path = os.getenv("GITHUB_APP_PRIVATE_KEY_PATH")

with open(key_path, 'r') as f:
    private_key = f.read()

payload = {
    'iat': int(time.time()),
    'exp': int(time.time()) + 600,
    'iss': app_id
}

encoded_jwt = jwt.encode(payload, private_key, algorithm='RS256')
headers = {'Authorization': f'Bearer {encoded_jwt}', 'Accept': 'application/vnd.github.v3+json'}
url = f'https://api.github.com/app/installations/{install_id}/access_tokens'
response = requests.post(url, headers=headers)
print(response.json()['token'])
