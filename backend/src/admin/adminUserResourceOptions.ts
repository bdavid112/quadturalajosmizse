import { ResourceOptions } from "adminjs";

const adminUserResourceOptions: ResourceOptions = {
  listProperties: ["email", "role"], // ✅ Columns visible in table view
  showProperties: ["email", "password", "role"], // ✅ Columns visible in details view
  editProperties: ["email", "password"],
  filterProperties: ["email", "role"], // ✅ Fields available in the filter panel
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
      isAccessible: ({ currentAdmin, record }) => {
        if (!currentAdmin || !record) return false;
        return (
          currentAdmin.role === "superuser" ||
          (currentAdmin.role === "owner" &&
            record.get("role") != "superuser") ||
          currentAdmin._id === record.get("_id")
        );
      },
    },
    delete: {
      isAccessible: ({ currentAdmin, record }) => {
        if (!currentAdmin || !record) return false;
        return (
          (currentAdmin.role === "superuser" &&
            currentAdmin._id !== record.get("_id")) ||
          (currentAdmin.role === "owner" &&
            record.get("role") !== "superuser" &&
            currentAdmin._id !== record.get("_id"))
        );
      },
    },
    bulkDelete: {
      isAccessible: ({ currentAdmin, record }) => {
        if (!currentAdmin || !record) return false;
        return (
          (currentAdmin.role === "superuser" &&
            currentAdmin._id !== record.get("_id")) ||
          (currentAdmin.role === "owner" &&
            record.get("role") !== "superuser" &&
            currentAdmin._id !== record.get("_id"))
        );
      },
    },
  },
};

export default adminUserResourceOptions;
