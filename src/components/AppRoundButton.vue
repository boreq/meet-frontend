<template>
    <a class="app-round-button" :class="{ disabled: disabled, working: working }" @click="onClick">
        <div class="content">
            <span v-if="!working">
                <slot></slot>
            </span>
            <spinner v-if="working"></spinner>
        </div>
    </a>
</template>
<script lang="ts" src="./AppRoundButton.ts"></script>
<style scoped lang="scss" src="./AppRoundButton.scss"></style>
