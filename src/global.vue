<template>
  <div></div>
</template>
<style>
</style>
<script type="text/ecmascript-6">
  export default
  {
    data(){
      return {
        token:null
      }
    },
    beforeCreate:function () {
      if(localStorage.token)
        this.token=localStorage.token;
    }
  };
</script>
