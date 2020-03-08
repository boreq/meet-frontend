<template>
    <div class="add-controller">
        <main-layout>
            <content-header text="Add Controller">
                <app-button text="Save" :disabled="!formValid" :working="working" @click="submit"></app-button>
                <app-button text="Cancel" @click="goToControllers"></app-button>
            </content-header>

            <main-layout-content>
                <boxes>
                    <boxes-row>
                        <box text="Controller">
                            <form-input type="text" placeholder="Address" icon="fas fa-network-wired"
                                        v-model="cmd.address" @submit="submit"></form-input>
                        </box>
                    </boxes-row>
                </boxes>
            </main-layout-content>
        </main-layout>
    </div>
</template>
<script lang="ts" src="./AddController.ts"></script>
<style scoped lang="scss" src="./AddController.scss"></style>
