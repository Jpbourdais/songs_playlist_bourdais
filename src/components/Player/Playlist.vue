<template>
    <v-list>
        <v-list-item-group v-model="selectedMusic">
            <PlaylistItem v-for="(music, idx) in musicTab" :key="idx" :music="music"></PlaylistItem>
        </v-list-item-group>
    </v-list>
</template>

<script>
    import PlaylistItem from "./PlaylistItem";

    export default {
        name: "Playlist",
        props: {
            musicTab: Array,
            selectedMusicIndex: Number,
        },
        data: function () {
            return {
            };
        },
        methods: {
        },
        components: {
            PlaylistItem
        },
        computed: {
            selectedMusic: {
                get(){
                    return this.selectedMusicIndex;
                },
                set(val){
                    this.$emit("changeSelectedMusic", val);
                    return val;
                } 
            }
        },
        updated() {
        },
        created() {
        },
        watch: {
        },
    };
</script>