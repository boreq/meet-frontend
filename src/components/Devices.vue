<template>
    <ul class="devices">
        <li class="device" v-for="device in devices">
            <div class="label">
                <i class="fas fa-plug"></i>
                {{ device.id }}
            </div>
            <div class="schedule">
                <schedule></schedule>
            </div>
        </li>
    </ul>
</template>
<script lang="ts" src="./Devices.ts"></script>
<style scoped lang="scss" src="./Devices.scss"></style>
