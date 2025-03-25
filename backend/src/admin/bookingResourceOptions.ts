import { ResourceOptions } from "adminjs";
import Tour from "../models/Tour.js";

export async function calculateRevenueFromPayload(
  payload: any
): Promise<number | undefined> {
  const { atvs, passengers, tour: tourId } = payload ?? {};

  if (!tourId || atvs == null || passengers == null) return;

  const tour = await Tour.findById(tourId);

  if (!tour || !tour.prices) return;

  const { atvPrice, passengerPrice } = tour.prices;

  return Number(atvs) * atvPrice + Number(passengers) * passengerPrice;
}

const bookingResourceOptions: ResourceOptions = {
  properties: {
    tourId: {
      reference: "Tour",
    },
  },
  listProperties: ["name", "email", "date", "tourId", "revenue", "isPaid"], // ✅ Columns visible in table view
  showProperties: [
    "name",
    "email",
    "createdAt",
    "date",
    "tourId",
    "atvs",
    "revenue",
    "comment",
    "isPaid",
    "paidAt",
  ],
  editProperties: [
    "name",
    "email",
    "date",
    "tourId",
    "atvs",
    "comment",
    "isPaid",
  ],
  filterProperties: ["name", "email", "date", "tourId", "isPaid"],
  actions: {
    new: {
      before: async (request) => {
        const revenue = await calculateRevenueFromPayload(request.payload);
        if (revenue != null) {
          request.payload = {
            ...request.payload,
            revenue,
          };
        }
        return request;
      },
    },
    edit: {
      before: async (request) => {
        const revenue = await calculateRevenueFromPayload(request.payload);
        if (revenue != null) {
          request.payload = {
            ...request.payload,
            revenue,
          };
        }
        return request;
      },
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
