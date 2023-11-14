export const dummyData = {
    "store": {
        "book": [
            {
                "category": "reference",
                "author": "Nigel Rees",
                "title": "Sayings of the Century",
                "price": 8.95,
                "available": true,
            },
            {
                "category": "fiction",
                "author": "Evelyn Waugh",
                "title": "Sword of Honour",
                "available": false,
                "price": 12.99
            },
            {
                "category": "fiction",
                "author": "Herman Melville",
                "title": "Smith of Wootton Major",
                "isbn": "0-553-21311-3",
                "price": 8.99
            },
            {
                "category": "fiction",
                "author": "J. R. R. Tolkien",
                "title": "The Lord of the Rings",
                "isbn": "0-395-19395-8",
                "price": 22.99
            }
        ],
        "bicycle": {
            "color": "red",
            "price": 19.95
        }
    },
    "reservations": [
        {
            "instances": [
                { "state": "running" },
                { "state": "stopped" }
            ]
        },
        {
            "instances": [
                { "state": "terminated" },
                { "state": "running" }
            ]
        }
    ],
    "people": [
        {
            "age": 20,
            "other": "foo",
            "name": "Bob"
        },
        {
            "age": 25,
            "other": "bar",
            "name": "Fred"
        },
        {
            "age": 30,
            "other": "baz",
            "name": "George"
        }
    ]
}