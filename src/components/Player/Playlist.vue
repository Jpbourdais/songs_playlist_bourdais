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
                <PlaylistItem v-for="music in musicTabFilter" :key="music.id" :music="music" @changeSelectButton="changeSelectButton"></PlaylistItem>
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
            selectedMusicId: Number
        },
        data: function () {
            return {
                buttonAction: 'title',
                search: ''
            };
        },
        methods: {
            changeSelectButton(button) {
                this.$emit('changeSelectButton', button);
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
                    return musicTabFilter.filter(music => music[this.buttonAction].includes(this.search));
                }
                return this.musicTab
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