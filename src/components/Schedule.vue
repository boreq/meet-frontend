<template>
    <div class="schedule">
        <div class="bar"
            @click.middle="onMiddleClick" @mousemove="onMouseMove" @mousedown="onMouseDown" @mouseup="onMouseUp" @mouseleave="onMouseLeave">
            <div class="period" :style="periodStyle(period)" v-for="period in periods">
                <div class="wrapper">
                    <div class="label-start">
                        {{ formatTime(period.start) }}
                    </div>

                    <div class="label-end">
                        {{ formatTime(period.end) }}
                    </div>

                    <div class="node-start"></div>
                    <div class="node-end"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./Schedule.ts"></script>
<style scoped lang="scss" src="./Schedule.scss"></style>
