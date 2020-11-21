<template>
    <v-row class="justify-center">
      <v-col cols="12" sm="11" md="10" lg="7">
        <v-progress-linear
            :active="musicTab.length == 0"
            :indeterminate="musicTab.length == 0"
            absolute
            top
            color="deep-purple accent-4"
        ></v-progress-linear>
        <Player v-if="musicTab.length > 0" @displayAction="displayAction" @changeFavorite="changeFavorite" @selectedMusic="selectedMusic" :musicTab="musicTab" :selectedMusicIndex="selectedMusicIndex"></Player>
      </v-col>
      <v-col cols="12" sm="11" md="10" lg="5">
        <router-view @refreshMusic="refreshMusic" @changeSelectedMusic="changeSelectedMusic" :selectedMusicIndex="selectedMusicIndex" :musicTab="musicTab" />
      </v-col>
    </v-row>
</template>

<script>
    import axios from "axios";
    const MUSICS_API_ENDPOINT = 'http://localhost:3000/musics/';

    import Player from "./Player";
    //import Playlist from "./Playlist";
    export default {
        name: "PlayerPlaylist",
        props: {
        },
        data: function () {
            return {
                selectedMusicIndex: 0,
                musicTab: []
            };
        },
        methods: {
            selectedMusic(val) {
                this.selectedMusicIndex = val;
            },
            changeSelectedMusic(val) {
                this.selectedMusicIndex= val;
            },
            async fetchAllMusics(){
                let allMusics = await axios.get(MUSICS_API_ENDPOINT);
                let { data } = allMusics;
                this.musicTab = data;
            },
            async changeFavorite(music) {
                let body = {
                    title: music.title,
                    artist: music.artist,
                    cover: music.cover,
                    music: music.music,
                    favorite: music.favorite,
                }
                await axios.put(`${MUSICS_API_ENDPOINT}${music.id}`, body)
                this.refreshMusic();
            },
            displayAction(action) {
                if (action == 'playlist' && this.$route.name != 'playlist') {
                    this.$router.push({name: 'playlist'})
                } else if (action == 'add' && this.$route.name != 'addsong') {
                    this.$router.push({name: 'addsong'})
                } else {
                    this.$router.push({name: 'Home'})
                }
            },
            async refreshMusic() {
                await this.fetchAllMusics();
            }
        },
        components: {
            Player,
            //Playlist
        },
        computed: {
        },
        async created(){
            await this.fetchAllMusics();
        },
        watch: {
        },
    };
</script>