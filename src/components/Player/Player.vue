<template>
    <v-card :elevation="25" class="rounded-xl">
        <CoverTrack :coverTrack="musicSelected.cover" :titleTrack="musicSelected.title" :isPlayed="isPlayed"></CoverTrack>
        <InformationsTrack :titleTrack="musicSelected.title" :indexMusic="indexMusic" :artistTrack="musicSelected.artist" :isPlayed="isPlayed" :isBack="isBack" :isNext="isNext" :srcTrack="musicSelected.music" @action="action"></InformationsTrack>
        <v-btn-toggle class="button-wrapper" v-model="buttonAction" borderless tile group>
            <v-btn value="playlist" @click="displayAction('playlist')"><v-icon :size="40" >mdi mdi-playlist-music</v-icon></v-btn>
            <v-btn value="add" @click="displayAction('add')"><v-icon :size="40">mdi mdi-playlist-plus</v-icon></v-btn>
        </v-btn-toggle>
    </v-card>
</template>

<script>
    import CoverTrack from "./CoverTrack";
    import InformationsTrack from "./InformationsTrack";
    export default {
        name: "Player",
        props: {
            musicTab: Array,
            selectedMusicIndex: Number
        },
        data: function () {
            return {
                isPlayed: false,
                isBack: true,
                isNext: true,
                indexMusic: this.selectedMusicIndex,
                musicSelected: {},
                buttonAction: ''
            };
        },
        methods: {
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
            displayAction(action) {
                this.buttonAction = action;
                this.$emit('displayAction', action);
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
                let index = this.indexMusic;
                if (index != this.musicTab.length - 1) {
                    this.indexMusic++;
                } else {
                    this.indexMusic = 0;
                }
            }
        },
        components: {
            CoverTrack,
            InformationsTrack
        },
        computed: {
        },
        created() {
            this.musicSelected = this.musicTab[this.indexMusic];
            this.buttonAction = this.$route.name;
        },
        watch: {
            indexMusic(val) {
                this.musicSelected = this.musicTab[val];
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
</style>