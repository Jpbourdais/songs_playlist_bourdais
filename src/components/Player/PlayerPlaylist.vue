<template>
    <v-container class="container-main">
        <v-row class="justify-center">
            <v-col cols="12" sm="11" md="10" lg="7">
                <v-progress-linear
                    :active="musicTab.length == 0"
                    :indeterminate="musicTab.length == 0"
                    absolute
                    top
                    color="deep-purple accent-4"
                ></v-progress-linear>
                <Player v-if="musicTab.length > 0" @displayAction="displayAction" @changeFavorite="changeFavorite" @selectedMusic="selectedMusic" @addInQueue="addInQueue" @removeOneInQueue="removeOneInQueue" :musicTab="musicTab" :selectedMusicIndex="selectedMusicIndex" :selectedButton="selectedButton" :inQueue="inQueue"></Player>
            </v-col>
            <v-col cols="12" sm="11" md="10" lg="5">
                <router-view @refreshMusic="refreshMusic" @changeSelectedMusic="changeSelectedMusic" @changeSelectButton="changeSelectButton" @addInQueue="addInQueue" :selectedMusicIndex="selectedMusicIndex" :selectedMusicId="selectedMusicId" :musicTab="musicTab" :artistTab="artistTab" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from "axios";
    const MUSICS_API_ENDPOINT = 'https://playlistsongs-8c2e7.firebaseio.com/musics';
    const ARTISTS_API_ENDPOINT = 'https://playlistsongs-8c2e7.firebaseio.com/artists';

    import Player from "./Player";
    //import Playlist from "./Playlist";
    export default {
        name: "PlayerPlaylist",
        props: {
        },
        data: function () {
            return {
                selectedMusicIndex: 0,
                selectedMusicId: 0,
                selectedButton: '',
                musicTab: [],
                artistTab: [],
                inQueue: [],
            };
        },
        methods: {
            selectedMusic(index) {
                this.selectedMusicIndex = index;
                this.selectedMusicId = this.musicTab[index].id;
            },
            changeSelectedMusic(id) {
                let index = this.musicTab.map(function(el) {
                    return el.id;
                }).indexOf(id);
                this.selectedMusicId = id;
                this.selectedMusicIndex = index;
            },
            changeSelectButton(button) {
                this.selectedButton = button;
            },
            async fetchAllMusics(){
                let allMusics = await axios.get(`${MUSICS_API_ENDPOINT}.json`);
                let { data } = allMusics;
                this.musicTab = data;
            },
            async fetchAllArtists(){
                let allArtists = await axios.get(`${ARTISTS_API_ENDPOINT}.json`);
                let { data } = allArtists;
                this.artistTab = data;
            },
            async changeFavorite(music) {
                let body = {
                    favorite: music.favorite,
                }
                await axios.patch(`${MUSICS_API_ENDPOINT}/${music.id}.json`, body)
                this.refreshMusic();
            },
            displayAction(action, param1) {
                if (action == 'playlist' && this.$route.name != 'playlist') {
                    this.$router.push({name: 'playlist'});
                    this.changeSelectButton('playlist');
                } else if (action == 'add' && this.$route.name != 'addsong') {
                    this.$router.push({name: 'addsong'});
                    this.changeSelectButton('add');
                } else if (action == 'information' && this.$route.name != 'artist') {
                    this.$router.push({name: 'artist', params: { idArtist: param1 }});
                } else {
                    this.$router.push({name: 'Home'});
                }
            },
            async refreshMusic() {
                await this.fetchAllMusics();
            },
            removeOneInQueue() {
                this.inQueue.pop();
            },
            addInQueue(idMusic) {
                let index = this.musicTab.map(function(el) {
                    return el.id;
                }).indexOf(idMusic);
                this.inQueue.push(index);
            }
        },
        components: {
            Player,
        },
        async created(){
            await this.fetchAllMusics();
            await this.fetchAllArtists();
        }
    };
</script>

<style scoped>
    .container-main {
        max-width: 1100px;
    }
</style>