Vue.use(Vuefire)
// Vue.use(Vuefire.firestorePlugin)

const db = firebase
  .initializeApp({
    projectId: 'vue-fire-store',
  })
  .firestore()
db.settings({ timestampsInSnapshots: true })
const todos = db.collection('demo-todos')

new Vue({
  el: '#app',
  data: {
    todos: [],
    newTodoText: '',
  },

  firestore: {
    todos: todos.orderBy('created'),
  },

  methods: {
    addTodo() {
      if (this.newTodoText) {
        todos.add({
          finished: false,
          text: this.newTodoText,
          created: firebase.firestore.FieldValue.serverTimestamp(),
        })
        this.newTodoText = ''
      }
    },
    updateTodoText(todo, newText) {
      todos.doc(todo.id).update({ text: newText })
    },
    removeTodo(todo) {
      todos.doc(todo.id).delete()
    },
  },
})
