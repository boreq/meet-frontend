<template>
    <div class="main-menu">
        <ul class="items">
            <li class="item" v-for="entry in entries" :class="{active: entry === active}">
                <router-link :to="entry.target">
                    <div class="icon">
                        <i class="fas fa-leaf"></i>
                    </div>
                    <div class="label">
                        {{ entry.label }}
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" src="./MainMenu.ts"></script>
<style scoped lang="scss" src="./MainMenu.scss"></style>
