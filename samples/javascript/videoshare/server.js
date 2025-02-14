const express = require('express');
const fileUpload = require('express-fileupload');
const { WebPubSubServiceClient } = require('@azure/web-pubsub');

const app = express();

const hubName = 'video';
let serviceClient = new WebPubSubServiceClient(process.argv[2] || process.env.Web_PubSub_ConnectionString, hubName);

app.use(fileUpload());
app
  .get('/negotiate', async (req, res) => {
    let token = await serviceClient.getAuthenticationToken({
      roles: ['webpubsub.sendToGroup', 'webpubsub.joinLeaveGroup']
    });
    res.json({
      url: token.url
    });
  });
  
app.use(express.static('dist'));
app.listen(8080, () => console.log('app started'));
