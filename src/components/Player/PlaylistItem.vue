<template>
    <v-list-item>
        <v-list-item-avatar>
            <v-img max-height="50px" max-width="50px" :alt="music.title" :src="music.cover" class="image cover"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>{{music.title}}</v-list-item-title>
            <v-list-item-subtitle>{{music.artist}}</v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
    export default {
        name: "PlaylistItem",
        props: {
            music: Object
        },
        data: function () {
            return {
            };
        },
        methods: {
        },
        components: {
        },
        computed: {
        },
        created() {
        },
        watch: {
        },
    };
</script>

<style scoped>
    .image.cover {
        width: 50px !important;
        object-fit: cover;
    }
</style>