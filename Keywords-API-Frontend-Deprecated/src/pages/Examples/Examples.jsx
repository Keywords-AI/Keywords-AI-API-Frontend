import React from "react";
import {
  Airplane,
  MedicalBag,
  Noodles,
  CodeBraces,
  Sprout,
  HeadDots,
  DatabaseSearch,
  Shape,
  DumbBell,
  MsgDraw,
  Pillar,
  PencilRuler,
  Marker,
  Memory,
  StateMachine,
  ChartTree,
  StarFourPts,
  ApacheKafka,
  Compare,
  Python,
  BookOpen
} from "src/assets/svgs.jsx";
import ExampleCard from "./ExampleCard";
import LargeTextTitle from "src/components/Titles/LargeTextTitle/LargeTextTitle";

export const exampleCards = [
  {
    icon: <CodeBraces />,
    title: "Coding Query Solution",
    description: "Solve and elucidate common programming dilemmas.",
    link: "",
    systemPrompt:
      "You will be provided with a specific coding challenge or question, and your task is to generate a practical solution or explanation.",
    userPrompt:
      "In Python, I'm trying to create a simple function that takes a name as an input and then prints a greeting message using that name. Can you help?",
    sampleResponse: (
      <span>
        Sure! To create a function in Python that takes a name and prints a
        greeting, you can define it as:
        <br />
        <br />
        def greet(name):
        <br />
        print("Hello, " + name + "!")
        <br />
        <br />
        Then, to use the function, you can call it with:
        <br />
        greet("YourName")
        <br />
        <br />
        And it will print: "Hello, YourName!"
      </span>
    ),
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
-H "Content-Type: application/json" 
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
-d '{
    "messages":[{
        "role":"user",
        "content":"In Python, I'm trying to create a simple function that takes a name as an input and then prints a greeting message using that name. Can you help?"
        
    },
    {
      "role":"system",
      "content": "You will be provided with a specific coding challenge or question, and your task is to generate a practical solution or explanation.",
    }],
}'`,
      },
      {
        language: "Python",
        code: `import requests

url = "https://platform.keywordsai.co/api/generate/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
}
data = {
    "messages": [
        {
            "role": "user",
            "content": "In Python, I'm trying to create a simple function that takes a name as an input and then prints a greeting message using that name. Can you help?"
        },
        {
            "role": "system",
            "content": "You will be provided with a specific coding challenge or question, and your task is to generate a practical solution or explanation."
        }
    ]
}
response = requests.post(url, headers=headers, json=data)`
      },
      {
        language: "JavaScript (Node.js)",
        code: `const axios = require('axios');

const url = "https://platform.keywordsai.co/api/generate/";
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
};
const data = {
    messages: [
        {
            role: "user",
            content: "In Python, I'm trying to create a simple function that takes a name as an input and then prints a greeting message using that name. Can you help?"
        },
        {
            role: "system",
            content: "You will be provided with a specific coding challenge or question, and your task is to generate a practical solution or explanation."
        }
    ]
};

axios.post(url, data, { headers: headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });`
      },
      {
        language: "PHP",
        code: `$url = 'https://platform.keywordsai.co/api/generate/';
$headers = [
    'Content-Type: application/json',
    'Authorization: Api-Key {YOUR_ACCESS_TOKEN}'
];
$data = [
    'messages' => [
        [
            'role' => 'user',
            'content' => "In Python, I'm trying to create a simple function that takes a name as an input and then prints a greeting message using that name. Can you help?"
        ],
        [
            'role' => 'system',
            'content' => "You will be provided with a specific coding challenge or question, and your task is to generate a practical solution or explanation."
        ]
    ]
];

$options = [
    'http' => [
        'header'  => implode("\\r\\n", $headers),
        'method'  => 'POST',
        'content' => json_encode($data),
    ],
];
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);`
      },
      {
        language: "Go (Golang)",
        code: `package main

import (
    "bytes"
    "net/http"
    "encoding/json"
    "fmt"
)

func main() {
    url := "https://platform.keywordsai.co/api/generate/"
    headers := map[string]string{
        "Content-Type": "application/json",
        "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}",
    }

    data := map[string][]map[string]string{
        "messages": {
            {
                "role": "user",
                "content": "In Python, I'm trying to create a simple function that takes a name as an input and then prints a greeting message using that name. Can you help?",
            },
            {
                "role": "system",
                "content": "You will be provided with a specific coding challenge or question, and your task is to generate a practical solution or explanation.",
            },
        },
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println(err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println(err)
        return
    }

    for key, value := range headers {
        req.Header.Set(key, value)
    }

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer resp.Body.Close()

    fmt.Println("Response status:", resp.Status)
}`
      }
    ],
  },
  {
    icon: <Sprout />,
    title: "Environmental Solutions",
    description: "Propose eco-friendly solutions to modern-day challenges.",
    link: "",
    systemPrompt:
      "You will be provided with a specific environmental concern, and your task is to generate sustainable and eco-friendly solutions.",
    userPrompt: "Our city is grappling with extensive plastic waste. As a local council member, I'm looking for innovative methods to reduce single-use plastic consumption and manage the accumulated plastic waste more effectively.",
    sampleResponse: (
      <span>
        To combat plastic waste:
        <br />
        1. Implement a city-wide ban or tax on single-use plastics, especially in retail stores.
        <br />
        2. Promote the use of biodegradable or reusable alternatives.
        <br />
        3. Launch awareness campaigns about the environmental impact of plastics.
        <br />
        4. Incentivize recycling by offering discounts or rewards for returning plastic items.
        <br />
        5. Partner with companies that specialize in converting plastic waste into reusable items or energy.
      </span>
    ),
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
-H "Content-Type: application/json" 
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
-d '{
    "messages":[{
        "role":"user",
        "content":"Our city is grappling with extensive plastic waste. As a local council member, I'm looking for innovative methods to reduce single-use plastic consumption and manage the accumulated plastic waste more effectively."
        
    },
    {
      "role":"system",
      "content": "You will be provided with a specific environmental concern, and your task is to generate sustainable and eco-friendly solutions.",
    }],
}'`,
      },
      {
        language: "Python",
        code: `import requests

url = "https://platform.keywordsai.co/api/generate/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
}
data = {
    "messages": [
        {
            "role": "user",
            "content": "Our city is grappling with extensive plastic waste. As a local council member, I'm looking for innovative methods to reduce single-use plastic consumption and manage the accumulated plastic waste more effectively."
        },
        {
            "role": "system",
            "content": "You will be provided with a specific environmental concern, and your task is to generate sustainable and eco-friendly solutions."
        }
    ]
}
response = requests.post(url, headers=headers, json=data)`
      },
      {
        language: "JavaScript (Node.js)",
        code: `const axios = require('axios');

const url = "https://platform.keywordsai.co/api/generate/";
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
};
const data = {
    messages: [
        {
            role: "user",
            content: "Our city is grappling with extensive plastic waste. As a local council member, I'm looking for innovative methods to reduce single-use plastic consumption and manage the accumulated plastic waste more effectively."
        },
        {
            role: "system",
            content: "You will be provided with a specific environmental concern, and your task is to generate sustainable and eco-friendly solutions."
        }
    ]
};

axios.post(url, data, { headers: headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });`
      },
      {
        language: "PHP",
        code: `$url = 'https://platform.keywordsai.co/api/generate/';
$headers = [
    'Content-Type: application/json',
    'Authorization: Api-Key {YOUR_ACCESS_TOKEN}'
];
$data = [
    'messages' => [
        [
            'role' => 'user',
            'content' => "Our city is grappling with extensive plastic waste. As a local council member, I'm looking for innovative methods to reduce single-use plastic consumption and manage the accumulated plastic waste more effectively."
        ],
        [
            'role' => 'system',
            'content' => "You will be provided with a specific environmental concern, and your task is to generate sustainable and eco-friendly solutions."
        ]
    ]
];

$options = [
    'http' => [
        'header'  => implode("\\r\\n", $headers),
        'method'  => 'POST',
        'content' => json_encode($data),
    ],
];
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);`
      },
      {
        language: "Go (Golang)",
        code: `package main

import (
    "bytes"
    "net/http"
    "encoding/json"
    "fmt"
)

func main() {
    url := "https://platform.keywordsai.co/api/generate/"
    headers := map[string]string{
        "Content-Type": "application/json",
        "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}",
    }

    data := map[string][]map[string]string{
        "messages": {
            {
                "role": "user",
                "content": "Our city is grappling with extensive plastic waste. As a local council member, I'm looking for innovative methods to reduce single-use plastic consumption and manage the accumulated plastic waste more effectively.",
            },
            {
                "role": "system",
                "content": "You will be provided with a specific environmental concern, and your task is to generate sustainable and eco-friendly solutions.",
            },
        },
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println(err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println(err)
        return
    }

    for key, value := range headers {
        req.Header.Set(key, value)
    }

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer resp.Body.Close()

    fmt.Println("Response status:", resp.Status)
}`
      }
    ],
  },
  {
    icon: <HeadDots />,
    title: "Deep Dive into Economic Theories",
    description: "Understand economic theories and their real-world implications.",
    link: "",
    systemPrompt:
      "Bring up an economic theory or principle, and let's dissect its nuances and ramifications.",
    userPrompt: "Elucidate on Keynesian economics and its approach to economic downturns.",
    sampleResponse: "Keynesian economics, developed by John Maynard Keynes, suggests that aggregate demand (total spending) influences economic output. During economic downturns, when private sector spending drops, this theory promotes government intervention. Keynesians believe that increased government spending or tax cuts can boost demand, counteracting reduced private sector spending and helping mitigate unemployment during recessions. In essence, the government acts to flex-1   the spending gap.",
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
-H "Content-Type: application/json" 
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
-d '{
    "messages":[{
        "role":"user",
        "content":"Elucidate on Keynesian economics and its approach to economic downturns."
        
    },
    {
      "role":"system",
      "content": "Bring up an economic theory or principle, and let's dissect its nuances and ramifications.",
    }],
}'`,
      },
      {
        language: "Python",
        code: `import requests

url = "https://platform.keywordsai.co/api/generate/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
}
data = {
    "messages": [
        {
            "role": "user",
            "content": "Elucidate on Keynesian economics and its approach to economic downturns."
        },
        {
            "role": "system",
            "content": "Bring up an economic theory or principle, and let's dissect its nuances and ramifications."
        }
    ]
}
response = requests.post(url, headers=headers, json=data)`
      },
      {
        language: "JavaScript (Node.js)",
        code: `const axios = require('axios');

const url = "https://platform.keywordsai.co/api/generate/";
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
};
const data = {
    messages: [
        {
            role: "user",
            content: "Elucidate on Keynesian economics and its approach to economic downturns."
        },
        {
            role: "system",
            content: "Bring up an economic theory or principle, and let's dissect its nuances and ramifications."
        }
    ]
};

axios.post(url, data, { headers: headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });`
      },
      {
        language: "PHP",
        code: `$url = 'https://platform.keywordsai.co/api/generate/';
$headers = [
    'Content-Type: application/json',
    'Authorization: Api-Key {YOUR_ACCESS_TOKEN}'
];
$data = [
    'messages' => [
        [
            'role' => 'user',
            'content' => "Elucidate on Keynesian economics and its approach to economic downturns."
        ],
        [
            'role' => 'system',
            'content' => "Bring up an economic theory or principle, and let's dissect its nuances and ramifications."
        ]
    ]
];

$options = [
    'http' => [
        'header'  => implode("\\r\\n", $headers),
        'method'  => 'POST',
        'content' => json_encode($data),
    ],
];
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);`
      },
      {
        language: "Go (Golang)",
        code: `package main

import (
    "bytes"
    "net/http"
    "encoding/json"
    "fmt"
)

func main() {
    url := "https://platform.keywordsai.co/api/generate/"
    headers := map[string]string{
        "Content-Type": "application/json",
        "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}",
    }

    data := map[string][]map[string]string{
        "messages": {
            {
                "role": "user",
                "content": "Elucidate on Keynesian economics and its approach to economic downturns.",
            },
            {
                "role": "system",
                "content": "Bring up an economic theory or principle, and let's dissect its nuances and ramifications.",
            },
        },
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println(err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println(err)
        return
    }

    for key, value := range headers {
        req.Header.Set(key, value)
    }

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer resp.Body.Close()

    fmt.Println("Response status:", resp.Status)
}`
      }
    ],
  },
  {
    icon: <MedicalBag />,
    title: "Medical Terminology Simplifier",
    description: "Convert complex medical terms into layman's language.",
    link: "",
    systemPrompt:
      "Provide a medical term or statement, and the AI will translate it into easily understandable language.",
    userPrompt: "Cardiomyopathy is a disease of the heart muscle.",
    sampleResponse:
      "It's a condition where the heart muscle becomes weak or doesn't work properly.",
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
-H "Content-Type: application/json" 
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
-d '{
    "messages":[{
        "role":"user",
        "content":"Cardiomyopathy is a disease of the heart muscle."
        
    },
    {
      "role":"system",
      "content": "Provide a medical term or statement, and the AI will translate it into easily understandable language.",
    }],
}'`,
      },
      {
        language: "Python",
        code: `import requests

url = "https://platform.keywordsai.co/api/generate/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
}
data = {
    "messages": [
        {
            "role": "user",
            "content": "Cardiomyopathy is a disease of the heart muscle."
        },
        {
            "role": "system",
            "content": "Provide a medical term or statement, and the AI will translate it into easily understandable language."
        }
    ]
}
response = requests.post(url, headers=headers, json=data)`
      },
      {
        language: "JavaScript (Node.js)",
        code: `const axios = require('axios');

const url = "https://platform.keywordsai.co/api/generate/";
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
};
const data = {
    messages: [
        {
            role: "user",
            content: "Cardiomyopathy is a disease of the heart muscle."
        },
        {
            role: "system",
            content: "Provide a medical term or statement, and the AI will translate it into easily understandable language."
        }
    ]
};

axios.post(url, data, { headers: headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });`
      },
      {
        language: "PHP",
        code: `$url = 'https://platform.keywordsai.co/api/generate/';
$headers = [
    'Content-Type: application/json',
    'Authorization: Api-Key {YOUR_ACCESS_TOKEN}'
];
$data = [
    'messages' => [
        [
            'role' => 'user',
            'content' => "Cardiomyopathy is a disease of the heart muscle."
        ],
        [
            'role' => 'system',
            'content' => "Provide a medical term or statement, and the AI will translate it into easily understandable language."
        ]
    ]
];

$options = [
    'http' => [
        'header'  => implode("\\r\\n", $headers),
        'method'  => 'POST',
        'content' => json_encode($data),
    ],
];
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);`
      },
      {
        language: "Go (Golang)",
        code: `package main

import (
    "bytes"
    "net/http"
    "encoding/json"
    "fmt"
)

func main() {
    url := "https://platform.keywordsai.co/api/generate/"
    headers := map[string]string{
        "Content-Type": "application/json",
        "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}",
    }

    data := map[string][]map[string]string{
        "messages": {
            {
                "role": "user",
                "content": "Cardiomyopathy is a disease of the heart muscle.",
            },
            {
                "role": "system",
                "content": "Provide a medical term or statement, and the AI will translate it into easily understandable language.",
            },
        },
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println(err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println(err)
        return
    }

    for key, value := range headers {
        req.Header.Set(key, value)
    }

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer resp.Body.Close()

    fmt.Println("Response status:", resp.Status)
}`
      }
    ],
  },
  {
    icon: <DatabaseSearch />,
    title: "SQL Data Retrieval",
    description: "Extract specific data from complex relational databases.",
    link: "",
    systemPrompt:
      "You will be provided with a database schema and a data request. Your task is to compose the appropriate SQL query.",
    userPrompt: "Given tables 'orders' (with columns order_id, product_id, and user_id) and 'products' (with columns product_id and product_name), retrieve all product names that were ordered by user with user_id '123'.",
    sampleResponse: (
      <span>
        SELECT products.product_name
        <br />
        FROM orders
        <br />
        JOIN products ON orders.product_id = products.product_id
        <br />
        WHERE orders.user_id = '123';
      </span>
    ),
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
-H "Content-Type: application/json" 
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
-d '{
    "messages":[{
        "role":"user",
        "content":"Given tables 'orders' (with columns order_id, product_id, and user_id) and 'products' (with columns product_id and product_name), retrieve all product names that were ordered by user with user_id '123'."
        
    },
    {
      "role":"system",
      "content": "You will be provided with a database schema and a data request. Your task is to compose the appropriate SQL query.",
    }],
}'`,
      },
      {
        language: "Python",
        code: `import requests

url = "https://platform.keywordsai.co/api/generate/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
}
data = {
    "messages": [
        {
            "role": "user",
            "content": "Given tables 'orders' (with columns order_id, product_id, and user_id) and 'products' (with columns product_id and product_name), retrieve all product names that were ordered by user with user_id '123'."
        },
        {
            "role": "system",
            "content": "You will be provided with a database schema and a data request. Your task is to compose the appropriate SQL query."
        }
    ]
}
response = requests.post(url, headers=headers, json=data)`
      },
      {
        language: "JavaScript (Node.js)",
        code: `const axios = require('axios');

const url = "https://platform.keywordsai.co/api/generate/";
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
};
const data = {
    messages: [
        {
            role: "user",
            content: "Given tables 'orders' (with columns order_id, product_id, and user_id) and 'products' (with columns product_id and product_name), retrieve all product names that were ordered by user with user_id '123'."
        },
        {
            role: "system",
            content: "You will be provided with a database schema and a data request. Your task is to compose the appropriate SQL query."
        }
    ]
};

axios.post(url, data, { headers: headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });`
      },
      {
        language: "PHP",
        code: `$url = 'https://platform.keywordsai.co/api/generate/';
$headers = [
    'Content-Type: application/json',
    'Authorization: Api-Key {YOUR_ACCESS_TOKEN}'
];
$data = [
    'messages' => [
        [
            'role' => 'user',
            'content' => "Given tables 'orders' (with columns order_id, product_id, and user_id) and 'products' (with columns product_id and product_name), retrieve all product names that were ordered by user with user_id '123'."
        ],
        [
            'role' => 'system',
            'content' => "You will be provided with a database schema and a data request. Your task is to compose the appropriate SQL query."
        ]
    ]
];

$options = [
    'http' => [
        'header'  => implode("\\r\\n", $headers),
        'method'  => 'POST',
        'content' => json_encode($data),
    ],
];
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);`
      },
      {
        language: "Go (Golang)",
        code: `package main

import (
    "bytes"
    "net/http"
    "encoding/json"
    "fmt"
)

func main() {
    url := "https://platform.keywordsai.co/api/generate/"
    headers := map[string]string{
        "Content-Type": "application/json",
        "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}",
    }

    data := map[string][]map[string]string{
        "messages": {
            {
                "role": "user",
                "content": "Given tables 'orders' (with columns order_id, product_id, and user_id) and 'products' (with columns product_id and product_name), retrieve all product names that were ordered by user with user_id '123'.",
            },
            {
                "role": "system",
                "content": "You will be provided with a database schema and a data request. Your task is to compose the appropriate SQL query.",
            },
        },
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println(err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println(err)
        return
    }

    for key, value := range headers {
        req.Header.Set(key, value)
    }

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer resp.Body.Close()

    fmt.Println("Response status:", resp.Status)
}`
      }
    ],
  },
  {
    icon: <Shape />,
    title: "DIY Project Ideas",
    description: "Generate DIY project ideas based on available materials.",
    link: "",
    systemPrompt: "List materials you have, and get a DIY project idea.",
    userPrompt: "I have wood, nails, and paint.",
    sampleResponse:
      "Consider creating a customized wooden shelf. Paint it for a personalized touch!",
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
-H "Content-Type: application/json" 
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
-d '{
    "messages":[{
        "role":"user",
        "content":"Generate DIY project ideas based on available materials."
        
    },
    {
      "role":"system",
      "content": "List materials you have, and get a DIY project idea.",
    }],
}'`,
      },
      {
        language: "Python",
        code: `import requests

url = "https://platform.keywordsai.co/api/generate/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
}
data = {
    "messages": [
        {
            "role": "user",
            "content": "Generate DIY project ideas based on available materials."
        },
        {
            "role": "system",
            "content": "List materials you have, and get a DIY project idea."
        }
    ]
}
response = requests.post(url, headers=headers, json=data)`
      },
      {
        language: "JavaScript (Node.js)",
        code: `const axios = require('axios');

const url = "https://platform.keywordsai.co/api/generate/";
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
};
const data = {
    messages: [
        {
            role: "user",
            content: "Generate DIY project ideas based on available materials."
        },
        {
            role: "system",
            content: "List materials you have, and get a DIY project idea."
        }
    ]
};

axios.post(url, data, { headers: headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });`
      },
      {
        language: "PHP",
        code: `$url = 'https://platform.keywordsai.co/api/generate/';
$headers = [
    'Content-Type: application/json',
    'Authorization: Api-Key {YOUR_ACCESS_TOKEN}'
];
$data = [
    'messages' => [
        [
            'role' => 'user',
            'content' => "Generate DIY project ideas based on available materials."
        ],
        [
            'role' => 'system',
            'content' => "List materials you have, and get a DIY project idea."
        ]
    ]
];

$options = [
    'http' => [
        'header'  => implode("\\r\\n", $headers),
        'method'  => 'POST',
        'content' => json_encode($data),
    ],
];
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);`
      },
      {
        language: "Go (Golang)",
        code: `package main

import (
    "bytes"
    "net/http"
    "encoding/json"
    "fmt"
)

func main() {
    url := "https://platform.keywordsai.co/api/generate/"
    headers := map[string]string{
        "Content-Type": "application/json",
        "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}",
    }

    data := map[string][]map[string]string{
        "messages": {
            {
                "role": "user",
                "content": "Generate DIY project ideas based on available materials.",
            },
            {
                "role": "system",
                "content": "List materials you have, and get a DIY project idea.",
            },
        },
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println(err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println(err)
        return
    }

    for key, value := range headers {
        req.Header.Set(key, value)
    }

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer resp.Body.Close()

    fmt.Println("Response status:", resp.Status)
}`
      }
    ],
  },
  {
    icon: <DumbBell />,
    title: "Fitness Routine Generator",
    description: "Curate fitness routines tailored to individual goals.",
    link: "",
    systemPrompt:
      "You will be provided with a specific fitness aspiration, and your task is to devise a personalized workout regimen.",
    userPrompt:
      "I'm a 30-year-old male, weighing around 180 pounds, with a sedentary job. I've been feeling that my upper body strength is declining. I've got access to basic gym equipment. What exercises can help me regain and build my upper body strength?",
    sampleResponse: (
      <span>
        Given your profile, to regain and enhance your upper body strength,
        I'd recommend the following routine with basic gym equipment:
        <br />
        <br />
        Push-ups: 3 sets of 10-15 reps.
        <br />
        Pull-ups: 3 sets of 5-8 reps.
        <br />
        Bench presses: 3 sets of 8-12 reps using moderate weights.
        <br />
        Dumbbell curls: 3 sets of 12 reps.
        <br />
        Tricep dips: 3 sets of 10 reps.
        <br />
        Ensure a rest day between intense workouts, and gradually increase the reps or weights as you progress.
      </span>
    ),
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
-H "Content-Type: application/json" 
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
-d '{
    "messages":[{
        "role":"user",
        "content":"I'm a 30-year-old male, weighing around 180 pounds, with a sedentary job. I've been feeling that my upper body strength is declining. I've got access to basic gym equipment. What exercises can help me regain and build my upper body strength?"
        
    },
    {
      "role":"system",
      "content": "You will be provided with a specific fitness aspiration, and your task is to devise a personalized workout regimen.",
    }],
}'`,
      },
      {
        language: "Python",
        code: `import requests

url = "https://platform.keywordsai.co/api/generate/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
}
data = {
    "messages": [
        {
            "role": "user",
            "content": "Generate DIY project ideas based on available materials."
        },
        {
            "role": "system",
            "content": "List materials you have, and get a DIY project idea."
        }
    ]
}
response = requests.post(url, headers=headers, json=data)`
      },
      {
        language: "JavaScript (Node.js)",
        code: `const axios = require('axios');

const url = "https://platform.keywordsai.co/api/generate/";
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
};
const data = {
    messages: [
        {
            role: "user",
            content: "Generate DIY project ideas based on available materials."
        },
        {
            role: "system",
            content: "List materials you have, and get a DIY project idea."
        }
    ]
};

axios.post(url, data, { headers: headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });`
      },
      {
        language: "PHP",
        code: `$url = 'https://platform.keywordsai.co/api/generate/';
$headers = [
    'Content-Type: application/json',
    'Authorization: Api-Key {YOUR_ACCESS_TOKEN}'
];
$data = [
    'messages' => [
        [
            'role' => 'user',
            'content' => "Generate DIY project ideas based on available materials."
        ],
        [
            'role' => 'system',
            'content' => "List materials you have, and get a DIY project idea."
        ]
    ]
];

$options = [
    'http' => [
        'header'  => implode("\\r\\n", $headers),
        'method'  => 'POST',
        'content' => json_encode($data),
    ],
];
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);`
      },
      {
        language: "Go (Golang)",
        code: `package main

import (
    "bytes"
    "net/http"
    "encoding/json"
    "fmt"
)

func main() {
    url := "https://platform.keywordsai.co/api/generate/"
    headers := map[string]string{
        "Content-Type": "application/json",
        "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}",
    }

    data := map[string][]map[string]string{
        "messages": {
            {
                "role": "user",
                "content": "Generate DIY project ideas based on available materials.",
            },
            {
                "role": "system",
                "content": "List materials you have, and get a DIY project idea.",
            },
        },
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println(err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println(err)
        return
    }

    for key, value := range headers {
        req.Header.Set(key, value)
    }

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer resp.Body.Close()

    fmt.Println("Response status:", resp.Status)
}`
      }
    ],
  },
  {
    icon: <MsgDraw />,
    title: "Startup Pitch Improver",
    description: "Elevate your startup pitches to captivate investors.",
    link: "",
    systemPrompt:
      "You will be provided with a brief startup description, and your task is to enhance and refine it to make it compelling.",
    userPrompt:
      "We've launched a new platform for selling a wide variety of shoes online. Our collection includes everything from athletic sneakers to high-end designer heels, all available with quick shipping options.",
    sampleResponse:
      "We're at the forefront of redefining online footwear commerce. Our platform isn't just another e-store; it's a carefully crafted experience. From the vast range of selections that includes the latest athletic sneakers for fitness enthusiasts to the high-end designer heels for the fashion-conscious, our inventory speaks volumes about our dedication to variety and quality. Furthermore, our quick shipping options ensure that your chosen pair is promptly at your doorstep. Dive into our world, where every step you take is a reflection of your unique style, and every purchase is a testament to our commitment to excellence.",
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
-H "Content-Type: application/json" 
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
-d '{
    "messages":[{
        "role":"user",
        "content":"We've launched a new platform for selling a wide variety of shoes online. Our collection includes everything from athletic sneakers to high-end designer heels, all available with quick shipping options."
        
    },
    {
      "role":"system",
      "content": "You will be provided with a brief startup description, and your task is to enhance and refine it to make it compelling.",
    }],
}'`,
      },
      {
        language: "Python",
        code: `import requests

url = "https://platform.keywordsai.co/api/generate/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
}
data = {
    "messages": [
        {
            "role": "user",
            "content": "We've launched a new platform for selling a wide variety of shoes online. Our collection includes everything from athletic sneakers to high-end designer heels, all available with quick shipping options."
        },
        {
            "role": "system",
            "content": "You will be provided with a brief startup description, and your task is to enhance and refine it to make it compelling."
        }
    ]
}
response = requests.post(url, headers=headers, json=data)
# Enhanced Description:
print("Step into the future of footwear with our expansive online platform. From the thrill of athletic escapades to the allure of designer elegance, we've curated a diverse shoe collection to resonate with your unique style. Plus, with our rapid shipping, your perfect pair is just a click away!")`
      },
      // JavaScript (Node.js):
      {
        language: "JavaScript (Node.js)",
        code: `const axios = require('axios');

const url = "https://platform.keywordsai.co/api/generate/";
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
};
const data = {
    messages: [
        {
            role: "user",
            content: "We've launched a new platform for selling a wide variety of shoes online. Our collection includes everything from athletic sneakers to high-end designer heels, all available with quick shipping options."
        },
        {
            role: "system",
            content: "You will be provided with a brief startup description, and your task is to enhance and refine it to make it compelling."
        }
    ]
};

axios.post(url, data, { headers: headers })
    .then(response => {
        // Enhanced Description:
        console.log("Step into the future of footwear with our expansive online platform. From the thrill of athletic escapades to the allure of designer elegance, we've curated a diverse shoe collection to resonate with your unique style. Plus, with our rapid shipping, your perfect pair is just a click away!");
    })
    .catch(error => {
        console.error(error);
    });`
      },
      // Additional languages can follow a similar structure...
    ],
  },
  {
    icon: <Pillar />,
    title: "Historical Event Summarizer",
    description: "Summarize key details of historical events.",
    link: "",
    systemPrompt:
      "Provide the name of a historical event, and get a concise summary.",
    userPrompt: "The Renaissance period.",
    sampleResponse: "The Renaissance was a cultural movement in Europe from the 14th to 17th century, marked by a revival in art, literature, and learning.",
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
-H "Content-Type: application/json" 
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
-d '{
    "messages":[{
        "role":"user",
        "content":"The Renaissance period."
        
    },
    {
      "role":"system",
      "content": "Provide the name of a historical event, and get a concise summary.",
    }],
}'`,
      },
      {
        "language": "Python",
        "code": `
import requests

url = 'https://platform.keywordsai.co/api/generate/'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Api-Key {YOUR_ACCESS_TOKEN}'
}
data = {
    'messages': [{
        'role': 'user',
        'content': 'The Renaissance period.'
    },
    {
        'role': 'system',
        'content': 'Provide the name of a historical event, and get a concise summary.'
    }]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
`
      },
      {
        "language": "JavaScript (Node.js)",
        "code": `
const axios = require('axios');

const url = 'https://platform.keywordsai.co/api/generate/';
const headers = {
'Content-Type': 'application/json',
'Authorization': 'Api-Key {YOUR_ACCESS_TOKEN}'
};
const data = {
messages: [{
  role: 'user',
  content: 'The Renaissance period.'
},
{
  role: 'system',
  content: 'Provide the name of a historical event, and get a concise summary.'
}]
};

axios.post(url, data, { headers: headers })
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});
`
      },
      {
        "language": "PHP",
        "code": `
<?php

$url = 'https://platform.keywordsai.co/api/generate/';
$headers = array(
'Content-Type: application/json',
'Authorization: Api-Key {YOUR_ACCESS_TOKEN}'
);
$data = array(
'messages' => array(
  array('role' => 'user', 'content' => 'The Renaissance period.'),
  array('role' => 'system', 'content' => 'Provide the name of a historical event, and get a concise summary.')
)
);

$options = array(
'http' => array(
  'header' => $headers,
  'method' => 'POST',
  'content' => json_encode($data),
),
);
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo $result;

?>
`
      },
      {
        "language": "Go",
        "code": `
package main

import (
"bytes"
"encoding/json"
"fmt"
"net/http"
)

func main() {
url := "https://platform.keywordsai.co/api/generate/"
headers := map[string]string{
"Content-Type": "application/json",
"Authorization": "Api-Key {YOUR_ACCESS_TOKEN}",
}

data := map[string]interface{}{
"messages": []map[string]string{
{
  "role": "user",
  "content": "The Renaissance period.",
},
{
  "role": "system",
  "content": "Provide the name of a historical event, and get a concise summary.",
},
},
}

body, _ := json.Marshal(data)
resp, err := http.Post(url, "application/json", bytes.NewBuffer(body))
if err != nil {
fmt.Println("Error:", err)
return
}
defer resp.Body.Close()

var result map[string]interface{}
json.NewDecoder(resp.Body).Decode(&result)
fmt.Println(result)
}
`
      }
    ],
  },
  {
    icon: <PencilRuler />,
    title: "Product Design Enhancement",
    description: "Improve product designs for user-friendliness and market appeal.",
    link: "",
    systemPrompt:
      "You will be provided with a product description and its current design features, and your task is to suggest design enhancements to increase its appeal and functionality.",
    userPrompt: "We've designed a smartwatch mainly for senior citizens. Current features include health monitoring, emergency SOS, medication reminders, and a large font display. We're aiming for simplicity and safety. Any suggestions for improvement?",
    sampleResponse: (
      <span>
        Given your target demographic:
        <br />
        <br />
        Integrate voice-command capabilities for ease of use.
        <br />
        Add fall detection, which can automatically alert emergency services.
        <br />
        Design a simple tutorial or walkthrough that plays when first setting up the watch.
        <br />
        Offer customizable watch faces to cater to various vision capabilities.
        <br />
        Introduce a feature that allows family members to remotely check in or monitor the user's health stats for added peace of mind.
      </span>
    ),
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
-H "Content-Type: application/json" 
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
-d '{
    "messages":[{
        "role":"user",
        "content":"We've designed a smartwatch mainly for senior citizens. Current features include health monitoring, emergency SOS, medication reminders, and a large font display. We're aiming for simplicity and safety. Any suggestions for improvement?"
    },
    {
      "role":"system",
      "content": "You will be provided with a product description and its current design features, and your task is to suggest design enhancements to increase its appeal and functionality.",
    }],
}'`,
      },
      {
        language: "Python",
        code: `import requests

url = "https://platform.keywordsai.co/api/generate/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
}
data = {
    "messages": [
        {
            "role": "user",
            "content": "We've designed a smartwatch mainly for senior citizens. Current features include health monitoring, emergency SOS, medication reminders, and a large font display. We're aiming for simplicity and safety. Any suggestions for improvement?"
        },
        {
            "role": "system",
            "content": "You will be provided with a product description and its current design features, and your task is to suggest design enhancements to increase its appeal and functionality."
        }
    ]
}
response = requests.post(url, headers=headers, json=data)`
      },
      {
        language: "JavaScript (Node.js)",
        code: `const axios = require('axios');

const url = "https://platform.keywordsai.co/api/generate/";
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
};
const data = {
    messages: [
        {
            role: "user",
            content: "We've designed a smartwatch mainly for senior citizens. Current features include health monitoring, emergency SOS, medication reminders, and a large font display. We're aiming for simplicity and safety. Any suggestions for improvement?"
        },
        {
            role: "system",
            content: "You will be provided with a product description and its current design features, and your task is to suggest design enhancements to increase its appeal and functionality."
        }
    ]
};

axios.post(url, data, { headers: headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });`
      },
      {
        language: "PHP",
        code: `$url = 'https://platform.keywordsai.co/api/generate/';
$headers = [
    'Content-Type: application/json',
    'Authorization: Api-Key {YOUR_ACCESS_TOKEN}'
];
$data = [
    'messages' => [
        [
            'role' => 'user',
            'content' => "We've designed a smartwatch mainly for senior citizens. Current features include health monitoring, emergency SOS, medication reminders, and a large font display. We're aiming for simplicity and safety. Any suggestions for improvement?"
        ],
        [
            'role' => 'system',
            'content' => "You will be provided with a product description and its current design features, and your task is to suggest design enhancements to increase its appeal and functionality."
        ]
    ]
];

$options = [
    'http' => [
        'header'  => implode("\\r\\n", $headers),
        'method'  => 'POST',
        'content' => json_encode($data),
    ],
];
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);`
      },
      {
        language: "Go (Golang)",
        code: `package main

import (
    "bytes"
    "net/http"
    "encoding/json"
    "fmt"
)

func main() {
    url := "https://platform.keywordsai.co/api/generate/"
    headers := map[string]string{
        "Content-Type": "application/json",
        "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}",
    }

    data := map[string][]map[string]string{
        "messages": {
            {
                "role": "user",
                "content": "We've designed a smartwatch mainly for senior citizens. Current features include health monitoring, emergency SOS, medication reminders, and a large font display. We're aiming for simplicity and safety. Any suggestions for improvement?",
            },
            {
                "role": "system",
                "content": "You will be provided with a product description and its current design features, and your task is to suggest design enhancements to increase its appeal and functionality.",
            },
        },
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println(err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println(err)
        return
    }

    for key, value := range headers {
        req.Header.Set(key, value)
    }

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer resp.Body.Close()

    fmt.Println("Response status:", resp.Status)
}`
      }
    ],
  },
  {
    icon: <Marker />,
    title: "Marketing Slogan Generator",
    description: "Craft catchy slogans for products.",
    link: "",
    systemPrompt: "Describe your product, and get a creative slogan.",
    userPrompt: "Eco-friendly bamboo toothbrush.",
    sampleResponse: "Brush with Nature, Smile for the Future!",
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
-H "Content-Type: application/json" 
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
-d '{
    "messages":[{
        "role":"user",
        "content":"Eco-friendly bamboo toothbrush."
        
    },
    {
      "role":"system",
      "content": "Describe your product, and get a creative slogan.",
    }],
}'`,
      },
      {
        language: "Python",
        code: `import requests

url = "https://platform.keywordsai.co/api/generate/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
}
data = {
    "messages": [
        {
            "role": "user",
            "content": "Eco-friendly bamboo toothbrush."
        },
        {
            "role": "system",
            "content": "Describe your product, and get a creative slogan."
        }
    ]
}
response = requests.post(url, headers=headers, json=data)`
      },
      {
        language: "JavaScript (Node.js)",
        code: `const axios = require('axios');

const url = "https://platform.keywordsai.co/api/generate/";
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
};
const data = {
    messages: [
        {
            role: "user",
            content: "Eco-friendly bamboo toothbrush."
        },
        {
            role: "system",
            content: "Describe your product, and get a creative slogan."
        }
    ]
};

axios.post(url, data, { headers: headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });`
      },
      {
        language: "PHP",
        code: `$url = 'https://platform.keywordsai.co/api/generate/';
$headers = [
    'Content-Type: application/json',
    'Authorization: Api-Key {YOUR_ACCESS_TOKEN}'
];
$data = [
    'messages' => [
        [
            'role' => 'user',
            'content' => "Eco-friendly bamboo toothbrush."
        ],
        [
            'role' => 'system',
            'content' => "Describe your product, and get a creative slogan."
        ]
    ]
];

$options = [
    'http' => [
        'header'  => implode("\\r\\n", $headers),
        'method'  => 'POST',
        'content' => json_encode($data),
    ],
];
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);`
      },
      {
        language: "Go (Golang)",
        code: `package main

import (
    "bytes"
    "net/http"
    "encoding/json"
    "fmt"
)

func main() {
    url := "https://platform.keywordsai.co/api/generate/"
    headers := map[string]string{
        "Content-Type": "application/json",
        "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}",
    }

    data := map[string][]map[string]string{
        "messages": {
            {
                "role": "user",
                "content": "Eco-friendly bamboo toothbrush.",
            },
            {
                "role": "system",
                "content": "Describe your product, and get a creative slogan.",
            },
        },
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println(err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println(err)
        return
    }

    for key, value := range headers {
        req.Header.Set(key, value)
    }

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer resp.Body.Close()

    fmt.Println("Response status:", resp.Status)
}`
      }

    ],
  },
  {
    icon: <Memory />,
    title: "Memory Management in C++",
    description: "Solve challenges related to dynamic memory.",
    link: "",
    systemPrompt:
      "You'll get a snippet of C++ code. Identify any memory leaks and recommend fixes.",
    userPrompt: "I've dynamically allocated an array of integers using 'new' but occasionally run into issues. Can you spot any memory-related problems?",
    sampleResponse: "If you've allocated memory using 'new[]', you must free it using 'delete[]' and not just delete. Ensure that after using the array, you release the memory with the correct delete type. Also, always set pointers to nullptr after deleting to prevent dangling pointer issues.",
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
-H "Content-Type: application/json" 
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
-d '{
    "messages":[{
        "role":"user",
        "content":"I've dynamically allocated an array of integers using 'new' but occasionally run into issues. Can you spot any memory-related problems?"
        
    },
    {
      "role":"system",
      "content": "You'll get a snippet of C++ code. Identify any memory leaks and recommend fixes.",
    }],
}'`,
      },
      {
        language: "Python",
        code: `import requests

url = "https://platform.keywordsai.co/api/generate/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
}
data = {
    "messages": [
        {
            "role": "user",
            "content": "I've dynamically allocated an array of integers using 'new' but occasionally run into issues. Can you spot any memory-related problems?"
        },
        {
            "role": "system",
            "content": "You'll get a snippet of C++ code. Identify any memory leaks and recommend fixes."
        }
    ]
}
response = requests.post(url, headers=headers, json=data)`
      },
      {
        language: "JavaScript (Node.js)",
        code: `const axios = require('axios');

const url = "https://platform.keywordsai.co/api/generate/";
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
};
const data = {
    messages: [
        {
            role: "user",
            content: "I've dynamically allocated an array of integers using 'new' but occasionally run into issues. Can you spot any memory-related problems?"
        },
        {
            role: "system",
            content: "You'll get a snippet of C++ code. Identify any memory leaks and recommend fixes."
        }
    ]
};

axios.post(url, data, { headers: headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });`
      },
      {
        language: "PHP",
        code: `$url = 'https://platform.keywordsai.co/api/generate/';
$headers = [
    'Content-Type: application/json',
    'Authorization: Api-Key {YOUR_ACCESS_TOKEN}'
];
$data = [
    'messages' => [
        [
            'role' => 'user',
            'content' => "I've dynamically allocated an array of integers using 'new' but occasionally run into issues. Can you spot any memory-related problems?"
        ],
        [
            'role' => 'system',
            'content' => "You'll get a snippet of C++ code. Identify any memory leaks and recommend fixes."
        ]
    ]
];

$options = [
    'http' => [
        'header'  => $headers,
        'method'  => 'POST',
        'content' => json_encode($data),
    ],
];
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);`
      },
      {
        language: "Go (Golang)",
        code: `package main

import (
    "bytes"
    "net/http"
    "encoding/json"
    "fmt"
)

func main() {
    url := "https://platform.keywordsai.co/api/generate/"
    headers := map[string]string{
        "Content-Type": "application/json",
        "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}",
    }

    data := map[string][]map[string]string{
        "messages": {
            {
                "role": "user",
                "content": "I've dynamically allocated an array of integers using 'new' but occasionally run into issues. Can you spot any memory-related problems?",
            },
            {
                "role": "system",
                "content": "You'll get a snippet of C++ code. Identify any memory leaks and recommend fixes.",
            },
        },
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println(err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println(err)
        return
    }

    for key, value := range headers {
        req.Header.Set(key, value)
    }

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer resp.Body.Close()

    fmt.Println("Response status:", resp.Status)
}`
      }
    ],
  },
  {
    icon: <StateMachine />,
    title: "Evolutionary Biology Discussion",
    description:
      "Understand evolutionary mechanisms and their impact on species.",
    link: "",
    systemPrompt:
      "You will be provided with a query related to evolution, and your task is to provide an in-depth explanation.",
    userPrompt:
      "Discuss the significance of the Galápagos finches in understanding natural selection.",
    sampleResponse:
      'The Galápagos finches, often referred to as "Darwin\'s finches", played a pivotal role in shaping the theory of natural selection. Found on the Galápagos Islands, these finches exhibit a remarkable variety of beak shapes and sizes, each adapted to a specific diet ranging from seeds to insects. Darwin observed these variations and proposed that the finches had evolved from a common ancestor, but diverged over time as they adapted to different ecological niches. Their diverse beaks serve as a compelling illustration of how species can adapt and evolve in response to environmental pressures, providing key evidence for the theory of natural selection.',
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
-H "Content-Type: application/json" 
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
-d '{
    "messages":[{
        "role":"user",
        "content":"Discuss the significance of the Galápagos finches in understanding natural selection."
        
    },
    {
      "role":"system",
      "content": "You will be provided with a query related to evolution, and your task is to provide an in-depth explanation.",
    }],
}'`,
      },
      {
        language: "Python",
        code: `import requests

url = "https://platform.keywordsai.co/api/generate/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
}
data = {
    "messages": [
        {
            "role": "user",
            "content": "Discuss the significance of the Galápagos finches in understanding natural selection."
        },
        {
            "role": "system",
            "content": "You will be provided with a query related to evolution, and your task is to provide an in-depth explanation."
        }
    ]
}
response = requests.post(url, headers=headers, json=data)`
      },
      {
        language: "JavaScript (Node.js)",
        code: `const axios = require('axios');

const url = "https://platform.keywordsai.co/api/generate/";
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
};
const data = {
    messages: [
        {
            role: "user",
            content: "Discuss the significance of the Galápagos finches in understanding natural selection."
        },
        {
            role: "system",
            content: "You will be provided with a query related to evolution, and your task is to provide an in-depth explanation."
        }
    ]
};

axios.post(url, data, { headers: headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });`
      },
      {
        language: "PHP",
        code: `$url = 'https://platform.keywordsai.co/api/generate/';
$headers = [
    'Content-Type: application/json',
    'Authorization: Api-Key {YOUR_ACCESS_TOKEN}'
];
$data = [
    'messages' => [
        [
            'role' => 'user',
            'content' => 'Discuss the significance of the Galápagos finches in understanding natural selection.'
        ],
        [
            'role' => 'system',
            'content' => 'You will be provided with a query related to evolution, and your task is to provide an in-depth explanation.'
        ]
    ]
];

$options = [
    'http' => [
        'header'  => $headers,
        'method'  => 'POST',
        'content' => json_encode($data),
    ],
];
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);`
      },
      {
        language: "Go (Golang)",
        code: `package main

import (
    "bytes"
    "net/http"
    "encoding/json"
    "fmt"
)

func main() {
    url := "https://platform.keywordsai.co/api/generate/"
    headers := map[string]string{
        "Content-Type": "application/json",
        "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}",
    }

    data := map[string][]map[string]string{
        "messages": {
            {
                "role": "user",
                "content": "Discuss the significance of the Galápagos finches in understanding natural selection.",
            },
            {
                "role": "system",
                "content": "You will be provided with a query related to evolution, and your task is to provide an in-depth explanation.",
            },
        },
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println(err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println(err)
        return
    }

    for key, value := range headers {
        req.Header.Set(key, value)
    }

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer resp.Body.Close()

    fmt.Println("Response status:", resp.Status)
}`
      }
    ],
  },
  {
    icon: <Noodles />,
    title: "Recipe Ingredient Substitute",
    description: "Suggest alternatives for missing ingredients.",
    link: "",
    systemPrompt:
      "Mention an ingredient you don't have, and get a suitable replacement suggestion.",
    userPrompt: "I don't have butter.",
    sampleResponse: "You can use olive oil or margarine as a substitute.",
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
        -H "Content-Type: application/json" 
        -H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
        -d '{
            "messages":[{
                "role":"user",
                "content":"I don't have butter."
                
            },
            {
              "role":"system",
              "content": "Mention an ingredient you don't have, and get a suitable replacement suggestion.",
            }],
        }'`,
      },
      {
        language: "Python",
        code: `import requests

url = "https://platform.keywordsai.co/api/generate/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
}
data = {
    "messages": [
        {
            "role": "user",
            "content": "I don't have butter."
        },
        {
            "role": "system",
            "content": "Mention an ingredient you don't have, and get a suitable replacement suggestion."
        }
    ]
}
response = requests.post(url, headers=headers, json=data)`
      },
      {
        language: "JavaScript (Node.js)",
        code: `const axios = require('axios');

const url = "https://platform.keywordsai.co/api/generate/";
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
};
const data = {
    messages: [
        {
            role: "user",
            content: "I don't have butter."
        },
        {
            role: "system",
            content: "Mention an ingredient you don't have, and get a suitable replacement suggestion."
        }
    ]
};

axios.post(url, data, { headers: headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });`
      },
      {
        language: "PHP",
        code: `$url = 'https://platform.keywordsai.co/api/generate/';
$headers = [
    'Content-Type: application/json',
    'Authorization: Api-Key {YOUR_ACCESS_TOKEN}'
];
$data = [
    'messages' => [
        [
            'role' => 'user',
            'content' => 'I don't have butter.'
        ],
        [
            'role' => 'system',
            'content' => 'Mention an ingredient you don't have, and get a suitable replacement suggestion.'
        ]
    ]
];

$options = [
    'http' => [
        'header'  => $headers,
        'method'  => 'POST',
        'content' => json_encode($data),
    ],
];
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);`
      },
      {
        language: "Go (Golang)",
        code: `package main

import (
    "bytes"
    "net/http"
    "encoding/json"
    "fmt"
)

func main() {
    url := "https://platform.keywordsai.co/api/generate/"
    headers := map[string]string{
        "Content-Type": "application/json",
        "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}",
    }

    data := map[string][]map[string]string{
        "messages": {
            {
                "role": "user",
                "content": "I don't have butter.",
            },
            {
                "role": "system",
                "content": "Mention an ingredient you don't have, and get a suitable replacement suggestion.",
            },
        },
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println(err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println(err)
        return
    }

    for key, value := range headers {
        req.Header.Set(key, value)
    }

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer resp.Body.Close()

    fmt.Println("Response status:", resp.Status)
}`
      }
    ],
  },
  {
    icon: <ChartTree />,
    title: "Business Model Feedback",
    description: "Assess and optimize new business models for viability",
    link: "",
    systemPrompt:
      "You will be provided with an outline of a business model, and your task is to evaluate its potential and suggest areas of improvement.",
    userPrompt: "I'm planning to start a subscription-based online platform where users can access premium cooking tutorials from renowned chefs worldwide. The content will range from beginner to advanced courses, with interactive Q&A sessions after each class. We're targeting working professionals who want to learn gourmet cooking.",
    sampleResponse: "Your idea taps into the increasing trend of online learning and the niche of gourmet cooking. Consider offering tiered subscriptions (basic, premium, elite) based on content access and interactivity. Also, partnerships with celebrity chefs or food influencers can significantly boost your platform's appeal. Don't forget to have a user-friendly interface and mobile accessibility.",
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
  -H "Content-Type: application/json" 
  -H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
  -d '{
      "messages":[{
          "role":"user",
          "content":"I'm planning to start a subscription-based online platform where users can access premium cooking tutorials from renowned chefs worldwide. The content will range from beginner to advanced courses, with interactive Q&A sessions after each class. We're targeting working professionals who want to learn gourmet cooking."
      },
      {
          "role":"system",
          "content": "You will be provided with an outline of a business model, and your task is to evaluate its potential and suggest areas of improvement."
      }],
  }'`
      },
      {
        language: "Python",
        code: `import requests
  
  url = "https://platform.keywordsai.co/api/generate/"
  headers = {
      "Content-Type": "application/json",
      "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
  }
  data = {
      "messages": [
          {
              "role": "user",
              "content": "I'm planning to start a subscription-based online platform where users can access premium cooking tutorials from renowned chefs worldwide. The content will range from beginner to advanced courses, with interactive Q&A sessions after each class. We're targeting working professionals who want to learn gourmet cooking."
          },
          {
              "role": "system",
              "content": "You will be provided with an outline of a business model, and your task is to evaluate its potential and suggest areas of improvement."
          }
      ]
  }
  response = requests.post(url, headers=headers, json=data)`
      },
      {
        language: "JavaScript (Node.js)",
        code: `const axios = require('axios');
  
  const url = "https://platform.keywordsai.co/api/generate/";
  const headers = {
      "Content-Type": "application/json",
      "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
  };
  const data = {
      messages: [
          {
              role: "user",
              content: "I'm planning to start a subscription-based online platform where users can access premium cooking tutorials from renowned chefs worldwide. The content will range from beginner to advanced courses, with interactive Q&A sessions after each class. We're targeting working professionals who want to learn gourmet cooking."
          },
          {
              role: "system",
              content: "You will be provided with an outline of a business model, and your task is to evaluate its potential and suggest areas of improvement."
          }
      ]
  };
  
  axios.post(url, data, { headers: headers })
      .then(response => {
          console.log(response.data);
      })
      .catch(error => {
          console.error(error);
      });`
      },
      {
        language: "PHP",
        code: `$url = 'https://platform.keywordsai.co/api/generate/';
  $headers = [
      'Content-Type: application/json',
      'Authorization: Api-Key {YOUR_ACCESS_TOKEN}'
  ];
  $data = [
      'messages' => [
          [
              'role' => 'user',
              'content' => 'I'm planning to start a subscription-based online platform where users can access premium cooking tutorials from renowned chefs worldwide. The content will range from beginner to advanced courses, with interactive Q&A sessions after each class. We're targeting working professionals who want to learn gourmet cooking.'
          ],
          [
              'role' => 'system',
              'content' => 'You will be provided with an outline of a business model, and your task is to evaluate its potential and suggest areas of improvement.'
          ]
      ]
  ];
  
  $options = [
      'http' => [
          'header'  => $headers,
          'method'  => 'POST',
          'content' => json_encode($data),
      ],
  ];
  $context  = stream_context_create($options);
  $result = file_get_contents($url, false, $context);`
      },
      {
        language: "Go (Golang)",
        code: `package main
  
  import (
      "bytes"
      "net/http"
      "encoding/json"
      "fmt"
  )
  
  func main() {
      url := "https://platform.keywordsai.co/api/generate/"
      headers := map[string]string{
          "Content-Type": "application/json",
          "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}",
      }
  
      data := map[string][]map[string]string{
          "messages": {
              {
                  "role": "user",
                  "content": "I'm planning to start a subscription-based online platform where users can access premium cooking tutorials from renowned chefs worldwide. The content will range from beginner to advanced courses, with interactive Q&A sessions after each class. We're targeting working professionals who want to learn gourmet cooking.",
              },
              {
                  "role": "system",
                  "content": "You will be provided with an outline of a business model, and your task is to evaluate its potential and suggest areas of improvement.",
              },
          },
      }
  
      jsonData, err := json.Marshal(data)
      if err != nil {
          fmt.Println(err)
          return
      }
  
      req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
      if err != nil {
          fmt.Println(err)
          return
      }
  
      for key, value := range headers {
          req.Header.Set(key, value)
      }
  
      client := &http.Client{}
      resp, err := client.Do(req)
      if err != nil {
          fmt.Println(err)
          return
      }
      defer resp.Body.Close()
  
      fmt.Println("Response status:", resp.Status)
  }`
      }
    ]

  },
  {
    icon: <StarFourPts />,
    title: "Algorithm Optimization",
    description: "Enhance the efficiency of given algorithms.",
    link: "",
    systemPrompt:
      "You will be presented with an algorithm. Identify bottlenecks and suggest improvements.",
    userPrompt: "I have a bubble sort algorithm to sort an array of integers. How can I make it more efficient?",
    sampleResponse: "Bubble sort is inherently inefficient for larger datasets due to its quadratic time complexity. For a more efficient sorting method, consider using algorithms like QuickSort, MergeSort, or even the built-in sort functions which typically use optimized versions of these algorithms. If you're set on using Bubble Sort, one small optimization is to note when no swaps have occurred in a pass, which means the list is already sorted.",
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
  -H "Content-Type: application/json" 
  -H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
  -d '{
      "messages":[{
          "role":"user",
          "content":"I have a bubble sort algorithm to sort an array of integers. How can I make it more efficient?",
          "sampleResponse": "Bubble sort is inherently inefficient for larger datasets due to its quadratic time complexity. For a more efficient sorting method, consider using algorithms like QuickSort, MergeSort, or even the built-in sort functions which typically use optimized versions of these algorithms. If you're set on using Bubble Sort, one small optimization is to note when no swaps have occurred in a pass, which means the list is already sorted."
      },
      {
          "role":"system",
          "content": "You will be presented with an algorithm. Identify bottlenecks and suggest improvements.",
      }],
  }'`
      },
      {
        language: "Python",
        code: `import requests
  
  url = "https://platform.keywordsai.co/api/generate/"
  headers = {
      "Content-Type": "application/json",
      "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
  }
  data = {
      "messages": [
          {
              "role": "user",
              "content": "I have a bubble sort algorithm to sort an array of integers. How can I make it more efficient?",
              "sampleResponse": "Bubble sort is inherently inefficient for larger datasets due to its quadratic time complexity. For a more efficient sorting method, consider using algorithms like QuickSort, MergeSort, or even the built-in sort functions which typically use optimized versions of these algorithms. If you're set on using Bubble Sort, one small optimization is to note when no swaps have occurred in a pass, which means the list is already sorted."
          },
          {
              "role": "system",
              "content": "You will be presented with an algorithm. Identify bottlenecks and suggest improvements."
          }
      ]
  }
  
  response = requests.post(url, headers=headers, json=data)
  print(response.json())`
      },
      {
        language: "JavaScript",
        code: `const url = 'https://platform.keywordsai.co/api/generate/';
  const headers = {
      "Content-Type": "application/json",
      "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
  };
  const data = {
      messages: [
          { 
              role: "user", 
              content: "I have a bubble sort algorithm to sort an array of integers. How can I make it more efficient?",
              sampleResponse: "Bubble sort is inherently inefficient for larger datasets due to its quadratic time complexity. For a more efficient sorting method, consider using algorithms like QuickSort, MergeSort, or even the built-in sort functions which typically use optimized versions of these algorithms. If you're set on using Bubble Sort, one small optimization is to note when no swaps have occurred in a pass, which means the list is already sorted."
          },
          { 
              role: "system", 
              content: "You will be presented with an algorithm. Identify bottlenecks and suggest improvements." 
          }
      ]
  };
  
  fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`
      },
      {
        language: "PHP",
        code: `<?php
  $url = "https://platform.keywordsai.co/api/generate/";
  $headers = array(
      "Content-Type: application/json",
      "Authorization: Api-Key {YOUR_ACCESS_TOKEN}"
  );
  $data = array(
      "messages" => array(
          array(
              "role" => "user", 
              "content" => "I have a bubble sort algorithm to sort an array of integers. How can I make it more efficient?",
              "sampleResponse" => "Bubble sort is inherently inefficient for larger datasets due to its quadratic time complexity. For a more efficient sorting method, consider using algorithms like QuickSort, MergeSort, or even the built-in sort functions which typically use optimized versions of these algorithms. If you're set on using Bubble Sort, one small optimization is to note when no swaps have occurred in a pass, which means the list is already sorted."
          ),
          array(
              "role" => "system", 
              "content" => "You will be presented with an algorithm. Identify bottlenecks and suggest improvements."
          )
      )
  );
  
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
  
  $response = curl_exec($ch);
  curl_close($ch);
  print_r(json_decode($response, true));
  ?>`
      },
      {
        language: "Golang",
        code: `func main() {
    url := "https://platform.keywordsai.co/api/generate/"
    headers := map[string]string{
        "Content-Type":  "application/json",
        "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}",
    }

    data := map[string]interface{}{
        "messages": []map[string]interface{}{
            {
                "role":          "user",
                "content":       "I have a bubble sort algorithm to sort an array of integers. How can I make it more efficient?",
                "sampleResponse": "Bubble sort is inherently inefficient for larger datasets due to its quadratic time complexity. For a more efficient sorting method, consider using algorithms like QuickSort, MergeSort, or even the built-in sort functions which typically use optimized versions of these algorithms. If you're set on using Bubble Sort, one small optimization is to note when no swaps have occurred in a pass, which means the list is already sorted.",
            },
            {
                "role":    "system",
                "content": "You will be presented with an algorithm. Identify bottlenecks and suggest improvements.",
            },
        },
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println(err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println(err)
        return
    }

    for key, value := range headers {
        req.Header.Set(key, value)
    }

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        fmt.Println(err)
        return
    }

    fmt.Println(string(body))
}`}]

  },
  {
    icon: <ApacheKafka />,
    title: "Quantum Physics Exploration",
    description: "Dive deep into the intricacies of quantum mechanics.",
    link: "",
    systemPrompt:
      "You will be provided with a query related to quantum mechanics, and your task is to embark on a detailed exploration.",
    userPrompt: "Explain the double-slit experiment and its implications.",
    sampleResponse:
      "The double-slit experiment in quantum mechanics shows particles like electrons or photons displaying wave-like interference patterns. However, when observed directly, these particles revert to behaving like typical particles, with no interference. This experiment underscores the wave-particle duality of quantum entities. The results suggest particles exist in multiple states until observed, challenging traditional views of reality.",
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
  -H "Content-Type: application/json" 
  -H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
  -d '{
      "messages":[{
          "role":"user",
          "content":"Explain the double-slit experiment and its implications."
      },
      {
          "role":"system",
          "content": "You will be provided with a query related to quantum mechanics, and your task is to embark on a detailed exploration.",
      }],
  }'`
      },
      {
        language: "Python",
        code: `import requests
  
  url = "https://platform.keywordsai.co/api/generate/"
  headers = {
      "Content-Type": "application/json",
      "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
  }
  data = {
      "messages": [
          {
              "role": "user",
              "content": "Explain the double-slit experiment and its implications."
          },
          {
              "role": "system",
              "content": "You will be provided with a query related to quantum mechanics, and your task is to embark on a detailed exploration."
          }
      ]
  }
  
  response = requests.post(url, headers=headers, json=data)
  print(response.json())`
      },
      {
        language: "JavaScript",
        code: `const url = 'https://platform.keywordsai.co/api/generate/';
  const headers = {
      "Content-Type": "application/json",
      "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
  };
  const data = {
      messages: [
          { role: "user", content: "Explain the double-slit experiment and its implications." },
          { role: "system", content: "You will be provided with a query related to quantum mechanics, and your task is to embark on a detailed exploration." }
      ]
  };
  
  fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`
      },
      {
        language: "PHP",
        code: `<?php
  $url = "https://platform.keywordsai.co/api/generate/";
  $headers = array(
      "Content-Type: application/json",
      "Authorization: Api-Key {YOUR_ACCESS_TOKEN}"
  );
  $data = array(
      "messages" => array(
          array("role" => "user", "content" => "Explain the double-slit experiment and its implications."),
          array("role" => "system", "content" => "You will be provided with a query related to quantum mechanics, and your task is to embark on a detailed exploration.")
      )
  );
  
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
  
  $response = curl_exec($ch);
  curl_close($ch);
  print_r(json_decode($response, true));
  ?>`
      },
      {
        language: "Golang",
        code: `package main
  
  import (
      "bytes"
      "encoding/json"
      "fmt"
      "net/http"
  )
  
  func main() {
      url := "https://platform.keywordsai.co/api/generate/"
      headers := map[string]string{
          "Content-Type":     "application/json",
          "Authorization":    "Api-Key {YOUR_ACCESS_TOKEN}",
      }
  
      data := map[string][]map[string]string{
          "messages": {
              {"role": "user", "content": "Explain the double-slit experiment and its implications."},
              {"role": "system", "content": "You will be provided with a query related to quantum mechanics, and your task is to embark on a detailed exploration."},
          },
      }
  
      jsonData, err := json.Marshal(data)
      if err != nil {
          panic(err)
      }
  
      resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
      if err != nil {
          panic(err)
      }
      defer resp.Body.Close()
  
      var result map[string]interface{}
      json.NewDecoder(resp.Body).Decode(&result)
      fmt.Println(result)
  }`
      }
    ]

  },
  {
    icon: <Compare />,
    title: "Literary Analysis",
    description: "Delve into the deeper meanings and themes of literary works.",
    link: "",
    systemPrompt:
      "You will be provided with a piece of literature or its segment, and your task is to give a thorough analysis.",
    userPrompt: "Analyze the theme of fate in Shakespeare's \"Romeo and Juliet\".",
    sampleResponse: "In Shakespeare's \"Romeo and Juliet,\" fate is an ever-present force, driving the narrative towards its tragic end. From the outset, the \"star-crossed lovers\" are depicted as bound by destiny. Omens, dreams, and references to the stars underline their predetermined path. Despite their passionate efforts, the lovers can't escape their fated tragedies, emphasizing the play's core message: while individuals can make choices, overarching forces often determine outcomes.",
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
-H "Content-Type: application/json" 
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
-d '{
    "messages":[{
        "role":"user",
        "content":"Analyze the theme of fate in Shakespeare's "Romeo and Juliet"."
    },
    {
        "role":"system",
        "content": "You will be provided with a piece of literature or its segment, and your task is to give a thorough analysis.",
    }],
}'`
      },
      {
        language: "Python",
        code: `import requests

url = "https://platform.keywordsai.co/api/generate/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
}
data = {
    "messages": [
        {
            "role": "user",
            "content": "Analyze the theme of fate in Shakespeare's 'Romeo and Juliet'."
        },
        {
            "role": "system",
            "content": "You will be provided with a piece of literature or its segment, and your task is to give a thorough analysis."
        }
    ]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`
      },
      {
        language: "JavaScript",
        code: `const url = 'https://platform.keywordsai.co/api/generate/';
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
};
const data = {
    messages: [
        { role: "user", content: "Analyze the theme of fate in Shakespeare's 'Romeo and Juliet'." },
        { role: "system", content: "You will be provided with a piece of literature or its segment, and your task is to give a thorough analysis." }
    ]
};

fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`
      },
      {
        language: "PHP",
        code: `<?php
$url = "https://platform.keywordsai.co/api/generate/";
$headers = array(
    "Content-Type: application/json",
    "Authorization: Api-Key {YOUR_ACCESS_TOKEN}"
);
$data = array(
    "messages" => array(
        array("role" => "user", "content" => "Analyze the theme of fate in Shakespeare's 'Romeo and Juliet'."),
        array("role" => "system", "content" => "You will be provided with a piece of literature or its segment, and your task is to give a thorough analysis.")
    )
);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
curl_close($ch);
print_r(json_decode($response, true));
?>`
      },
      {
        language: "Golang",
        code: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    url := "https://platform.keywordsai.co/api/generate/"
    headers := map[string]string{
        "Content-Type":     "application/json",
        "Authorization":    "Api-Key {YOUR_ACCESS_TOKEN}",
    }

    data := map[string][]map[string]string{
        "messages": {
            {"role": "user", "content": "Analyze the theme of fate in Shakespeare's 'Romeo and Juliet'."},
            {"role": "system", "content": "You will be provided with a piece of literature or its segment, and your task is to give a thorough analysis."},
        },
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        panic(err)
    }

    resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println(result)
}`
      }
    ]

  },
  {
    icon: <Python />,
    title: "Python Decorators",
    description: "Delve into advanced Python features to modify functions.",
    link: "",
    systemPrompt:
      "You will receive a Python function. Your task is to write a decorator that modifies its behavior.",
    userPrompt: "I have a function that prints a message. I want a decorator that makes sure the message is always printed in uppercase.",
    sampleResponse: (
      <span className="t-pre-wrap">
        {/* def uppercase_decorator(func):
        <br />
        &nbsp;&nbsp;def wrapper(*args, **kwargs):
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;original_result = func(*args, **kwargs)
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;modified_result = original_result.upper()
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return modified_result
            <br />
            &nbsp;&nbsp;return wrapper */}
        {"def uppercase_decorator(func):\n  def wrapper(*args, **kwargs):\n    original_result = func(*args, **kwargs)\n    modified_result = original_result.upper()\n    return modified_result\n  return wrapper"}
      </span>
    ),
    apiRequests: [
      {
        "language": "Bash",
        "code": `curl -X POST "https://platform.keywordsai.co/api/generate/" 
-H "Content-Type: application/json" 
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
-d '{
    "messages":[{
        "role":"user",
        "content":"I have a function that prints a message. I want a decorator that makes sure the message is always printed in uppercase."
    },
    {
        "role":"system",
        "content": "You will receive a Python function. Your task is to write a decorator that modifies its behavior.",
    }],
}'`
      },
      {
        "language": "Python",
        "code": `import requests

url = "https://platform.keywordsai.co/api/generate/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
}
data = {
    "messages": [
        {
            "role": "user",
            "content": "I have a function that prints a message. I want a decorator that makes sure the message is always printed in uppercase."
        },
        {
            "role": "system",
            "content": "You will receive a Python function. Your task is to write a decorator that modifies its behavior."
        }
    ]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`
      },
      {
        "language": "JavaScript",
        "code": `const url = 'https://platform.keywordsai.co/api/generate/';
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
};
const data = {
    messages: [
        { role: "user", content: "I have a function that prints a message. I want a decorator that makes sure the message is always printed in uppercase." },
        { role: "system", content: "You will receive a Python function. Your task is to write a decorator that modifies its behavior." }
    ]
};

fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`
      },
      {
        "language": "PHP",
        "code": `<?php
$url = "https://platform.keywordsai.co/api/generate/";
$headers = array(
    "Content-Type: application/json",
    "Authorization: Api-Key {YOUR_ACCESS_TOKEN}"
);
$data = array(
    "messages" => array(
        array("role" => "user", "content" => "I have a function that prints a message. I want a decorator that makes sure the message is always printed in uppercase."),
        array("role" => "system", "content" => "You will receive a Python function. Your task is to write a decorator that modifies its behavior.")
    )
);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
curl_close($ch);
print_r(json_decode($response, true));
?>`
      },
      {
        "language": "Golang",
        "code": `package main

import (
  "bytes"
  "encoding/json"
  "fmt"
  "net/http"
)

func main() {
  url := "https://platform.keywordsai.co/api/generate/"
  headers := map[string]string{
    "Content-Type":     "application/json",
    "Authorization":    "Api-Key {YOUR_ACCESS_TOKEN}",
  }

  data := map[string][]map[string]string{
    "messages": {
      {"role": "user", "content": "I have a function that prints a message. I want a decorator that makes sure the message is always printed in uppercase."},
      {"role": "system", "content": "You will receive a Python function. Your task is to write a decorator that modifies its behavior."},
    },
  }

  jsonData, err := json.Marshal(data)
  if err != nil {
    panic(err)
  }

  resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  var result map[string]interface{}
  json.NewDecoder(resp.Body).Decode(&result)
  fmt.Println(result)
}`
      }
    ]


  },
  {
    icon: <BookOpen />,
    title: "Book Summarizer",
    description: "Provide concise summaries of books.",
    link: "",
    systemPrompt:
      "Name a book, and get a quick summary.",
    userPrompt: "Moby Dick.",
    sampleResponse: "A sailor named Ishmael narrates his adventures with Captain Ahab, who's obsessed with hunting the white whale, Moby Dick.",
    apiRequests: [
      {
        language: "Bash",
        code: `curl -X POST "https://platform.keywordsai.co/api/generate/" 
-H "Content-Type: application/json" 
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}" 
-d '{
    "messages":[{
        "role":"user",
        "content":"Moby Dick."
        
    },
    {
      "role":"system",
      "content": "Name a book, and get a quick summary.",
    }],
}'`,
      },
      {
        language: "Python",
        code: `import requests

url = "https://platform.keywordsai.co/api/generate/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
}
data = {
    "messages": [
        {
            "role": "user",
            "content": "Moby Dick."
        },
        {
            "role": "system",
            "content": "Name a book, and get a quick summary."
        }
    ]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,
      },
      {
        language: "JavaScript",
        code: `const url = 'https://platform.keywordsai.co/api/generate/';
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key {YOUR_ACCESS_TOKEN}"
};
const data = {
    messages: [
        { role: "user", content: "Moby Dick." },
        { role: "system", content: "Name a book, and get a quick summary." }
    ]
};

fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
`,
      },
      {
        language: "PHP",
        code: `$url = "https://platform.keywordsai.co/api/generate/";
$headers = array(
    "Content-Type: application/json",
    "Authorization: Api-Key {YOUR_ACCESS_TOKEN}"
);
$data = array(
    "messages" => array(
        array("role" => "user", "content" => "Moby Dick."),
        array("role" => "system", "content" => "Name a book, and get a quick summary.")
    )
);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
curl_close($ch);
print_r(json_decode($response, true));

        `,
      },
      {
        language: "Golang",
        code: `package main

import (
  "bytes"
  "encoding/json"
  "fmt"
  "net/http"
)

func main() {
  url := "https://platform.keywordsai.co/api/generate/"
  headers := map[string]string{
    "Content-Type":     "application/json",
    "Authorization":    "Api-Key {YOUR_ACCESS_TOKEN}",
  }

  data := map[string][]map[string]string{
    "messages": {
      {"role": "user", "content": "Moby Dick."},
      {"role": "system", "content": "Name a book, and get a quick summary."},
    },
  }

  jsonData, err := json.Marshal(data)
  if err != nil {
    panic(err)
  }

  resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  var result map[string]interface{}
  json.NewDecoder(resp.Body).Decode(&result)
  fmt.Println(result)
}

        `,
      },
    ],
  },

];
export default function Examples() {
  return (
    <div className="main-section-bottom bg-white">
      <div className="items-start max-width-container">
        <LargeTextTitle
        title="Examples"
        subtitle="Explore what's possible with some example applications"
        />
        <div className="flex-row gap-lg items-start justify-start flex-wrap example-container">
          {exampleCards.map((card, index) => (
            <ExampleCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}