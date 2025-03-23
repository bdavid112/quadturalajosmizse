import { ResourceOptions } from "adminjs";

const reviewResourceOptions: ResourceOptions = {
  listProperties: ["name", "rating"],
  showProperties: ["name", "comment", "rating"],
  editProperties: [],
  filterProperties: ["name", "rating"],
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

export default reviewResourceOptions;
