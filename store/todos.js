import firebase from '~/plugins/firebase' //firebase初期化設定ファイル
import { firestoreAction } from 'vuexfire' //vuexfireのfirestoreActionをインポート

const db = firebase.firestore()　//データベースの設定
const todosRef = db.collection('todos') //collectionはtodosを使う

export const state = () => ({ //stateを定義
  todos: [] //todo一覧を管理するtodosを配列で定義
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => { //初期化の処理。vuexfireが用意しているactionであるfirestoreActionの呼び出し。第一引数にはcontextが入るのだが、このように書くとbindFirestoreRefのみ受け取ることが出来る。
    bindFirestoreRef('todos', todosRef) //bindしたいデータの名前（todos）とコレクションへの参照（todosRef）を渡すと、state.todosにCloudFirestoreのデータがバインド（関連付け）される
  }),
  add: firestoreAction((context, name) => { //todoの追加。第一引数は利用しない。
    if(name.trim()) { //空白ではないことを確認。空白の場合はデータは追加されない。
      todosRef.add({ //addメソッドを使ってデータを登録
        name: name, //todoの名前
        done: false, //タスクの完了・未完了。初期値は未完了（false）
        created: firebase.firestore.FieldValue.serverTimestamp() //タスクが追加された時間。Firebase（サーバー）から時刻を取得
      })
    }
  }),
  remove: firestoreAction((context, id) => { //removeはtodoの削除機能
    todosRef.doc(id).delete() //ドキュメントIDを指定（doc(id)）してデリートメッソド（delete()）で該当のデータを削除。idはremoveを呼ぶときに引数として渡す
  }),
  toggle: firestoreAction((context, todo) => { //checkbox操作時の処理。todoの完了・未完了を管理するための機能。第二引数でtodoのデータを渡される
    todosRef.doc(todo.id).update({ //ドキュメントID（doc.(todo.id)）を指定してアップデート(update)を行う
      done: !todo.done //現在の値の反転（!todo.done）して登録
    })
  })
}
