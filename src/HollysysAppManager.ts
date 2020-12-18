import { AbstractHollysysMircoFrontEndApp } from "./AbHollysysMircoFrontEndApp";


import {AppConfig,App} from './model'



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
