<template>
    <div class="box">
        <content-header :text="text"></content-header>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts" src="./Box.ts"></script>
<style scoped lang="scss" src="./Box.scss"></style>
