import { ResourceOptions } from "adminjs";

const tourResourceOptions: ResourceOptions = {
  listProperties: ["name.hu", "prices.atvPrice", "prices.passengerPrice"], // ✅ Columns visible in table view
  showProperties: [
    "name",
    "prices",
    "descriptionShort",
    "descriptionLong",
    "attributes",
    "buttonPrimary",
    "buttonSecondary",
  ], // ✅ Columns visible in details view
  editProperties: [
    "name",
    "prices",
    "descriptionShort",
    "descriptionLong",
    "attributes",
    "buttonPrimary",
    "buttonSecondary",
  ],
  filterProperties: [], // ✅ Fields available in the filter panel
};

export default tourResourceOptions;
