<template>
    <v-card :elevation="25" class="rounded-xl">
        <CoverTrack :coverTrack="musicSelected.cover" :titleTrack="musicSelected.title" :isPlayed="isPlayed"></CoverTrack>
        <InformationsTrack :titleTrack="musicSelected.title" :indexMusic="indexMusic" :artistTrack="musicSelected.artist" :isPlayed="isPlayed" :isBack="isBack" :isNext="isNext" :srcTrack="musicSelected.music" @action="action"></InformationsTrack>
        <v-btn-toggle class="button-wrapper" v-model="buttonAction" borderless tile group>
            <v-btn value="playlist" @click="displayAction('playlist')"><v-icon :size="40" >mdi mdi-playlist-music</v-icon></v-btn>
            <v-btn value="add" @click="displayAction('add')"><v-icon :size="40">mdi mdi-playlist-plus</v-icon></v-btn>
            <v-btn value="information" @click="displayAction('information', musicSelected.artist)"><v-icon :size="40">mdi mdi-information-outline</v-icon></v-btn>
        </v-btn-toggle>
        <div class="button-wrapper-2">
            <v-icon v-if="musicSelected.favorite" :size="40" @click="changeFavorite()">mdi mdi-heart</v-icon>
            <v-icon v-else :size="40" @click="changeFavorite()">mdi mdi-heart-outline</v-icon>
            <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon :size="40" v-on="on" v-bind="attrs">mdi mdi-heart-box-outline</v-icon>
                </template>
                <v-card>
                    <v-card-title class="headline grey lighten-2">
                        Musiques dans les favoris
                    </v-card-title>
                        <v-list v-if="allFavoriteMusic().length > 0">
                            <PlaylistItem v-for="(music, idx) in allFavoriteMusic()" :key="idx" :music="music" @addInQueue="addInQueue"></PlaylistItem>
                        </v-list>
                        <v-card-title v-else>Il n'y a pas de musique en favori :(</v-card-title>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="dialog = false">OK</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </v-card>
</template>

<script>
    import CoverTrack from "./CoverTrack";
    import InformationsTrack from "./InformationsTrack";
    import PlaylistItem from "./PlaylistItem";
    export default {
        name: "Player",
        props: {
            musicTab: Array,
            selectedMusicIndex: Number,
            selectedButton: String,
            inQueue: Array
        },
        data: function () {
            return {
                isPlayed: false,
                isBack: true,
                isNext: true,
                indexMusic: this.selectedMusicIndex,
                musicSelected: {},
                buttonAction: '',
                dialog: false,
            };
        },
        methods: {
            allFavoriteMusic() {
                return this.musicTab.filter(music => music.favorite == true);
            },
            action(action) {
                if (action === 'play') {
                    this.isPlayed = !this.isPlayed;
                } else if (action === 'previous') {
                    this.previous();
                } else if (action === 'next') {
                    this.next();
                }
                this.$emit('selectedMusic', this.indexMusic);
            },
            displayAction(action, param1 = null) {
                this.buttonAction = action;
                this.$emit('displayAction', action, param1);
            },
            changeFavorite() {
                this.musicSelected.favorite = !this.musicSelected.favorite;
                this.$emit('changeFavorite', this.musicSelected);
            },
            previous() {
                let index = this.indexMusic;
                if (index != 0) {
                    this.indexMusic--;
                } else {
                    this.indexMusic = (this.musicTab.length - 1);
                }
            },
            next() {
                if (this.inQueue.length > 0) {
                    this.indexMusic = this.inQueue[this.inQueue.length - 1];
                    this.$emit('removeOneInQueue');
                } else {
                    let index = this.indexMusic;
                    if (index != this.musicTab.length - 1) {
                        this.indexMusic++;
                    } else {
                        this.indexMusic = 0;
                    }
                }
            },
            addInQueue(idMusic) {
                this.$emit('addInQueue', idMusic);
            }
        },
        components: {
            CoverTrack,
            InformationsTrack,
            PlaylistItem
        },
        computed: {
        },
        created() {
            this.musicSelected = this.musicTab[this.indexMusic];
            this.buttonAction = this.$route.name;
        },
        watch: {
            selectedButton(val) {
                this.buttonAction = val;
            },
            indexMusic(val) {
                this.musicSelected = this.musicTab[val];
                if (this.musicSelected.favorite) {
                    this.isMusicFavorite = true;
                } else {
                    this.isMusicFavorite = false;
                }
            },
            selectedMusicIndex(val) {
                this.indexMusic = val;
            }
        },
    };
</script>

<style scoped>
    .button-wrapper{
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        flex-direction: column;
    }

    .button-wrapper-2{
        position: absolute;
        top: 10px;
        left: 10px;
        display: flex;
        flex-direction: column;
    }
</style>