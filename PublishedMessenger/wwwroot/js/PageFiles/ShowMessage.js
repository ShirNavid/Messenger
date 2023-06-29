globalThis.pageFunctions["ShowMessage"] = function () {

    const toolsNavbar = document.querySelector("tools-navbar");
    const toolsNavbarMenuList = document.querySelector("tools-navbar-menu-list");
    const iframe = document.querySelector("iframe");

    (function setToolsNavbar() {
        toolsNavbar.setTools("ShowMessage");
    })();

    (function setToolsNavbarMenuListItemSelected() {
        toolsNavbarMenuList.setItemSelected("");
    })();

    (function setSearch() {

        globalThis.searchOnShownMessage = function (value) {
        }

        document.querySelector("web-navbar").setSearchFunction("searchOnShownMessage");

    })();

}