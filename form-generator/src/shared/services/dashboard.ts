// A concatenation of an OCS property SDS type code and Uom that _might_ be present on the OCS property should give a unique description of the type of quantity that is being represented
export const generateDashboardPropertyUnitCode = (property: any): string => {
  return `${property.Uom || ""}-${property.SdsType.SdsTypeCode}`;
};

// Data can be displayed as bivariate visualisations if it meets the following requirements:
// if the number of attributes is greater than or equal to 2
// AND if EITHER the following are true:
//    the number of distinct units EQUALS 1
//    the number of distinct units EQUALS 2
//      AND 1 of the units occurs ONCE among the selected settings
//      (this unique one will have to be the independent variable)
export const canSupportBivariateVisualisations = (
  propertySettings: any[]
): boolean => {
  const units: string[] = propertySettings.map((setting: any) =>
    generateDashboardPropertyUnitCode(setting.property)
  );
  const unitSet: Set<string> = new Set(units);
  const distinctUnits: number = unitSet.size;

  return (
    propertySettings.length >= 2 &&
    (distinctUnits === 1 ||
      (distinctUnits === 2 &&
        Array.from(unitSet).some(
          (unit: string) =>
            units.reduce(
              (count, item) => (item === unit ? count + 1 : count),
              0
            ) === 1
        )))
  );
};
