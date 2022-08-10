export interface IDeviceCustomer {
  name: string;
  description: string;
}

export interface IDeviceProvider {
  name: string;
  description: string;
  provider_id: string;
}

export interface IDeviceType {
  name: string;
  description: string;
}

export interface IDeviceStatus {
  name: string;
  description: string;
}

export interface IDeviceInstallation {
  name: string;
  data: any;
}

export interface IDeviceIntegration {
  name: string;
  data: any;
}

export interface IDevice {
  id: number;
  device_id: string;
  board_version: string | null;
  code: string;
  name: string;
  connected_sensors: string | null;
  created_at: string;
  description: string | null;
  device_type: IDeviceType | null;
  firmware_version: string | null;
  install_comment: string | null;
  install_date: string | null;
  install_latitude: string | null;
  install_location: string | null;
  install_longitude: string | null;
  install_rssi: string | null;
  installation_id: string | null;
  integration_id: string | null;
  provider_id: string | null;
  model: string | null;
  notes: string | null;
  pac: string | null;
  status: number;
  status_message: string | null;
  updated_at: string;
  customer: IDeviceCustomer | null;
  provider: IDeviceProvider | null;
  integration: IDeviceIntegration | null;
  installation: IDeviceInstallation | null;
}

export interface IProjectDeviceDictionary {
  [projectId: number]: IDevice[];
}
