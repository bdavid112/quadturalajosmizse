import { ResourceOptions } from "adminjs";

const bookingResourceOptions: ResourceOptions = {
  listProperties: ["name", "email", "date", "tour"], // ✅ Columns visible in table view
  showProperties: [
    "name",
    "email",
    "phone",
    "date",
    "tour",
    "comment",
    "atvs",
    "passengers",
    "revenue",
  ], // ✅ Columns visible in details view
  editProperties: [
    "name",
    "email",
    "phone",
    "date",
    "tour",
    "atvs",
    "passengers",
  ],
  filterProperties: ["name", "email", "date", "tour"], // ✅ Fields available in the filter panel
};

export default bookingResourceOptions;
