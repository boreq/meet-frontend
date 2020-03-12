import axios, { AxiosResponse } from 'axios'; // do not add { }, some webshit bs?
import { Controller } from '@/model/Controller';
import { AddControllerCommand } from '@/model/AddControllerCommand';
import { Device } from '@/model/Device';

export class ApiService {

    private readonly axios = axios.create();

    listControllers(): Promise<AxiosResponse<Controller[]>> {
        const url = `hydro/controllers`;
        return this.axios.get<Controller[]>(process.env.VUE_APP_API_PREFIX + url);
    }

    listControllerDevices(controllerUUID: string): Promise<AxiosResponse<Device[]>> {
        const url = `hydro/controllers/${controllerUUID}/devices`;
        return this.axios.get<Device[]>(process.env.VUE_APP_API_PREFIX + url);
    }

    addController(cmd: AddControllerCommand): Promise<AxiosResponse<void>> {
        const url = `hydro/controllers`;
        return this.axios.post<void>(process.env.VUE_APP_API_PREFIX + url, cmd);
    }

}
