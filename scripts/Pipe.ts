
import { _decorator, Component, Node, Vec3, RigidBody2D, Vec2, DebugMode } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Pipe
 * DateTime = Tue Nov 16 2021 21:41:09 GMT+0700 (Indochina Time)
 * Author = wymmndp
 * FileBasename = Pipe.ts
 * FileBasenameNoExtension = Pipe
 * URL = db://assets/scripts/Pipe.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Pipe')
export class Pipe extends Component {
    // [1]
    // dummy = '';

    // [2]
    @property
    moveSpeed = 0;

    pipeRigidbody : RigidBody2D = null

    start () {
        
    }

    update (deltaTime: number) {
       if(GameManager.instance.isGameActive) {
            this.node.translate(new Vec3(-deltaTime * this.moveSpeed,0,0))
            // console.log("Pipe position: ",this.node.getChildByName("pipe-green-top").getComponent(RigidBody2D).getMass());
            
            this.node.getChildByName("pipe-green-top").translate(new Vec3(0,0,0))
            this.node.getChildByName("pipe-green-bot").translate(new Vec3(0,0,0))
            this.node.getChildByName("point").translate(new Vec3(0,0,0))
            
            // console.log("Pipe Moving  ",this.node.position)
            // this.pipeRigidbody.applyForceToCenter(new Vec2(-deltaTime * this.moveSpeed,0),true)
            // this.pipeRigidbody.linearVelocity = new Vec2(-deltaTime * this.moveSpeed,this.node.position.y);
       }
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
