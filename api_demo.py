import requests

stream = True
local = False
def demo_call(input, 
              model="claude-2.1" ,
              token="qRwi5qOt.lzVeuAM04W0dNyilu82yIF064xXET7Yu", 
              stream=stream
              ):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Api-Key {token}',
    }

    data = {
        'model': model,
        'messages': [{'role': 'user', 'content': input}],
        "stream": stream,
    }
    if local:

        response = requests.post('http://localhost:8000/api/generate/', headers=headers, json=data, stream=stream)
    else:
        response = requests.post('https://api-test.keywordsai.co/api/generate/', headers=headers, json=data, stream=stream)
    return response

messages = "Say 'Hello World'"
if __name__ == "__main__":
    if stream:
        print(demo_call(messages))
    else:
        print(demo_call(messages).json())

# admintestpassword