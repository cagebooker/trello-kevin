
<template>
  <div class="list px-3 py-2 mx-2 w-64 rounded flex-none h-full">
    <h2 class=" py-1 font-bold">{{list.name}}</h2>
    <div class="mt-2">
      <Draggable v-model="list.cards" ghost-class="ghost-card" group="list" @change="cardMoved">
        <Card v-for="card in list.cards" :card="card" :key="card.id"></Card>
      </Draggable>
    </div>
    <div class="input-area">
      <button class="button btn-shadow px-3 py-1 font-semibold .text-sm .rounded" @click="editingCard" v-if="!editing">新增卡片</button>

      <textarea class="content" v-model="content" placeholder="輸入卡片名稱" v-if="editing"></textarea>
      <button style="background-color: #2E4052; color: #fff" class="button px-3 py-1 font-semibold .text-sm .rounded" @click="createCard" v-if="editing">建立</button>
      <button style="background-color: #ecf0f1; margin-left: 4px" class="button px-3 py-1 font-semibold .text-sm .rounded" v-if="editing" @click="cancelCard">取消</button>
    </div>
  </div>
</template>

<script>
import Card from "components/card"
import Rails from '@rails/ujs'
import Draggable from 'vuedraggable'
export default{
    name: 'List',
    props: ["list"],
    data: function(){
        return{
          content: '',
          editing: false,
          cards: this.list.cards
        }
    },
    components: { Card, Draggable },
    methods: {
      cardMoved(event){
        console.log('here')
        let evt = event.added || event.moved; //有問題
        if(evt){
          let el = evt.element;
          let card_id = el.id;
          console.log(evt.newIndex)
          let data = new FormData()
          data.append("card[position]", evt.newIndex + 1)
          data.append("card[list_id]", this.list.id)
          console.log(this.list.id)
          console.log(data)
          // formData inspect
          // for (var pair of data.entries()) {
          //     console.log(pair[0]+ ', ' + pair[1]);
          // }

          Rails.ajax({
            url: `/cards/${card_id}/move`,
            type: 'PUT',
            data,
            dataType: 'json',
            success: res => {
              // console.log(res)
            },
            error: err => {
              console.log(err)
            }
          })
        }
      },
      createCard(evt){
        evt.preventDefault()
        // console.log(this.content)
        let data = new FormData()
        data.append("card[list_id]",this.list.id)
        data.append("card[name]", this.content)
        Rails.ajax({
          url:'/cards',
          type: 'POST',
          data,
          dataType: 'json',
          success: res =>{
            // console.log(res)
            this.cards.push(res);
            this.content = "";
            this.editing = false;
          },
          error: err =>{
            console.log(err)
          }
        })
      },
      editingCard(evt){
        evt.preventDefault()
        this.editing = !this.editing
      },
      cancelCard(evt){
        evt.preventDefault()
        this.editing = false
      }
    }
}
</script>
<style lang="scss" scoped>
.ghost-card{
  @apply .border-2 .border-gray-400 .border-dashed .bg-gray-200
}
.list{
  background-color: #f7d794;

  .header {
    @apply .px-3 .py-1 .font-bold;
  }
}
.input-area{
  .content{
    width: 100%;
    padding: 4px;
    padding-left: 8px;
    border-radius: 3px;

    &:focus{
      outline: none;
    }
  }
  .button{
    background-color: #FFC857;
    border-radius: 3px;
    margin: 2px 0px;
    &:focus{
      outline: none;
    }
  }
  .btn-shadow{
    &:hover{
      box-shadow: 5px 5px 10px #aaa, -5px -5px 10px #FFC857;
    }
  }
}
</style>