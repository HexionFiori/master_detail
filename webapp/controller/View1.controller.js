sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sample.app.zmasterdetail.controller.View1", {
            onInit: function () {
                this.getView().setModel(new JSONModel(), "Data");
            },

            onListItemPress: function (oEvent) {
                var oSelectedOrder = {};
                if (oEvent) {
                    oSelectedOrder = oEvent.getParameter("listItem").getBindingContext().getObject();

                } else {
                    oSelectedOrder = this.oInitialData
                }
                var sPath = `/Customers(CustomerID='${oSelectedOrder.CustomerID}')`
                var oModel = this.getOwnerComponent().getModel();
                oModel.read(sPath, {
                    success: function (data) {
                        this.getView().getModel("Data").setProperty("/details", data);

                    }.bind(this),
                    error: () => {

                    }
                })
                var filter = new sap.ui.model.Filter("CustomerID", "EQ", oSelectedOrder.CustomerID);
                var sOrdersPath = `/Orders`
                oModel.read(sOrdersPath, {
                    filters: [filter],
                    success: function (data) {
                        
                        this.getView().getModel("Data").setProperty("/Orders", data.results);
                        this.getView().byId("sProdcutTitle").setText(`Orders (${data.results.length})`)
                    }.bind(this),
                    error: () => {

                    }
                })


                var sEMpPath = `/Employees(1)`
                oModel.read(sEMpPath, {
                    success: function (data) {
                        
                        this.getView().getModel("Data").setProperty("/emp", data);
                    }.bind(this),
                    error: () => {

                    }
                })
            },
            onCustomerListUpdateFinished: function (oEVent) {
                
                this.getView().byId("master2").setTitle("Customers (" +  oEVent.getSource().getItems().length + ")");
                oEVent.getSource().setSelectedItem(1)
                this.oInitialData = oEVent.getSource().getItems()[0].getBindingContext().getObject();
                this.onListItemPress();
                
            }
        });
    });
