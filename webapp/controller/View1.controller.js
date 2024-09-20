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
        
        onListItemPress: function(oEvent){
            var oSelectedOrder = oEvent.getParameter("listItem").getBindingContext().getObject();
            var sPath = `/Customers(CustomerID='${oSelectedOrder.CustomerID}')`
            var oModel = this.getOwnerComponent().getModel();
            oModel.read(sPath, {
                success: function(data) {
this.getView().getModel("Data").setProperty("/details", data);

                }.bind(this),
                error: () => {

                }
            })
        }
    });
});
