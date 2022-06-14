import axios from 'axios'
import fs from 'fs'

(async () => {

    const docsPath = process.argv[2];
    const siteId = process.argv[3];
    const token = process.argv[4];

    const docsZip = fs.readFileSync(`${docsPath}.zip`)

    try {
        const response = await axios.post(
            `https://api.netlify.com/api/v1/sites/${siteId}/deploys`,
            docsZip,
            {
                headers: {
                    'Content-Type': 'application/zip',
                    'Authorization': `Bearer ${token}`
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            }
        );
        console.log('Status Code of uploading to Netlify', { responseData: response.status })
    } catch (error) {
        console.log('Error while uploading', { error })
        // if (error.response.status === 401) {
        //     console.error('Status Code 401: Netlify Token is incorrect')
        // } else if (error.response.status === 404) {
        //     console.error('Status Code 404: Site ID is incorrect')
        // } else {
        //     console.error('Error while uploading to Netlify', { error: error.response.status });
        // }
    }
})()
