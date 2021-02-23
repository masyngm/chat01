<template>
  <div>
    <div class="form">
      <!-- {{ todos }} -->
      <!-- v-onメソッドでaddメソッドを呼び出す。preventメソッドによってsubmitでページがリロードされないようにする。 -->
      <ul>
        <!-- todo.idはCloud Firestoreのデータ1件ずつに付与されるドキュメントID -->
        <li v-for="todo in todos" :key="todo.id">
          <input
          type="checkbox"
          v-bind:checked="todo.done"
          @change="toggle(todo)">
          {{ todo.name }} {{ todo.created }}
          <button v-on:click="remove(todo.id)">x</button>
        </li>
      </ul>
      <form v-on:submit.prevent="add">
        <input v-model="name">
        <button>Add</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data: function() { //新規登録されるtodoのデータを一時的に格納
      return {
        name: '', //todoの名前
        done: false //todoの完了・未完了の管理
      }
    },
    created: function() {
      this.$store.dispatch('todos/init') //createdのタイミングでディスパッチメソッド(dispatch)でtodos.jsのアクションのinitを読み込んでFirebaseの初期化
    },
    methods: {
      add() { //submitボタンが押された時に呼び出し
        this.$store.dispatch('todos/add', this.name) //addが呼ばれたらstoreのtodos.jsのactionのaddを呼び出し。引数にtodoにつける名前を渡す
        this.name = ''
      },
      remove(id) {//idはCloud Firestoreのidを指す
        this.$store.dispatch('todos/remove', id)
      },
      toggle(todo) {
        this.$store.dispatch('todos/toggle', todo)
      }
    },
    computed: { //computedを経由してデータを取得しているのはtodosの処理を加工することを想定している
      todos() {
        return this.$store.state.todos.todos //storeのtodosの値を返すメソッド
      }
    }
  }
</script>
