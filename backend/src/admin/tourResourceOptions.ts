import { ResourceOptions } from "adminjs";

const tourResourceOptions: ResourceOptions = {
  titleProperty: "localizedTitle",
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
  filterProperties: [],
  actions: {
    new: {
      isAccessible: ({ currentAdmin }) => {
        if (!currentAdmin) return false;
        return (
          currentAdmin.role === "superuser" || currentAdmin.role === "owner"
        );
      },
    },
    edit: {
      isAccessible: ({ currentAdmin }) => {
        if (!currentAdmin) return false;
        return (
          currentAdmin.role === "superuser" || currentAdmin.role === "owner"
        );
      },
    },
    delete: {
      isAccessible: ({ currentAdmin }) => {
        if (!currentAdmin) return false;
        return (
          currentAdmin.role === "superuser" || currentAdmin.role === "owner"
        );
      },
    },
    bulkDelete: {
      isAccessible: ({ currentAdmin, record }) => {
        if (!currentAdmin || !record) return false;
        if (!currentAdmin) return false;
        return (
          currentAdmin.role === "superuser" || currentAdmin.role === "owner"
        );
      },
    },
  },
};

export default tourResourceOptions;
