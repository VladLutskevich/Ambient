import globalAxios, { AxiosInstance } from 'axios';

export interface CarData {
    id: number;
    number: string;
}

export interface BaseStationHistory{
  id: number,
  attr_name: string,
  oldVal: string,
  newVal: string,
  Id_BS: number,
  date: string
}

export interface BaseStation
  {
    status?: string;
    Id_BS: number,
    car_id: number,
    BS_MAC: string,
    BS_type: number | string,
    BS_name: string,
    BS_gms_hw: number,
    BS_gsm_opname: string,
    BS_gsm_num: string,
    BS_gsm_bill: string,
    BS_gsm_status: number,
    BS_gsm_signal: number,
    BS_bat: number,
    BS_bat_limit: number,
    BS_bat_chrg: number,
    BS_pwr_type: number | string,
    BS_rf_qty: number,
    BS_rf_status: string,
    BS_rf_SSID: string,
    BS_rf_chan: string,
    BS_lat: string,
    BS_long: string,
    BS_datetime: string,
    BS_uptime: string,
    BS_trip_id: number | string,
    BS_New_Sett_Apply: number,
    BS_last_update: string,
    is_hide: number,
    batlevel: number,
    gsm: number,
    car: {
        id: number,
        number: string
    },
    history: BaseStationHistory[]
}


export class RequestService {
    private axios: AxiosInstance;
  
    constructor() {
      this.axios = globalAxios.create({ baseURL: `http://83.220.174.66/web/` });
    }
  
    async getCars() {
      const result = await this.axios.get<CarData[]>(`cars`);
      return result.data;
    }

    async getBaseStations() {
      const result = await this.axios.get<BaseStation[]>(`bs?expand=history`);
      return result.data;
    }
}