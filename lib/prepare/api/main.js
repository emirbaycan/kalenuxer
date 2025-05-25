import { preparePHPs } from './php/main.js';

export async function prepareApi() {
    console.log('preparing api files');

    await preparePHPs();
}