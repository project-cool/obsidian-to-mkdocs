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
        console.log('Successfully uploaded to Netlify', { responseData: response?.status })
        console.log(`Site is live at ${response?.data?.ssl_url}`, { data: response?.data })
    } catch (error) {
        console.log('Error while uploading to Netlify', { error })
    }
})()
