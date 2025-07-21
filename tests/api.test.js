import {test, expect, request} from "@playwright/test";



test('api get request', async () => {
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


    //TODO: Bad request, search_product parameter is missing in POST request
    test('Post to search product API 5',  async ({request}) => {
        const response = await request.post(`${baseURL}/searchProduct`,{
            search_product: 'top',
            data: {
                search_product: 'top',
            },
            params: {
                search_product: 'top',
            },
            headers:{
                'accept': 'application/json',
                'content-type': 'application/json',
            }
        });

        console.log(await response.text());

    })

    //TODO: Doesn't work as website is broken
    test('Post to create/register user API 11',  async ({request}) => {
        const response = await request.post(`${baseURL}/createAccount`, {
            params: {
                name: 'john_doe',
                email: 'john_doe@example.com',
                password: 'securePassword123',
                title: 'Mr',
                birth_date: '15',
                birth_month: '05',
                birth_year: '1990',
                firstname: 'John',
                lastname: 'Doe',
                company: 'TestCorp',
                address1: '123 Main Street',
                address2: 'Apt 4B',
                country: 'Canada',
                zipcode: 'M4B1B3',
                state: 'Ontario',
                city: 'Toronto',
                mobile_number: '+11234567890',
            },
            headers: {

                'content-type': 'application/json',
            }
        })
        console.log(await response.text());
    })
})

test.describe('fakestoreapi.com api testing', async () => {
    const baseURL = 'https://fakestoreapi.com';
    const user = {
        id: 0,
        username: 'john_doe',
        email: 'john_doe@example.com',
        password: '12345678',
    }
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