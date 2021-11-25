
import { _decorator, Component, Node, EventMouse, systemEvent, System, SystemEvent, game, AudioClip, RigidBody2D, Vec2, Vec3, Collider2D, Contact2DType, IPhysics2DContact, PolygonCollider2D, BoxCollider2D,CollisionCallback, Game, director, Animation, AudioSource, EventTouch, Touch } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bird
 * DateTime = Tue Nov 16 2021 19:42:13 GMT+0700 (Indochina Time)
 * Author = wymmndp
 * FileBasename = Bird.ts
 * FileBasenameNoExtension = Bird
 * URL = db://assets/scripts/Bird.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */


@ccclass('Bird')
export class Bird extends Component {
    // [1]
    // dummy = '';


    // [2]
    @property
    public jumpPower : number = 0;

    @property({type: AudioClip})
    flyAudio : AudioClip = null
    @property({type: AudioClip})
    pointAudio : AudioClip = null
    @property({type: AudioClip})
    hitAudio : AudioClip = null

    birdRigidbody2d : RigidBody2D = null;
    birdAnimation : Animation = null;
    audioSource : AudioSource = null

    start () {
        systemEvent.on(SystemEvent.EventType.MOUSE_UP,this.onMouseUp,this);
        systemEvent.on(SystemEvent.EventType.TOUCH_START,this.onTouchUp,this)
        if(this.node.getComponent(RigidBody2D) != null) {
            this.birdRigidbody2d = this.node.getComponent(RigidBody2D);
            this.birdRigidbody2d.enabledContactListener = true;
        }
        let collider2D = this.node.getComponent(Collider2D);
        collider2D.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        collider2D.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        this.birdAnimation = this.node.getComponent(Animation)
        this.birdAnimation.play("bird")
        this.audioSource = this.node.getComponent(AudioSource)
    }

    onMouseUp(event : EventMouse) {
        if(event.getButton() == 0) {
            if(!GameManager.instance.isGameActive && !GameManager.instance.isGameOver) {
                GameManager.instance.startGame()
            }
            // this.audioFly.play()
            // this.node.setPosition(0,0)
            if(GameManager.instance.isGameActive) {
                this.birdRigidbody2d.linearVelocity = new Vec2(0,this.jumpPower);
                this.birdAnimation.crossFade("bird_fly",3)
                this.audioSource.playOneShot(this.flyAudio,1)
                // console.log("gravity: " + this.birdRigidbody2d.gravityScale);
                
            }
            // this.birdRigidbody2d.angularVelocity = this.jumpPower;
            
        }
    }

    onTouchUp(touch : Touch,event : EventTouch) {
        if(event.touch) {
            if(!GameManager.instance.isGameActive && !GameManager.instance.isGameOver) {
                GameManager.instance.startGame()
            }
            // this.audioFly.play()
            // this.node.setPosition(0,0)
            if(GameManager.instance.isGameActive) {
                this.birdRigidbody2d.linearVelocity = new Vec2(0,this.jumpPower);
                // this.birdAnimation.crossFade("bird_fly",3)
                this.audioSource.playOneShot(this.flyAudio,1)
                this.birdAnimation.crossFade("bird2")
            }
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        // console.log('onBeginContact');
        // console.log("Self: ",selfCollider);
        // console.log("Other: ",otherCollider.name);
      
        if(otherCollider.name === "ground<BoxCollider2D>" || otherCollider.name === "pipe-green-top<BoxCollider2D>" || otherCollider.name === "pipe-green-bot<BoxCollider2D>") {
            GameManager.instance.gameOver()
            this.birdAnimation.stop()
            if(!GameManager.instance.isGameOver) {
                this.audioSource.playOneShot(this.hitAudio,1)
            }
        }
    }

    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if(otherCollider.name === "point<BoxCollider2D>" && !GameManager.instance.isGameOver) {
            GameManager.instance.getPoint()
            this.audioSource.playOneShot(this.pointAudio,1)
        }
    }

    update (deltaTime: number) {
        if(GameManager.instance.isGameActive && !GameManager.instance.isGameOver) {
            this.birdRigidbody2d.gravityScale = 1
            this.birdRigidbody2d.type = 2
            this.node.eulerAngles = new Vec3(0,0,this.birdRigidbody2d.linearVelocity.y * 3)
            // this.birdAnimation.crossFade("bird_down")
        } else {
            this.birdRigidbody2d.gravityScale = 0
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
