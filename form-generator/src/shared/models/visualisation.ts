import { VisualisationAttributeInterpretation } from "@/shared/constants";

export interface IBivariateSettings {
  independentPropertyId: string;
}

export interface IVisualisationPropertySettings {
  id: string;
  sdsStreamId: string;
  interpretation: VisualisationAttributeInterpretation;
  property: any;
}

export interface IVisualisation {
  id?: any;
  name: string;
  visualisationType: string;
  bivariateSettings: IBivariateSettings;
  propertySettings: IVisualisationPropertySettings[];
  columnSpan: number;
  order: number;
}
