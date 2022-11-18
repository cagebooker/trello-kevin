import Vue from 'vue/dist/vue.esm';
import Vuex from 'vuex';
import Rails from '@rails/ujs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: []
  },
  getters: {

  },
  mutations: {
    UPDATE_LISTS(state,lists){
      state.lists = lists;
    }
  },
  actions: {
    moveList({commit,state},evt){
      //打API
      let data = new FormData()
      data.append("list[position]",evt.moved.newIndex + 1)
      // console.log(evt.moved.newIndex + 1)
      Rails.ajax({
        // 打到指定的list上
        url: `lists/${state.lists[evt.moved.newIndex].id}/move`,
        type: 'PUT',
        data,
        dataType: 'json',
        success: res => {
          console.log(res)
        },
        error: err => {
          console.log(err)
        }
      })
    },
    loadList({commit}){
      Rails.ajax({
        url: '/lists.json',
        type: 'GET',
        dataType: 'json',
        success: res => {
          commit("UPDATE_LISTS",res)
          // console.log(res)

        },
        error: err => {
          console.log(err)
        }
      })
    }
  }
})