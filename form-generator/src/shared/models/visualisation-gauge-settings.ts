export interface IVisualisationGaugeSettingsRange {
  id: any;
  value: number;
  colourHex: string;
}

export interface IVisualisationGaugeSettings {
  id: any;
  minimum: number;
  ranges: IVisualisationGaugeSettingsRange[];
}
