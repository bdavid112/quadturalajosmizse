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
  ],
  editProperties: [
    "name",
    "email",
    "phone",
    "date",
    "tour",
    "atvs",
    "passengers",
  ],
  filterProperties: ["name", "email", "date", "tour"],
  actions: {
    edit: {
      isAccessible: ({ currentAdmin }) => {
        if (!currentAdmin) return false;
        return (
          currentAdmin.role === "superuser" || currentAdmin.role === "owner"
        );
      },
    },
    delete: {
      isAccessible: ({ currentAdmin, record }) => {
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

export default bookingResourceOptions;
