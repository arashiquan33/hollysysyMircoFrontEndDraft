/**
 * @ =应用抽象类
 */
export abstract class AbstractHollysysMircoFrontEndApp {
    constructor(name: string, mountTo: HTMLElement) {
        this.name = name;
        this.mountTo = mountTo;
    }

    public static orgName: string = "@hollysys";

    private name: string;

    private mountTo: HTMLElement;

    public getName(): string {
        return this.name;
    }

    public getMountTo(): HTMLElement {
        return this.mountTo;
    }

    abstract beforeInstall(): void;

    abstract install(): void;

    abstract uninstall(): void;

    abstract beforeUninstall(): void;
}
