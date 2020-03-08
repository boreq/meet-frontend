import { Component, Vue } from 'vue-property-decorator';


class MenuEntry {
    label: string;
    target: string;
}

@Component
export default class MainMenu extends Vue {

    entries: MenuEntry[] = [
        {
            label: 'Dashboard',
            target: '/dashboard',
        },
        {
            label: 'Controllers',
            target: '/controllers',
        },
        {
            label: 'Settings',
            target: '/settings',
        },
    ];

    get active(): MenuEntry {
        for (const entry of this.entries) {
            if (this.isActive(entry)) {
                return entry;
            }
        }
        return null;
    }

    private isActive(entry: MenuEntry): boolean {
        return this.$route.fullPath.startsWith(entry.target);
    }

}
