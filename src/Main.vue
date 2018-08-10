<template>
<div class="container">
    <div class="row">
        <div class="col-sm-9">
            <GamePicker></GamePicker>
        </div>
        <div class="col-sm-3">
        </div>
        
    </div>
</div>
</template>

<script>
    import Chatty from './Chatty.vue';
    import GamePicker from './GamePicker.vue';

    export default {
        name: 'App',
        components: { Chatty, GamePicker }
    };
</script>