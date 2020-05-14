import axios from 'axios';

import * as c from './constants';
import data from './ecoach.json'
import db from '@react-native-firebase/database';

import fb  from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDfS_JJH3nFlZZtOp8TrXSRX3AljJz11bc",
    authDomain: "ecoach-2dd8b.firebaseapp.com",
    databaseURL: "https://ecoach-2dd8b.firebaseio.com",
    projectId: "ecoach-2dd8b",
    storageBucket: "ecoach-2dd8b.appspot.com",
    messagingSenderId: "1022388543863",
    appId: "1:1022388543863:web:8e361902dc0b038a188172",
    measurementId: "G-5PFVCLC42K"
  };

export async function getHeadlines(country = "us"){
    try{
        // let requests = [];
        // c.CATEGORIES.map((category) => {
        //     let url =  `${c.HEADLINES}&country=${country}&category=${category.toLowerCase()}`;
        //     requests.push(axios.get(url))
        // });

        // let response = await Promise.all(requests);
        // response.map((resp, idx) => {
        //     let {articles, totalResults} = resp.data;

        //     response[idx] = {articles, totalResults};
        // });
        var response;
        var app;
        if (!fb.apps.length) {
             app =  fb.initializeApp(firebaseConfig);
        }
        const db = app.database();
        await db.ref('/')
        .once('value')
        .then(snapshot => {
          console.log('User data: ', snapshot.val());
          let items = snapshot.val()
          response = {...items}
        });
        // db.ref('/').on('value', querySnapShot => {
        //     let data = querySnapShot.val() ? querySnapShot.val() : {};

        //     // let {articles, totalResults} = data;
        //     // response = {articles, totalResults}
        //   });
        let {articles, totalResults} = {...response};

       // response[0] = {articles, totalResults};
        let [technology] = [{articles, totalResults}];

        return {technology};

    }catch (e) {
        throw new Error(e);
    }
}

export async function getHeadlinesByCategory(category, page=1, country = "us"){
    try{
        const url = `${c.HEADLINES}&category=${category}&page=${page}&country=${country}`;
        let res = await axios.get(url);

        return res.data;
    }catch (e) {
        throw new Error(e);
    }
}

export async function search(query, cancelToken){
    try{
        const url = `${c.SEARCH}&q=${query.toLowerCase()}`;
        let res = await axios.get(url, {
            cancelToken: cancelToken.token,
        });

        return res.data;

    }catch (error) {
        let err = new Error(error.message);
        err.isCancel = (axios.isCancel(error));

        throw err;
    }
}