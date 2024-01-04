import requests

stream = False
local = True
def demo_call(input, 
              model="gpt-4" ,
              token="WsbFn2aC.gWDu4UQAT2890RXSlhaV5LvtDcI37Bet", 
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
        response = requests.post('https://api.keywordsai.co/api/generate/', headers=headers, json=data, stream=stream)
    return response

messages = "Say 'Hello World'"
if __name__ == "__main__":
    if stream:
        print(demo_call(messages))
    else:
        print(demo_call(messages).json())

# admintestpassword