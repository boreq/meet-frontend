import { Component, Vue } from 'vue-property-decorator';

import ContentHeader from '@/components/ContentHeader.vue';
import Boxes from '@/components/Boxes.vue';
import BoxesRow from '@/components/BoxesRow.vue';
import Box from '@/components/Box.vue';
import Devices from '@/components/Devices.vue';


@Component({
    components: {
        ContentHeader,
        Boxes,
        BoxesRow,
        Box,
        Devices,
    },
})
export default class Dashboard extends Vue {

    created(): void {
        // this.load();
    }

    destroyed(): void {
        // this.clearTimeout();
    }

    // private load(): void {
    // this.clearTimeout();
    // const ids = this.getIdsFromRoute();
    // this.apiService.browse(ids)
    //     .then(
    //         response => {
    //             this.album = response.data;
    //
    //             if (this.album.tracks) {
    //                 const trackAwaitingConversion = this.album.tracks.find(track => !track.duration);
    //                 if (trackAwaitingConversion) {
    //                     this.scheduleTimeout();
    //                 }
    //             }
    //         },
    //         error => {
    //             if (error.response.status === 403) {
    //                 this.forbidden = true;
    //             }
    //             Notifications.pushError(this, 'Could not list the tracks and albums.', error);
    //             this.scheduleTimeout();
    //         });
    // }

}
