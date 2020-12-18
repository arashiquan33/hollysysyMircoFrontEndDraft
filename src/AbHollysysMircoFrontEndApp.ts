/**
 * @ =应用抽象类
 */
export abstract class AbstractHollysysMircoFrontEndApp {
    constructor(name: string, mountTo: HTMLElement) {
        this.name = name;
        this.mountTo = mountTo;
    }
    
    //定义静态属性，组织机构名称
    public static orgName: string = "@hollysys";

    //微应用名称
    private name: string;

    //挂载的DOM节点
    private mountTo: HTMLElement;

    //获取名称
    public getName(): string {
        return this.name;
    }

    //获取挂载节点
    public getMountTo(): HTMLElement {
        return this.mountTo;
    }

    //定义一系列 hook，微应用可自行实现hook
    abstract beforeInstall(): void;

    abstract install(): void;

    abstract uninstall(): void;

    abstract beforeUninstall(): void;
}
