// server.js

import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { gql, GraphQLClient } from 'graphql-request'
import { Web3Storage, getFilesFromPath, File } from 'web3.storage'

// Load environment variables from .env file
dotenv.config();

const app = express();
const WEB3STORAGE_TOKEN = process.env.WEB3STORAGE_TOKEN;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URI =process.env.GITHUB_CALLBACK;

function makeStorageClient () {
  return new Web3Storage({ token: WEB3STORAGE_TOKEN })
}
function makeFileObjects (obj, name) {
  const buffer = Buffer.from(JSON.stringify(obj))

  const files = [
    new File([buffer], `${name}.json`)
  ]
  return files
}

function makeStringFile (txt, name) {
  const files = [
    new File([txt], `${name}.txt`),
  ]
  return files
}

async function storeFiles (files) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // replace * with your app's URL if possible
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.get("/github/login", (req, res) => {
  console.log("Trying to login");
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`
  );
});
app.get("/github/callback", async (req, res) => {
  try {
    const code = req.query.code;
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
      }
    );
    let data = response.data;
    const access_token = data.split("=")[1].split("&")[0];
    const user = await axios.get(`https://api.github.com/user`,
      {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    res.redirect(`http://localhost:3000/github/callback?username=${user.data.login}`)
  } catch (error) {
    res.send({
      e: error,
    });
  }
});

app.post("/generate", async (req, res) => {
  try {
    const github = req.body.github;
    const instagram = req.body.instagram;
    const twitter = req.body.twitter;
    const telegram = req.body.telegram
    const attributes = []
    if (github){
      attributes.push(
        {
          "trait_type": "Github",
          "value": github
        }
      )
    }
    if (instagram){
      attributes.push(
        {
          "trait_type": "Instagram",
          "value": instagram
        }
      )
    }
    if (twitter){
      attributes.push(
        {
          "trait_type": "Twitter",
          "value": twitter
        }
      )
    }
    if (telegram){
      attributes.push(
        {
          "trait_type": "Telegram",
          "value": telegram
        }
      )
    }
    const socialFile = await makeFileObjects({
      "name": "0xVeriSocial",
      "description": "",
      "attributes": attributes
  }, 'socialFile')
    const socialCID = await storeFiles(socialFile)
    res.send({
      cid: socialCID
    });
  } catch (error) {
    console.log(error)
    res.send({
      e: error,
    });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
