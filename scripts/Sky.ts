
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Sky
 * DateTime = Tue Nov 16 2021 21:41:00 GMT+0700 (Indochina Time)
 * Author = wymmndp
 * FileBasename = Sky.ts
 * FileBasenameNoExtension = Sky
 * URL = db://assets/scripts/Sky.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Sky')
export class Sky extends Component {
    // [1]
    // dummy = '';

    // [2]
    @property
    moveSpeed = 0;

    start () {
        // [3]
    }

    update (deltaTime: number) {
        this.node.translate(new Vec3(-deltaTime * this.moveSpeed,0,0))
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
