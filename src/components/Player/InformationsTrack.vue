<template>
    <v-row class="justify-center">
        <v-col cols="4 d-flex justify-center align-center" md="2" order="2" order-md="1">
            <v-icon v-if="isPlayed" :size="70" @click="action('play')">mdi mdi-pause-circle-outline</v-icon>
            <v-icon v-else :size="70" @click="action('play')">mdi mdi-arrow-right-drop-circle-outline</v-icon>
        </v-col>
        <v-col cols="12" sm="9" md="8" lg="7" order="1" order-md="2">
            <v-card-title>{{titleTrack}}</v-card-title>
            <v-card-subtitle>{{artistTrack}}</v-card-subtitle>
        </v-col>
        <v-col cols="8" md="2" order="3">
            <v-row class="justify-center">
                <v-col cols="6 d-flex justify-center align-center flex-md-column align-md-start">
                    <v-icon v-if="isBack" :size="40" @click="action('previous')">mdi mdi-skip-previous-circle-outline</v-icon>
                    <v-icon v-else :size="40">mdi mdi-checkbox-blank-circle-outline</v-icon>
                    <v-icon v-if="isNext" :size="40" @click="action('next')">mdi mdi-skip-next-circle-outline</v-icon>
                    <v-icon v-else :size="40">mdi mdi-checkbox-blank-circle-outline</v-icon>
                </v-col>
                <v-col cols="6 d-flex flex-md-column-reverse justify-center align-center" sm="4" lg="2">
                    <v-icon @click="muted" :size="20">mdi {{classSound}}</v-icon>
                    <v-slider class="sound d-none d-md-block" v-model="soundValue" vertical></v-slider>
                    <v-slider class="sound d-block d-md-none" v-model="soundValue"></v-slider>
                </v-col>
            </v-row>
        </v-col>
        <audio id="player" class="d-none" controls="off" :src="srcTrack"></audio>
    </v-row>
</template>

<script>
    export default {
        name: "InformationsTrack",
        props: {
            titleTrack: String,
            artistTrack: String,
            srcTrack: String,
            indexMusic: Number,
            isPlayed: Boolean,
            isBack: Boolean,
            isNext: Boolean,
        },
        data: function () {
            return {
                classSound: 'mdi-volume-high',
                isMuted: false,
                sound: 100,
            };
        },
        methods: {
            action(action) {
                this.$emit("action", action);
            },
            played() {
                if (this.isPlayed) {
                    document.getElementById("player").play();
                } else {
                    document.getElementById("player").pause()
                }
            },
            muted() {
                if (this.isMuted) {
                    document.getElementById("player").muted = false;
                    this.ChangeIconSound();
                } else {
                    document.getElementById("player").muted = true;
                    this.classSound = 'mdi-volume-off';
                }
                this.isMuted = !this.isMuted;
            },
            ChangeIconSound() {
                let sound = this.soundValue;
                if (sound >= 65) {
                    this.classSound = 'mdi-volume-high';
                } else if (sound < 65 && sound > 35) {
                    this.classSound = 'mdi-volume-medium';
                } else if (sound <= 35 && sound > 0) {
                    this.classSound = 'mdi-volume-low';
                } else {
                    this.classSound = 'mdi-volume-off';
                }
            }
        },
        components: {
        },
        computed: {
            soundValue: {
                get(){
                    return this.sound;
                },
                set(sound){
                    document.getElementById("player").volume = sound/100;
                    if (this.isMuted) {
                        this.muted();
                    }
                    this.sound = sound;
                    this.ChangeIconSound();
                } 
            }
        },
        updated() {
            this.played();
        },
    };
</script>

<style>
    .sound .v-slider{
        margin-top: 0;
        margin-bottom: 0;
        min-height: 50px;
    }
    .sound .v-messages{
        display: none;
    }
    .sound .v-input__slot{
        margin-bottom: 0;
    }
</style>