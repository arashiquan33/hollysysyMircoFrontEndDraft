# hollysysyMircoFrontEndDraft

微前端架构雏形，使用最简单的模式来理解微前端

## 时序图

![image-20201218095902095](./diagram.png)

## 类解释

### AbstractHollysysMircoFrontEndApp

 抽象微前端所有应用，定义公共属性和抽象方法,所有微前端应用实现，需要继承该抽象类，并实现抽象方法

 ```js
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
 
 ```

### HollysysMiApp

 微前端具体实现之一

 ```js
export class HollysysMiApp extends AbstractHollysysMircoFrontEndApp {
    public beforeInstall() {
        console.log(`miApp is preparing install`);
    }

    public install() {
        let mountTo = this.getMountTo();
        mountTo.innerHTML = "miApp is  installed";
    }

    public beforeUninstall() {
        console.log(`miApp is  preparing uninstall`);
    }

    public uninstall() {
        console.log(`miApp is  uninstalled`);
    }
}
```

### HollysysAppManager

 微前端应用管理类，使用工厂模式，负责管理微前端应用由生到死

 ```js
export class HollysysAppManager {
    private appsConfig: AppConfig[] = [];
    private appsArray: Array<App> = [];

    /**
     * @description 注册应用，缓存应用注册配置对象
     * @param configs
     */
    public registerApps(configs: AppConfig[]) {
        this.appsConfig = configs;
    }


    /**
     * @description 获取应用配置
     */
    public getAppsConfig():AppConfig[]{
         return this.appsConfig;
    }

    /**
     * @description 获取当前所有应用
     */

    public getApps(): Array<App> {
        return this.appsArray;
    }

    /**
     * @description 下载装配应用
     * @param appConfig
     */
    public installApp(appConfig: AppConfig) {
        let instance = new appConfig.appClass(
            appConfig.name,
            appConfig.mountTo,
        );
        let isRunning = true;
        let {
            name,
            pathPrefix,
            mountTo,
            appClass,
        } = appConfig;
        let app = {
            instance,
            isRunning,
            name,
            pathPrefix,
            mountTo,
            appClass,
        };
        this.appsArray.push(app);
        app.instance.beforeInstall();
        app.instance.install();
    }

    /**
     * @description 卸载应用
     * @param appConfig
     */
    public uninstallApp(appConfig: AppConfig) {
        var app = {} as App;
        var index = 0;
        this.appsArray.forEach((a, i) => {
            if (a.name === appConfig.name) {
                app = a;
                index = i;
            }
        });
        if (app) {
            app.instance.beforeUninstall();
            app.instance.uninstall();
            this.appsArray.splice(index);
        }
    }
}
```

## 测试运行

> 1.npm install
> 2.npm start
> 3.打开浏览器http://localhost:1234
> 4.更换url为http://localhost:1234/#/mi ,查看控制台与页面输出
> 4.更换url为http://localhost:1234/#/workOrder ,查看控制台与页面输出