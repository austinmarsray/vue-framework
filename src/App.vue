<template>
        <router-view></router-view>
</template>

<script>
    export default{
      name: 'APP',
            created() {
              if (sessionStorage.getItem('verification') !== ''){
                      this.$store.commit('EventListener');
              }
            }
    }
</script>
