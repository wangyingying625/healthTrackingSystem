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
        token:null,
        msg:null,
        user:{
          family_id:0
        }
      }
    },
    beforeCreate:function () {
      var that=this;
      if(localStorage.token)
        this.token=localStorage.token;
      axios.get('http://127.0.0.1:8080/api/upload/record',{
        headers: {
          'Authorization': global_.token,
        }
      }).then(function (res) {
        that.msg=res.data;
      })
    }
  };
</script>
