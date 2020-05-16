<template>
    <div class="app-who-am-i">
        <app-webcam></app-webcam>

        <div class="controls">
            <app-round-button>
                <i class="fas fa-microphone"></i>
            </app-round-button>

            <app-round-button>
                <i class="fas fa-video"></i>
            </app-round-button>
        </div>

        <app-input placeholder="What is your name?"></app-input>
    </div>
</template>
<script lang="ts" src="./AppWhoAmI.ts"></script>
<style scoped lang="scss" src="./AppWhoAmI.scss"></style>
