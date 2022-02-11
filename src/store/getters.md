const book = {
  // filename是一个函数,调用bookhi返回state.book.filename的值
  fileName: (state) => state.book.fileName,
  menuVisible: (state) => state.book.menuVisible,
  settingVisible: (state) => state.book.settingVisible,
  defaultFontSize: (state) => state.book.defaultFontSize,
  currentBook: (state) => state.book.currentBook
}

export default book

// 为什么需要getters组件,因为getters统一的处理了book模块中的state属性调用问题
// 如果直接调用需要写 .$store.satte.book.属性名 非常麻烦
// 在getters中对state进行预处理,

// getters属性是一个对象

// 它的属性都是一个箭头函数,接收state参数,在组件中...mapGetters 可以将这些属性
// 都写到组件的computed属性上,解构赋值,组件直接this.属性调用就等价于调用对应state

// 扩展运算符可以混入对象,所以computed对象被混入了mapgetters对象的属性

// commit()返回一个promise
