<template>
    <div class="app-input">
        <div v-if="icon" class="icon">
            <i :class="icon"></i>
        </div>
        <input :type="type" :placeholder="placeholder"
               :value="value" @input="$emit('input', $event.target.value)" @keydown="onKeyDown">
    </div>
</template>
<script lang="ts" src="./AppInput.ts"></script>
<style scoped lang="scss" src="./AppInput.scss"></style>
