<template>
  <div>
    <div class="card bg-gray-100 mb-2 rounded-sm px-2 py-2" @click="editing = true">
      {{ card.name }}
    </div>
    <div v-if="editing" class="dialog">
      <div class="inner">
        <a href="#" class="closeButton" @click="close">
          <i class="fa-solid fa-xmark"></i>
        </a>
        <textarea class="content" v-model="card_name"></textarea>
        <button class="updateButton" @click="update">更新</button>
      </div>
      123
    </div>
  </div>

</template>

<script>
export default{
    name: 'Card',
    props: ['card'],
    data: function(){
        return{
          card_name: this.card.name,
          editing: false
        }
    },
    methods: {
      close(event){
        event.preventDefault();
        this.editing = false;
      },
      update(event){
        event.preventDefault();
        this.$store.dispatch("updateCard",{id:this.card.id, name: this.card_name});
        this.editing = false;
      }
    }
}
</script>
<style lang="scss" scoped>
  .card {
    cursor: pointer;
    &:hover{
      @apply bg-gray-200;
    }
  }
  .dialog{
    background-color: rgba(0, 0, 0, 0.7);
    @apply .fixed .w-full .h-full .flex .top-0 .left-0 .items-center .justify-center;
    .inner{
      @apply .bg-white .flex .flex-col .px-6 .py-4;
      width: 700px;
      .closeButton{
        @apply .text-gray-800 .text-right;
      }
      .content{
        @apply .px-2 .py-2 .border .border-gray-600 .mt-2;
        &:focus{
          @apply .outline-none;
        }
      }
      .updateButton{
        @apply .bg-gray-400 .px-3 .py-2 .mt-2 .rounded;
        &:focus{
          @apply .outline-none;
        }
      }
      .fa-xmark{
        border: 1px solid transparent;
        @apply .px-3 .py-2;
        border-radius: 50%;
        &:hover{
          @apply .border .px-3 .py-2;
          border: 1px solid #CBD5E0;
          border-radius: 50%;
        }
      }
    }
  }
</style>