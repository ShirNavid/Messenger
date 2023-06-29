import { extendedAddEventListener } from "../GeneralFiles/ExtendedEventListenersFunctions.js";

const toolsNavbar = document.querySelector("tools-navbar");
const toolsNavbarMenuList = document.querySelector("tools-navbar-menu-list");
const iframe = document.querySelector("iframe");

globalThis.pageFunctions["Reply"] = function () {

    (function setToolsNavbar() {
        toolsNavbar.setTools("Reply");
    })();

    (function setToolsNavbarMenuListItemSelected() {
        toolsNavbarMenuList.setItemSelected("");
    })();

    (function setSendFunction() {

        globalThis.sendFunction = function () {
            const replyId = iframe.contentDocument.querySelector("reply-id").innerHTML;
            const title = iframe.contentDocument.querySelector("#title").value;
            const text = iframe.contentDocument.querySelector("#text").value;
            const date = toolsNavbar.getDate();
            const time = toolsNavbar.getTime();
            const fileTransaction = iframe.contentDocument.querySelector("upload-file-transaction");
            const fileName = fileTransaction.getFileName();
            const fileContent = fileTransaction.getFileContent();
            const fileType = fileTransaction.getFileType();
            const mainAccountId = iframe.contentDocument.querySelector("receivers-list").getMainContact().id;
            const secondaryAccountIds = iframe.contentDocument.querySelector("receivers-list").getSecondaryContacts().map(c => c.id);
            iframe.contentDocument.sendNewMessages(replyId, title, text, date, time, fileName, fileContent, fileType, mainAccountId, secondaryAccountIds);
        }

        toolsNavbar.setSendFunctionName("globalThis.sendFunction");

    })();

    (function setSelectAccountProps() {
        const doc = document;
        extendedAddEventListener(iframe, "load", function () {
            const selectAccountManager = iframe.contentDocument.querySelector("select-account-manager");
            const senderId = parseInt(iframe.contentDocument.querySelector("sender-id").innerHTML);
            const replyId = parseInt(iframe.contentDocument.querySelector("reply-id").innerHTML);
            const mainReceiverId = parseInt(iframe.contentDocument.querySelector("main-receiver-id").innerHTML);
            selectAccountManager.setProps(replyId, senderId, mainReceiverId);
            toolsNavbar.setSelectAccountManager(selectAccountManager);
        });
    })();

    (function setReceiversList() {
        const doc = document;
        extendedAddEventListener(iframe, "load", function () {
            const replyId = parseInt(iframe.contentDocument.querySelector("reply-id").innerHTML);
            const senderId = parseInt(iframe.contentDocument.querySelector("sender-id").innerHTML);
            const mainReceiverId = parseInt(iframe.contentDocument.querySelector("main-receiver-id").innerHTML);
            const selectAccountManager = iframe.contentDocument.querySelector("select-account-manager");

            const receiversList = iframe.contentDocument.querySelector("receivers-list");
            receiversList.setMainReceiverId(mainReceiverId);

            const accountData = selectAccountManager.getRepliedAccountData();
            receiversList.setMainContact(accountData);
        });
    })();

    (function setSearch() {
        globalThis.searchOnSelectAccount = function (value) {
            toolsNavbar.searchOnSelectAccount(value);
        }
        document.querySelector("web-navbar").setSearchFunction("globalThis.searchOnSelectAccount");
    })();

    (function setSelectFunction() {

        globalThis.selectionFunction = function () {
            const accountData = toolsNavbar.getSelectedAccountData();
            const receiversList = iframe.contentDocument.querySelector("receivers-list");
            const secondaryAccountsData = receiversList.getSecondaryContacts();
            if (accountData == undefined) {
                toolsNavbar.setAddAsSecondaryContactEnabality(false);
            }
            else if (secondaryAccountsData.some(c => c.id == accountData.id)) {
                toolsNavbar.setAddAsSecondaryContactEnabality(false);
            }
            else {
                    toolsNavbar.setAddAsSecondaryContactEnabality(true);
            }
        }

        toolsNavbar.setSelectAccountSelectionFunction("globalThis.selectionFunction");

    })();

    (function setSecondaryContactFunction() {

        globalThis.secondaryContactFunction = function () {
            const toolsNavbar = document.querySelector("tools-navbar");
            const iframe = document.querySelector("iframe");
            const accountData = toolsNavbar.getSelectedAccountData();
            const receiversList = iframe.contentDocument.querySelector("receivers-list");
            receiversList.addSecondaryContact(accountData);
            toolsNavbar.setSelectAccountNull();
        }

        toolsNavbar.setAddAsSecondaryContactFunction("globalThis.secondaryContactFunction");

    })();

    (function setReceiversListRemovalFunction() {
        extendedAddEventListener(iframe, "load", function () {
            iframe.contentDocument.receiversListRemovalFunction = selectionFunction;
            const receiversList = iframe.contentDocument.querySelector("receivers-list");
            receiversList.setRemovalFunction("document.receiversListRemovalFunction");
        });
    })();

}