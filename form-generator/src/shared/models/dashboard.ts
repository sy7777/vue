import { IAsset } from "./asset";
import { IVisualisation } from "./visualisation";

export interface IDashboard {
  id: any;
  asset: IAsset;
  name: string;
  visualisations: IVisualisation[];
  published?: boolean;
  columnCount: number;
  updatedAt: string;
  favourite?: boolean;
}
