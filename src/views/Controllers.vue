<template>
    <div class="controllers">
        <main-layout>
            <content-header text="Controllers">
                <app-button text="Add controller" @click="addController"></app-button>
            </content-header>

            <main-layout-content>
                <boxes class="boxes">
                    <boxes-row v-for="(controller, index) of controllers">
                        <controller :controller="controller" @devices-changed="devicesChanged(index, $event)" @save-devices=""></controller>
                    </boxes-row>
                </boxes>

                <spinner class="loading" v-if="controllers === null"></spinner>
                <p class="empty" v-if="controllers && controllers.length === 0">
                    There are no controllers.
                </p>
            </main-layout-content>
        </main-layout>
    </div>
</template>
<script lang="ts" src="./Controllers.ts"></script>
<style scoped lang="scss" src="./Controllers.scss"></style>
