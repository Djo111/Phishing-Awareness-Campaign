from flask import Flask, request, jsonify
from flask_cors import CORS
import openai


app = Flask(__name__)
CORS(app)

# Configure OpenAI API key
openai.api_key = "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"

@app.route('/process-text', methods=['POST'])


def process_text():
    data = request.json
    print(data)
    prompt=data.get('prompt_text')
    posts=data.get('input_text')
    # Call the OpenAI API
    def get_completion(prompt, model="gpt-3.5-turbo"):
        messages = [{"role": "user", "content": prompt}]
        response = openai.ChatCompletion.create(
            model=model,
            messages=messages,
            temperature=0, # this is the degree of randomness of the model's output
        )
        return response.choices[0].message["content"]
    
    
    #print(prompt)

    input= f"""
Act like a cyber security engineer.

I will provide you with posts from a LinkedIn account delimited by triple backtick.and if their is no posts return "no posts provided".

{prompt}

 write the scenarios in the following format:

Scenario 1 - ...
Scenario 2 - …
…
Scenario N - …

and provide how to acheive the scenarios in the following format:

Scenario 1 prerequisites- ...
Scenario 2 prerequisites- …
…
Scenario N prerequisites- …

Psts:```{posts}```
"""
    response = get_completion(input)
    #print(response)

    

    return jsonify({'output': response})

if __name__ == '__main__':
    app.run(debug=True)
