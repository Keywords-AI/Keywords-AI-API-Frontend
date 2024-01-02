import requests

stream = True
def demo_call(input, 
              model="gpt-4" ,
              token="PWNDsf0Z.03HQNA3wHh0Jsau0XGPgUcu4CGpwT4xd", 
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

    response = requests.post('https://api.keywordsai.co/api/generate/', headers=headers, json=data, stream=stream)
    return response

messages = "Say 'Hello World'"
if __name__ == "__main__":
    if stream:
        print(demo_call(messages))
    else:
        print(demo_call(messages).json())

# admintestpassword