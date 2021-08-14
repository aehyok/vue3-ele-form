<template>
    <div class="container">
        <div class="header">
            header
        </div>
        <div class="body">
            <div class="left">
                left
            </div>
            <div class="center">
                    
            </div>
            <div class="right">
                right
            </div>
        </div>
    </div>
</template>
<script setup>
</script>
<style scoped="scss">
    .container {
        border: 1px solid #EAECEF; 
        width: 100%;
        height: 90vh; 
        display:flex;
        flex-direction:column;
    }
    .header {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #EAECEF;
    }
    .body{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .left {
        width: 180px;
        height: calc(90vh - 60px);
        border-right: 1px solid #EAECEF;
    }
    .right {
        width: 360px;
        height: calc(90vh- 60px);
        border-left: 1px solid #EAECEF;
    }
</style>