<template>
  <div class="card bg-gray-100 mb-2 rounded-sm px-2 py-2">
    {{ card.name }}
  </div>
</template>

<script>
export default{
    name: 'Card',
    props: ['card'],
    data: function(){
        return{

        }
    }
}
</script>
<style scoped>
  .card{

  }
</style>