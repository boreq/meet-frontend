import { Component, Vue } from 'vue-property-decorator';


class MenuEntry {
    label: string;
    target: string;
    extra: string[];
}

@Component
export default class MainMenu extends Vue {

    entries: MenuEntry[] = [
        {
            label: 'Dashboard',
            target: '/dashboard',
            extra: [],
        },
        {
            label: 'Controllers',
            target: '/controllers',
            extra: [
                '/add-controller',
            ],
        },
        {
            label: 'Settings',
            target: '/settings',
            extra: [],
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
        const target = [
            entry.target,
            ...entry.extra,
        ].find(target => this.$route.fullPath.startsWith(target));
        return !!target;
    }

}
