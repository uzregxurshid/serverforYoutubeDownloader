const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
app.use(cors())
const fs = require('fs');
const ytdl = require('ytdl-core');
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  try {
    // url get from client form
    const url = req.query.url;
    // get the video id from the url
    const info = await (await ytdl.getInfo(url)).formats.filter(item=>item.audioBitrate!==null);
    fs.writeFile('./data.json', JSON.stringify(info), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    return res.status(200).json({
      status: 'success',
      data: info
    });
  } catch (error) {
    return res.status(200).json({
      status: 'error',
      message: error.message
    });

  }
});


app.listen(port, () => console.log('> Server is up and running on port : ' + port))