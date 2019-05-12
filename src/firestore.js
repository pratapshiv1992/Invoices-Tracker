import * as firebase from 'firebase';
const config = {
    apiKey: "**your api key**",
    projectId: '**project id**',
};

const app = firebase.initializeApp(config);
export const db  = app.firestore();
export default app;

