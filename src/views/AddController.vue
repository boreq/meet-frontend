<template>
    <div class="add-controller">
        <content-header text="Add Controller">
            <app-button text="Save"></app-button>
            <app-button text="Cancel"></app-button>
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
<script lang="ts" src="./AddController.ts"></script>
<style scoped lang="scss" src="./AddController.scss"></style>
