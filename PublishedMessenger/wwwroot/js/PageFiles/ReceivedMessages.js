import { createGuid } from "../../ts/GeneralClasses/JsToTs.js"
import { extendedAddEventListener } from "../GeneralFiles/ExtendedEventListenersFunctions.js"

globalThis.pageFunctions["ReceivedMessages"] = function () {

    const iframe = document.querySelector("iframe");
    const toolsNavbar = document.querySelector("tools-navbar");
    const toolsNavbarMenuList = document.querySelector("tools-navbar-menu-list");

    (function setToolsNavbar() {
        toolsNavbar.setTools("ReceivedMessages");
    })();

    (function setToolsNavbarMenuListItemSelected() {
        toolsNavbarMenuList.setItemSelected("Received messages");
    })();

    (function setSearchEvent() {

        extendedAddEventListener(iframe, "load", function () {
            const grid = iframe.contentDocument.querySelector("web-grid");
            globalThis.searchOnGrid = function (value) {
                grid.setSearchedRows(value);
            }

            document.querySelector("web-navbar").setSearchFunction("globalThis.searchOnGrid");
        });

    })();

    (function setGridSelectionFunction() {

        const doc = document;
        extendedAddEventListener(iframe, "load", function () {
            const grid = iframe.contentDocument.querySelector("web-grid");
            grid.toolsNavbar = toolsNavbar;
            const selectionFunctoin =
                `
            const selectedEntities = grid.getSelectedEntities();
            if (selectedEntities.length == 0)
            {
                grid.toolsNavbar.setMarkAsReadEnability(false);
                grid.toolsNavbar.setPinEnability(false);
                grid.toolsNavbar.setDeleteEnability(false);
                grid.toolsNavbar.setReplyEnability(false);
                grid.toolsNavbar.setShowEnability(false);
            }
            else if (selectedEntities.length == 1)
            {
                grid.toolsNavbar.setPinEnability(true);
                grid.toolsNavbar.setDeleteEnability(true);
                grid.toolsNavbar.setReplyEnability(true);
                grid.toolsNavbar.setShowEnability(true);

                const entity = selectedEntities[0];
                if (!entity.hasBeenSeen) {
                    grid.toolsNavbar.setMarkAsReadEnability(true);
                }
                else {
                    grid.toolsNavbar.setMarkAsReadEnability(false);
                }
            }
            else if (selectedEntities.length > 1)
            {
                grid.toolsNavbar.setMarkAsReadEnability(false);
                grid.toolsNavbar.setPinEnability(false);
                grid.toolsNavbar.setDeleteEnability(true);
                grid.toolsNavbar.setReplyEnability(false);
                grid.toolsNavbar.setShowEnability(false);
            }
            `;
            grid.setSelectionFunctoin(selectionFunctoin);
        });

    })();

    (function setShowButtonFunction() {

        globalThis.showButtonFunction = function () {
            const grid = iframe.contentDocument.querySelector("web-grid");
            const selectedEntity = grid.getSelectedEntities()[0];
            const id = selectedEntity.id;
            globalThis.setPageWithParameters("ShowMessage", { "messageId": id });
        };

        toolsNavbar.setShowFunction("globalThis.showButtonFunction");

    })();

    (function setDeleteButtonFunction() {

        globalThis.deleteButtonFunction = function () {
            const deleteMessage = document.querySelector("delete-message");
            deleteMessage.setOn();
        };

        toolsNavbar.setDeleteFunction("globalThis.deleteButtonFunction");

    })();

    (function setReplyButtonFunction() {

        globalThis.replyButtonFunction = function () {
            const doc = iframe.contentDocument;
            const grid = doc.querySelector("web-grid");
            const entity = grid.getSelectedEntities()[0];
            const id = entity.id;
            const parameters = { 'replyId': id };
            globalThis.setPageWithParameters("Reply", parameters);
        };

        toolsNavbar.setReplyFunction("globalThis.replyButtonFunction");

    })();

    (function setPinButtonFunction() {

        globalThis.pinButtonFunction = function () {
            const doc = iframe.contentDocument;
            const grid = doc.querySelector("web-grid");
            const entity = grid.getSelectedEntities()[0];
            const id = entity.id;
            doc.pinRow(id);
            grid.setGridContent();
        }

        toolsNavbar.setPinFunction("globalThis.pinButtonFunction");

    })();

    (function setMarkAsReadButtonFunction() {

        globalThis.markAsReadButtonFunction = function () {
            const doc = iframe.contentDocument;
            const grid = doc.querySelector("web-grid");
            const entity = grid.getSelectedEntities()[0];
            const id = entity.id;
            doc.markAsRead(id);
            grid.setGridContent();
        }

        toolsNavbar.setMarkAsReadFunction("globalThis.markAsReadButtonFunction");

    })();

    (function setDeleteMessagesFunction() {

        globalThis.deleteMessages = function () {
            const doc = iframe.contentDocument;
            const grid = doc.querySelector("web-grid");
            const ids = grid.getSelectedEntities().map(c => c.id);
            const isPossible = doc.isPossibleToDelete(ids);
            if (isPossible) {
                doc.deleteMessages(ids);
                grid.refreshGrid();
            }
            else {
                console.log("There is a dependent message!!");
            }
        }

    })();

}
