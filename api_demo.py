import requests
import json
import openai

client = openai.OpenAI()

# def demo_call(input, token="R2iZMDRj.r0vZMKKEV40PBR0nPsIrm9O6xJQaqwnd", stream=False):
#     headers = {
#         'Content-Type': 'application/json',
#         'Authorization': f'Api-Key {token}',
#         # 'Authorization': f'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNDk3MTQ0LCJpYXQiOjE3MDI4OTIzNDQsImp0aSI6ImZkNjg3MzE5Mzg0ZDQ2OTM5NDFhMzA1MjA5MjBiZmI0IiwidXNlcl9pZCI6MX0.v-GpNJa8vwyvnzXI9PLBhfUuBYit4b4cfpo0ONZq57I',
#     }

#     data = {
#         'messages': [{'role': 'user', 'content': input}],
#         "stream": stream,
#     }

#     response = requests.post('https://platform.keywordsai.co/api/generate/', headers=headers, json=data, stream=stream)
#     # response = requests.post('http://localhost:8000/api/generate/', headers=headers, json=data)
#     # response = requests.post('http://localhost:8000/api/generate/', headers=headers, json=data, stream=stream)
#     return response

# def chat_formatter(role, text):
#     return f"{role}: {text}\n\n"

# def gpt_4_call(text):
#     response = client.chat.completions.create(model = "gpt-4-0613",
#     messages = [{"role": "user", "content": text}])
#     return response

# import sys
# import json
# if __name__ == "__main__":
#     if len(sys.argv) >= 2:
#         stream = sys.argv[1] == "stream"
#     else:
#         stream = False
#     prompt = ""
#     while True:
#         question = input("Enter a message: ")
#         prompt += chat_formatter("Human", question)
#         response = demo_call(prompt, stream=stream)
#         try:
#             if stream:
#                 print("stream")
#                 try:
#                     prompt_text = ""
#                     print(str(response))
#                     for chunk in response.iter_content(chunk_size=256):
#                         if chunk:
#                             chunk = json.loads(chunk.decode("utf-8"))
#                             text_piece = chunk["choices"][0]["delta"].get("content", "")
#                             prompt_text += text_piece
#                             print(text_piece, end="")

#                     prompt += chat_formatter("AI", prompt_text)
#                     print(prompt)
#                 except Exception as e:
#                     print(e)
#                     print(response)
#             else:
#                 try:
#                     response = response.json()
#                     prompt += chat_formatter("AI", response["choices"][0]["message"]["content"])
#                     print(prompt)
#                     print(response)
#                 except Exception as e:
#                     print(response)
#         except Exception as e:
#             print("Session expired.", e)
#             break


openai.base_url = "https://platform.keywordsai.co/api/generate/"
openai.api_key = "R2iZMDRj.r0vZMKKEV40PBR0nPsIrm9O6xJQaqwnd"
print(client.chat.completions.create(model = "gpt-4-0613", messages = [{"role": "user", "content": "Hello, my name is"}]))