<template>
    <ul class="app-notifications">
        <li class="notification" :class="[notification.class, shouldHide(notification) ? 'hide': '']" v-for="notification of notifications" :key="notification.id">
            <div class="text">
                {{ notification.text }}
            </div>
            <div class="extra" v-if="notification.extra">
                {{ notification.extra }}
            </div>
        </li>
    </ul>
</template>
<script lang="ts" src="./AppNotifications.ts"></script>
<style scoped lang="scss" src="./AppNotifications.scss"></style>
