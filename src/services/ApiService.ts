import axios, { AxiosResponse } from 'axios'; // do not add { }, some webshit bs?
import { Controller } from '@/model/Controller';

/*
declare module 'vue-property-decorator' {
    interface Vue {
        $cookie: any;
    }
}
*/

// const authTokenHeaderName = 'Access-Token';

export class ApiService {

    private readonly axios = axios.create();
    // private readonly authService = new AuthService();

    // constructor(private vue: any) {
    //     this.axios.interceptors.request.use(
    //         config => {
    //             const token = this.authService.getToken();
    //             if (token) {
    //                 config.headers[authTokenHeaderName] = token;
    //             }
    //             return config;
    //         },
    //         error => {
    //             return Promise.reject(error);
    //         },
    //     );
    //
    //     this.axios.interceptors.response.use(
    //         response => {
    //             return response;
    //         },
    //         error => {
    //             if (error.response && error.response.status === 401) {
    //                 this.authService.clearToken();
    //                 this.vue.$store.commit(Mutation.SetUser, null);
    //             }
    //             return Promise.reject(error);
    //         });
    // }

    listControllers(): Promise<AxiosResponse<Controller[]>> {
        const url = `controllers`;
        return this.axios.get<Controller[]>(process.env.VUE_APP_API_PREFIX + url);
    }

    // stats(): Promise<AxiosResponse<Stats>> {
    //     const url = `stats`;
    //     return this.axios.get<Stats>(process.env.VUE_APP_API_PREFIX + url);
    // }
    //
    // trackUrl(track: Track): string {
    //     const url = `track/${track.fileId}`;
    //     return process.env.VUE_APP_API_PREFIX + url;
    // }
    //
    // thumbnailUrl(album: Album): string {
    //     const url = `thumbnail/${album.thumbnail.fileId}`;
    //     return process.env.VUE_APP_API_PREFIX + url;
    // }
    //
    // initialize(cmd: CommandInitialize): Promise<AxiosResponse<void>> {
    //     const url = `auth/register-initial`;
    //     return this.axios.post<void>(process.env.VUE_APP_API_PREFIX + url, cmd);
    // }
    //
    // login(cmd: LoginCommand): Promise<void> {
    //     const url = `auth/login`;
    //     return new Promise((resolve, reject) => {
    //         this.axios.post<LoginResponse>(process.env.VUE_APP_API_PREFIX + url, cmd)
    //             .then(
    //                 response => {
    //                     this.authService.storeToken(response.data.token);
    //                     this.refreshCurrentUser()
    //                         .then(
    //                             () => {
    //                                 resolve();
    //                             },
    //                             error => {
    //                                 reject(error);
    //                             },
    //                         );
    //                 },
    //                 error => {
    //                     reject(error);
    //                 },
    //             );
    //     });
    // }
    //
    // logout(): Promise<void> {
    //     const url = `auth/logout`;
    //     return new Promise((resolve, reject) => {
    //         this.axios.post<void>(process.env.VUE_APP_API_PREFIX + url)
    //             .then(
    //                 () => {
    //                     this.authService.clearToken();
    //                     this.vue.$store.commit(Mutation.SetUser, null);
    //                     resolve();
    //                 },
    //                 error => {
    //                     reject(error);
    //                 },
    //             );
    //     });
    // }
    //
    // refreshCurrentUser(): Promise<User> {
    //     const url = `auth`;
    //     return new Promise((resolve, reject) => {
    //         this.axios.get<User>(process.env.VUE_APP_API_PREFIX + url)
    //             .then(
    //                 response => {
    //                     this.vue.$store.commit(Mutation.SetUser, response.data);
    //                     resolve(response.data);
    //                 },
    //                 error => {
    //                     if (error.response && error.response.status === 401) {
    //                         resolve(null);
    //                     } else {
    //                         reject(error);
    //                     }
    //                 },
    //             );
    //     });
    // }
    //
    // register(cmd: RegisterCommand): Promise<AxiosResponse<void>> {
    //     const url = `auth/register`;
    //     return this.axios.post<void>(process.env.VUE_APP_API_PREFIX + url, cmd);
    // }
    //
    // list(): Promise<AxiosResponse<User[]>> {
    //     const url = `auth/users`;
    //     return this.axios.get<User[]>(process.env.VUE_APP_API_PREFIX + url);
    // }
    //
    // createInvitation(): Promise<AxiosResponse<Invitation>> {
    //     const url = `auth/create-invitation`;
    //     return this.axios.post<Invitation>(process.env.VUE_APP_API_PREFIX + url);
    // }
    //
    // remove(username: string): Promise<AxiosResponse<void>> {
    //     username = encodeURIComponent(username);
    //     const url = `auth/users/${username}/remove`;
    //     return this.axios.post<void>(process.env.VUE_APP_API_PREFIX + url);
    // }

}
