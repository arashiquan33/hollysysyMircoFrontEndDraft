/**
 * @ 工单应用
 */

import { AbstractHollysysMircoFrontEndApp } from "./AbHollysysMircoFrontEndApp";

export class HollysysWorkOrderApp extends AbstractHollysysMircoFrontEndApp {
    public beforeInstall() {
        console.log(`workorderApp is preparing install`);
    }

    public install() {
        let mountTo = this.getMountTo();
        mountTo.innerHTML = "workorderApp is  installed";
    }

    public beforeUninstall() {
        console.log(`workorderApp is  preparing uninstall`);
    }

    public uninstall() {
        console.log(`workorderApp is  uninstalled`);
    }
}
