// 等价于在store.state.book.FileName 也就是新增了一个book模块对象,还需要
// 调用该模块对象才能调用封装到这个模块的store属性,否则报undefined
const book = {
  state: {
    // state就是共享的状态变量,都可以调用
    fileName: '',
    // menuVisible控制菜单栏隐藏显示
    menuVisible: true,
    // -1 不显示字号设置 0显示 1主题设置 2进度条 3目录
    settingVisible: 0,
    defaultFontSize: 16,
    currentBook: null
  },
  mutations: {
    SET_FILENAME: (state, fileName) => {
      state.fileName = fileName
    },
    SET_MENUVISIBLE: (state, menuVisible) => {
      state.menuVisible = menuVisible
    },
    SET_SETTINGVISIBLE: (state, settingVisible) => {
      state.settingVisible = settingVisible
    },
    SET_DEFAULTFONTSIZE: (state, defaultFontSize) => {
      state.defaultFontSize = defaultFontSize
    },
    SET_CURRENTBOOK: (state, currentBook) => {
      state.currentBook = currentBook
    }
  }
  // actions: {
  //   // 解构赋值的参数commit 一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation
  //   setFileName: ({ commit }, newVal) => {
  //     return commit('SET_FILENAME', newVal)
  //   },

  //   setMenuVisible: ({ commit }, newVal) => {
  //     return commit('SET_MENUVISIBLE', newVal)
  //   }
  // }
}
export default book
