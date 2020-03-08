<template>
    <div class="controllers">
        <main-layout>
            <content-header text="Controllers">
                <app-button text="Add controller" @click="addController"></app-button>
            </content-header>

            <main-layout-content>
                <boxes class="boxes">
                    <boxes-row v-for="controller of controllers">
                        <box text="Controller">
                            <ul class="properties">
                                <li class="property" v-tooltip="'Controller UUID.'">
                                    <div class="icon">
                                        <i class="fas fa-fingerprint"></i>
                                    </div>
                                    <div class="value">
                                        <pre>{{ controller.uuid }}</pre>
                                    </div>
                                </li>
                                <li class="property" v-tooltip="'Controller address.'">
                                    <div class="icon">
                                        <i class="fas fa-network-wired"></i>
                                    </div>
                                    <div class="value">
                                        <pre>{{ controller.address }}</pre>
                                    </div>
                                </li>
                            </ul>

                            <devices></devices>
                        </box>
                    </boxes-row>
                </boxes>
            </main-layout-content>
        </main-layout>
    </div>
</template>
<script lang="ts" src="./Controllers.ts"></script>
<style scoped lang="scss" src="./Controllers.scss"></style>
