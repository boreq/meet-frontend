<template>
    <box class="controller">
        <content-header text="Controller">
            <app-button text="Save" v-if="changed"></app-button>
        </content-header>
        <box-content>
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

            <devices :devices="controller.devices" @change="onDevicesChanged"></devices>
        </box-content>
    </box>
</template>
<script lang="ts" src="./Controller.ts"></script>
<style scoped lang="scss" src="./Controller.scss"></style>
