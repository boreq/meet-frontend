<template>
    <div class="controllers">
        <content-header text="Controllers">
            <app-button text="Add controller" @click="addController"></app-button>
        </content-header>

        <boxes>
            <boxes-row>
                <box text="Devices">
                    <devices></devices>
                </box>
            </boxes-row>
        </boxes>
    </div>
</template>
<script lang="ts" src="./Controllers.ts"></script>
<style scoped lang="scss" src="./Controllers.scss"></style>
