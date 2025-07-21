import {test, expect, request} from "@playwright/test";


test.describe('youtube.com api testing', async () => {
    test('youtube.com api get comment under a given video ', async () => {
        const baseURL = 'https://www.googleapis.com/youtube/v3'
        const VIDEO_ID = 'XEZYadc2o-8';
        const context = await request.newContext();
        const response = await context.get(`${baseURL}/commentThreads`, {
            params: {
                part: 'snippet',
                videoId: VIDEO_ID,
                key: process.env.API_TOKEN,
                maxResults: 5,
            }
        });

        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        for (const item of data.items) {
            const comment = item.snippet.topLevelComment.snippet.textDisplay;
            console.log(comment + '\n');
        }
    })
})

test.describe('automationexercise.com api testing', async () => {

    const baseURL = 'https://automationexercise.com/api';

    test('Get all product list API 1',  async ({request}) => {
        const response = await request.get(`${baseURL}/productsList`);
        expect(response.status()).toBe(200);
        console.log(await response.json());
    })

    test('Post to all product list API 2',  async ({request}) => {
        const response = await request.post(`${baseURL}/productsList`, {
            data: {
                id: 1,
                name: "Blue Top",
                price: "Rs. 500",
                brand: "Polo",
                category: {
                    usertype: {
                        usertype: "Women"
                    },
                    category: "Tops"
                },
            },
        });
        const jsonResponse = await response.json();
        expect(jsonResponse.responseCode).toBe(405);
    })

    test('Get all brands list API 3',  async ({request}) => {
        const response = await request.get(`${baseURL}/brandsList`, {
            headers: {
                'accept':  'application/json',
            }
        });
        expect(response.status()).toBe(200);
        console.log(await response.json());
    })

    test('Put to all brands list API 4',  async ({request}) => {
        const response = await request.put(`${baseURL}/brandsList`, {
            data: {
                brands: [{id: 1}, {id: 2}]
            },
            headers:{
                'content-type': 'application/json',
            }
        });
        const jsonResponse = await response.json();
        expect(jsonResponse.responseCode).toBe(405);
    })

})

test.describe('fakestoreapi.com api testing', async () => {
    const baseURL = 'https://fakestoreapi.com';

    test('Create a new user',  async ({request}) => {
        const response = await request.post(`${baseURL}/users`, {
            headers: {
                'content-type': 'application/json',
            },
            body: {
                id: 0,
                username: 'john_doe',
                email: 'john_doe@example.com',
                password: '12345678',
            }

        });
        expect(response.status()).toBe(200);
        console.log(await response.json());
    })

    test('Get all users', async ({request}) => {
        const response = await request.get(`${baseURL}/users`);
        expect(response.status()).toBe(200);
        console.log(await response.json());
    })

    test('Get a user', async ({request}) => {
        const id = 5;
        const response = await request.get(`${baseURL}/users/${id}`);
        expect(response.status()).toBe(200);
        console.log(await response.json());
    })

    test('Update a user', async ({request}) => {
        const id = 5;
        const response = await request.put(`${baseURL}/users/${id}`, {
            body: {
                id: 90,
                username: 'john_doe',
                email: 'john_doe@example.com',
                password: '12345678',
            },
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
            }
        });
        expect(response.status()).toBe(200);
        console.log(await response.json());
    })

    test('Delete a user', async ({request}) => {
        const id = 590;
        const response = await request.delete(`${baseURL}/users/${id}`);
        expect(response.status()).toBe(200);
    })

})

test.describe('dummyjson.com api testing', async () => {
    const baseURL = 'https://dummyjson.com';

    test('Get all users', async ({request}) => {
        const response = await request.get(`${baseURL}/users`);
        expect(response.status()).toBe(200);
        console.log(await response.json());
    });

    test('Create a user', async ({request}) => {
        const response = await request.post(`${baseURL}/users/add`,{
            data: {
                firstName: 'John',
                lastName: 'Doe',
                age: 100,
                gender: 'male',
            },
            headers: {
                'content-type': 'application/json',
            }
        });
        expect(response.status()).toBe(201);
        expect(await response.json()).toHaveProperty('firstName', 'John');
        console.log(await response.json());
    });

    test('Update a user', async ({request}) => {
        const id = 20
        const response = await request.patch(`${baseURL}/users/${id}`, {
            data: {
                firstName: 'johnUPDATED',
                lastName: 'DoeUPDATED',
                gender: 'female',
                age: 1209039,
            }
        });
        expect(response.status()).toBe(200);
        expect(await response.json()).toHaveProperty('firstName', 'johnUPDATED');
        console.log(await response.json());
    });

    test('Login a user', async ({request}) => {
        const response = await request.post(`${baseURL}/user/login`, {
            data: {
                username: 'oliviaw',
                password: 'oliviawpass',
                expiresInMins: 5,
            },
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
            }
        });
        expect(response.status()).toBe(200);
        console.log(await response.json());
    })

    test('Login a user and get its data', async ({request}) => {
        const response = await request.post(`${baseURL}/user/login`, {
            data: {
                username: 'oliviaw',
                password: 'oliviawpass',
                expiresInMins: 5,
            },
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
            }
        });
        expect(response.status()).toBe(200);
        const token = await response.json();

        const getResponse = await request.get(`${baseURL}/user/me`, {
            headers: {
                'Authorization': `Bearer ${token.accessToken}`
            },
            credentials: 'include',
        });

        expect(getResponse.status()).toBe(200);
        expect(await response.json()).toHaveProperty('username', 'oliviaw');
        console.log(await getResponse.json());
    })


})