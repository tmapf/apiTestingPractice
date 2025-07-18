import {test, expect} from "@playwright/test";

test('api get request', async ({request}) => {
    const response = await request.get(`http://localhost:3000/api`);
})