export const locale = {
  language: "hu",
  availableLanguages: ["hu"],
  translations: {
    hu: {
      components: {
        Login: {
          welcomeHeader: "Üdvözöljük az Admin Felületen!",
          welcomeMessage:
            "Kezeld egyszerűen és hatékonyan a foglalásokat és túrákat ezen a biztonságos adminisztrációs panelen keresztül",
          properties: {
            email: "Email",
            password: "Jelszó",
          },
          loginButton: "Bejelentkezés",
        },
      },
      labels: {
        navigation: "Navigáció",
        dashboard: "Vezérlőpult",
        filters: "Szűrők",
        selectedRecords: "Kijelölt elemek",
        loginWelcome: "Bejelentkezés az adminisztrációs rendszerbe",
        Booking: "Foglalások",
        Tour: "Túrák",
        AdminUser: "Felhasználók",
      },
      properties: {
        name: "Név",
        email: "E-mail",
        date: "Dátum",
        tourId: "Túra",
        atvs: "Quadok",
        passengers: "Utasok",
        comment: "Megjegyzés",
        revenue: "Bevétel",
        description: "Leírás",
        descriptionShort: "Rövid leírás",
        descriptionLong: "Részletes leírás",
        attributes: "Jellemzők",
        prices: "Árak",
        buttonPrimary: "Elsődleges gomb",
        buttonSecondary: "Másodlagos gomb",
        password: "Jelszó",
      },
      buttons: {
        save: "Mentés",
        addNewItem: "Új hozzáadása",
        filter: "Szűrés",
        applyChanges: "Alkalmazás",
        resetFilter: "Szűrők törlése",
        confirmRemovalMany: "Kijelöltek törlése",
        confirmRemovalMany_plural: "Kijelöltek törlése",
        logout: "Kijelentkezés",
        createFirstRecord: "Első rekord létrehozása",
      },
      actions: {
        list: "Lista",
        edit: "Szerkesztés",
        delete: "Törlés",
        show: "Megtekintés",
        new: "Új létrehozása",
        bulkDelete: "Kijelöltek törlése",
        search: "Keresés",
      },
      messages: {
        noRecords: "Nincsenek elérhető rekordok",
        noRecordsInResource: "Ebben az erőforrásban nincsenek rekordok",
        selectedRecords: "Kijelölt rekordok",
        confirmDelete: "Biztosan törölni szeretnéd?",
        successfullyDeleted: "Sikeresen törölve!",
        successfullyCreated: "Sikeresen létrehozva!",
        successfullyUpdated: "Sikeresen frissítve!",
        theseRecordsWillBeRemoved_plural: "Ezek az elemek törölve lesznek",
        invalidCredentials: "Helytelen e-mail cím vagy jelszó",
      },
      resources: {
        Booking: {
          actions: {
            new: "Új foglalás létrehozása",
            edit: "Szerkesztés",
            delete: "Törlés",
          },
        },
        Tour: {
          properties: {
            name: {
              en: "Túra neve (angol)",
              hu: "Túra neve (magyar)",
            },
            prices: {
              atvPrice: "Quad ár (Ft)",
              passengerPrice: "Utas ár (Ft)",
            },
            descriptionShort: {
              en: "Rövid leírás (angol)",
              hu: "Rövid leírás (magyar)",
            },
            descriptionLong: {
              en: "Részletes leírás (angol)",
              hu: "Részletes leírás (magyar)",
            },
            attributes: {
              en: "Jellemzők (angol)",
              hu: "Jellemzők (magyar)",
            },
            buttonPrimary: {
              en: "Elsődleges gomb (angol)",
              hu: "Elsődleges gomb (magyar)",
            },
            buttonSecondary: {
              en: "Másodlagos gomb (angol)",
              hu: "Másodlagos gomb (magyar)",
            },
          },
          actions: {
            new: "Új túra létrehozása",
            edit: "Szerkesztés",
            delete: "Törlés",
          },
        },
      },
    },
  },
};
