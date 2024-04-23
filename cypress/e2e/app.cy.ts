import * as utils from "../support/utils";
//
describe("Visit the site and load initial informations", () => {
  it("should open the site", () => {
    cy.visit("/");
  });

  it("should load the Navbar", () => {
    cy.visit("/");
    cy.get(utils.searchBarInput);
    cy.get(utils.typeSearchSelect);
  });

  it('should load "Carregando" paragraph before rendering medicine list', () => {
    cy.visit("/");
    cy.get(utils.loadingParagraph);
  });

  it("should load the first page of medicine list", () => {
    cy.visit("/");
    cy.get(utils.medicineItemList);
  });

  it("should load paginations buttons", () => {
    cy.visit("/");
    cy.get(utils.paginationButton + "1");
  });
});

describe("Visit the site and open medicine modal", () => {
  it("should open the site and load initial informations ", () => {
    cy.visit("/");
    cy.get(utils.searchBarInput);
    cy.get(utils.typeSearchSelect);
    cy.get(utils.loadingParagraph);
    cy.get(utils.medicineItemList);
    cy.get(utils.paginationButton + "1");
  });

  it("should open the medicine modal", () => {
    cy.visit("/");
    cy.get(utils.medicineItemList);
    cy.get(utils.medicineItemList).click();
    cy.get(utils.medicineModalContent).should("be.visible");
  });

  it("should load all medicine modal items", () => {
    cy.visit("/");
    cy.get(utils.medicineItemList);
    cy.get(utils.medicineItemList).click();
    cy.get(utils.medicineModalContent).should("be.visible");
    cy.get(utils.closeModalButton);
    cy.get(utils.medicineModalContentTitle);
    cy.get(utils.medicineModalContentCompany);
    cy.get(utils.medicineModalContentPrincipleActive);
    cy.get(utils.medicineModalContentPrincipleActiveItems);
    cy.get(utils.medicineModalContentDigitalLeaflet);
    cy.get(utils.medicineModalContentDigitalLeafletItems);
  });

  it("should open an pdf when click on Digial Leaflet options", () => {
    cy.visit("/");
    cy.get(utils.medicineItemList);
    cy.get(utils.medicineItemList).click();
    cy.get(utils.medicineModalContent).should("be.visible");
    cy.window().then((win) => {
      cy.get(utils.medicineModalContentDigitalLeafletItems).click();
      cy.wait(1000);
      cy.window().then((newWin) => {
        expect(utils.pdfUrl).to.include(".pdf");
      });
    });
  });

  it("should close the medicine modal", () => {
    cy.visit("/");
    cy.get(utils.medicineItemList);
    cy.get(utils.medicineItemList).click();
    cy.get(utils.medicineModalContent).should("be.visible");
    cy.get(utils.closeModalButton).click();
    cy.get(utils.medicineModalContent, { timeout: 0 }).should("not.exist");
  });
});

describe("Change pagination page", () => {
  it("should change to page 2", () => {
    cy.visit("/");
    cy.get(utils.paginationButton + "2").click();
    cy.get(utils.medicineItemList).should("be.visible");
    cy.get(utils.paginationButton + "2").should("be.disabled");
  });
});

describe("Search by medicine or company", () => {
  it("should search a medicine by name", () => {
    cy.visit("/");
    cy.get(utils.medicineItemList);
    cy.get(utils.searchBarInput).type(utils.medicineName);
    cy.get(utils.typeSearchSelect).select(utils.selectMedicine);
    cy.get(utils.medicineItemList).contains(utils.medicineName);
  });
  it("should search a medicine by name with select in company and retrieve nothing", () => {
    cy.visit("/");
    cy.get(utils.medicineItemList);
    cy.get(utils.searchBarInput).type(utils.medicineName);
    cy.get(utils.typeSearchSelect).select(utils.selectCompany);
    cy.get(utils.noResultsFound).contains(utils.noResultsFoundText);
  });
  it("should search a company", () => {
    cy.visit("/");
    cy.get(utils.medicineItemList);
    cy.get(utils.searchBarInput).type(utils.companyName);
    cy.get(utils.typeSearchSelect).select(utils.selectCompany);
    cy.get(utils.medicineItemList).contains(utils.companyName);
  });
  it("should search a company with select in name and retrieve nothing", () => {
    cy.visit("/");
    cy.get(utils.medicineItemList);
    cy.get(utils.searchBarInput).type(utils.companyName);
    cy.get(utils.typeSearchSelect).select(utils.selectMedicine);
    cy.get(utils.noResultsFound).contains(utils.noResultsFoundText);
  });
});
