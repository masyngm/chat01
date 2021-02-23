import firebase from 'firebase'

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  // apiKey: process.env.FIREBASE_API_KEY
  // ファイヤーベースの初期化に必用なパラメーター、プロジェクトIDをオブジェクト形式で用意する
}

if (!firebase.apps.length) { //二重に初期化が行われないようにしている
  firebase.initializeApp(config) //初期化
}

export default firebase //他の場所からfirebaseが使えるようにしている
