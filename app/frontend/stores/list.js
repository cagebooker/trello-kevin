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
    },
    REPLACE_CARD(state,card){
      let list_index = state.lists.findIndex(list => list.id == card.list_id)
      let card_index = state.lists[list_index].cards.findIndex(item => item.id == card.id)
      state.lists[list_index].cards.splice(card_index,1,card)
    },
    ADD_LIST(state, list){
      state.lists.push(list)
    },
    REMOVE_LIST(state,list_id){
      let list_index = state.lists.findIndex(list => list.id == list_id)
      state.lists.splice(list_index,1)
    }
  },
  actions: {
    removeList({commit},list_id){
      Rails.ajax({
        url: `/lists/${list_id}`,
        type: 'DELETE',
        dataType: 'json',
        success: res => {
          commit('REMOVE_LIST',list_id)
          console.log(res)
        },
        error: err => {
          console.log(err)
        }
      })
    },
    createLists({commit},list_name){
      let data = new FormData();
      data.append("list[name]", list_name);
      console.log("hi")
      Rails.ajax({
        url:'/lists',
        type: 'POST',
        data,
        dataType: 'json',
        success: res => {
          commit('ADD_LIST',res)
        },
        error: err => {
          console.log(err)
        }
      })
    },
    updateCard({commit},{id, name}){
      let data = new FormData()
      data.append('card[name]',name)

      Rails.ajax({
        url: `/cards/${id}`,
        type: 'put',
        data,
        dataType: 'json',
        success: res => {
          commit('REPLACE_CARD',res)
        },
        error: err => {
          console.log(err)
        }
      })
    },
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