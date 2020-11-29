<template>
    <div>
        <v-btn-toggle class="button-wrapper" v-model="buttonAction" borderless tile group>
            <v-btn value="title"><v-icon :size="40" >mdi mdi-music-note</v-icon></v-btn>
            <v-btn value="artist"><v-icon :size="40">mdi mdi-account</v-icon></v-btn>
            <v-btn value="description"><v-icon :size="40">mdi mdi-format-align-justify</v-icon></v-btn>
        </v-btn-toggle>
        <v-text-field
            v-model="search"
            :counter="250"
            label="Recherche"
        ></v-text-field>
        <v-list>
            <v-list-item-group v-model="selectedMusic">
                <PlaylistItem v-for="music in musicTabFilter" :key="music.id" :music="music" @changeSelectButton="changeSelectButton" @addInQueue="addInQueue"></PlaylistItem>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>
    import PlaylistItem from "./PlaylistItem";

    export default {
        name: "Playlist",
        props: {
            musicTab: Array,
            selectedMusicIndex: Number,
            selectedMusicId: Number,
            artistTab: Array
        },
        data: function () {
            return {
                buttonAction: 'title',
                search: '',
            };
        },
        methods: {
            changeSelectButton(button) {
                this.$emit('changeSelectButton', button);
            },
            addInQueue(idMusic) {
                this.$emit('addInQueue', idMusic);
            }
        },
        components: {
            PlaylistItem
        },
        computed: {
            selectedMusic: {
                get(){
                    return this.selectedMusicId;
                },
                set(val){
                    if (val != undefined) {
                        this.$emit("changeSelectedMusic", val);
                        return this.selectedMusicId;
                    }
                } 
            },
            musicTabFilter: function() {
                if (this.search != '') {
                    let musicTabFilter = this.musicTab;
                    if (this.buttonAction == 'artist') {
                        let artistTabFilter = this.artistTab;
                        let artist = artistTabFilter.filter(artist => artist['name'].toLowerCase().includes(this.search.toLowerCase()));
                        let idTab = []
                        if (artist.length > 0) {
                            artist.forEach(element => idTab.push(element.id));
                        }
                        return musicTabFilter.filter(music => idTab.includes(music[this.buttonAction]));
                    } else {
                        return musicTabFilter.filter(music => music[this.buttonAction].toLowerCase().includes(this.search.toLowerCase()));
                    }
                }
                return this.musicTab
            }
        }
    };
</script>