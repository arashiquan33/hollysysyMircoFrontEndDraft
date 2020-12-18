
import { AbstractHollysysMircoFrontEndApp } from "./AbHollysysMircoFrontEndApp";


export type Appclass = new (
    ...arg: any
) => AbstractHollysysMircoFrontEndApp;


//抽象定义应用注册时传递的参数
export interface AppConfig {
    //实例化应用的名称
    name: string;
    //应用的路由前缀
    pathPrefix: string;
    //应用挂载的HTMLElement
    mountTo: HTMLElement;
    //应用对应的class
    appClass: Appclass;
}

export interface App extends AppConfig {
    isRunning: boolean;
    instance: AbstractHollysysMircoFrontEndApp;
}