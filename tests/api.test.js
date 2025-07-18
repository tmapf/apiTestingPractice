import {test, expect, request} from "@playwright/test";

const VIDEO_ID = 'XEZYadc2o-8';




test.only('api get request', async () => {

    const baseURL = 'https://www.googleapis.com/youtube/v3'
    const context = await request.newContext();

    const response = await context.get(`${baseURL}/commentThreads`, {
        params: {
            part: 'snippet',
            videoId: VIDEO_ID,
            key: API_TOKEN,
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