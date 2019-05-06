# Serverless GraphQL API

## Stack

* Serverless
* AWS Lambda
* GraphQL
* Apollo
* DynamoDB

## Database structure
```json
{
    "type": "user",
    "id": "4e961c30-6f2e-11e9-bac8-e197c2b78e70",
    "owner": "Peter Smith",
    "created": "1557064025872",
    "batch": [
        {
            "type": "batch",
            "id": "56841c50-6f31-11e9-bac8-e197c2b78e70",
            "created": "1557064371066",
            "log": [
                {
                    "type": "batch_log",
                    "id": "5cb8db10-6f31-11e9-bac8-e197c2b78e70",
                    "created": "1557064371066",
                    "temperature": 22,
                    "ph": 6.1,
                }
            ]
        },
    ],
    "plant": [
        {
            "type": "plant_log",
            "id": "5b9a4bb0-6f31-11e9-bac8-e197c2b78e70",
            "created": "1557064371066",
            "batch_id": "56841c50-6f31-11e9-bac8-e197c2b78e70",
            "variety": "Tomato",
            "notes": "",
            "log": [
                {
                    "type": "plant_log",
                    "id": "5cb8db10-6f31-11e9-bac8-e197c2b78e70",
                    "created": "1557064371066",
                    "notes": ""
                }
            ]
        },
    ],
    "": "",
}
```
