
import { _decorator, Component, Node, Prefab, instantiate, Vec3, debug, RichText, UI, animation, Animation, director, Camera, Canvas, AudioSource } from 'cc';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Tue Nov 16 2021 20:44:14 GMT+0700 (Indochina Time)
 * Author = wymmndp
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/scripts/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('GameManager')
export class GameManager extends Component {
    // [1]
    skyList : Node[] = []
    pipeList : Node[] = []
    score : number = 0
    isGameOver : boolean = false

    // [2]
    @property({type: Prefab})
    public sky : Prefab | null = null;
    @property({type : Prefab})
    public pipe : Prefab | null = null;
    @property({type: Node})
    public skyHolder : Node | null = null;
    @property({type: Node})
    public pipeHolder : Node | null = null;
    @property
    x_delete : number = 0;
    @property
    min_x : number = 0;
    @property
    max_x : number = 0;
    @property
    min_y : number = 0;
    @property
    max_y : number = 0;
    @property
    public isGameActive : boolean = false;
    @property({type:Node})
    gameUI : Node | null = null;
    @property({type:Node})
    gameOverUI : Node | null = null;
    @property({type:Node})
    flash : Node | null = null;
    @property({type: RichText})
    scoreText : RichText | null = null;
    @property({type: RichText})
    finalScoreText : RichText | null = null;
    @property({type: RichText})
    highScoreText : RichText | null = null
    
    static instance : GameManager = null

    onLoad() {
        if(!localStorage.getItem("highScore")) {
            localStorage.setItem("highScore","0")
        }
        // console.log("Highest: ",localStorage.getItem("highScore"));
        
        GameManager.instance = this
        for(let i = 0;i<3;i++) {
            // create default sky
            const newSky = instantiate(this.sky)
            newSky.position = this.skyList.length === 0 ? new Vec3(0,0,0) : new Vec3(this.skyList[i-1].position.x + 376,0,0)
            newSky.parent = this.skyHolder
            this.skyList.push(newSky)
            // create default pipe
            this.initPipe()
        }
    }

    start () {
        this.scoreText.string = "0"
        this.scoreText.enabled = true
        this.gameUI.active = true
        this.gameOverUI.active = false
        this.flash.active = false
        
    }

    initSky() {
        if(this.skyList.length <= 7) {
            const newSky = instantiate(this.sky)
            newSky.position = this.skyList.length === 0 ? new Vec3(0,0,0) : new Vec3(this.skyList[this.skyList.length-1].position.x + 376,0,0)
            newSky.parent = this.skyHolder
            this.skyList.push(newSky)
        }
    }

   
    initPipe() {
        if(this.pipeList.length <= 7 && this.isGameActive) {
            const newPipe = instantiate(this.pipe)
            newPipe.position = this.pipeList.length === 0 ? new Vec3(325,50,0) : new Vec3(this.pipeList[this.pipeList.length-1].position.x + this.getRandomNumber(this.min_x,this.max_x),this.getRandomNumber(this.min_y,this.max_y),0)
            newPipe.parent = this.pipeHolder
            this.pipeList.push(newPipe)
            // console.log("Pipe: ",newPipe.position);
        }
    }


    getRandomNumber(minValue : number,maxValue : number) {
        return Math.random() * (maxValue - minValue) + minValue
    }

    update (deltaTime: number) {
        this.initSky()
        this.initPipe()
        this.deleteSky()
        this.deletePipe()
    }

    deleteSky() {
        for(let i = 0;i< this.skyList.length;i++) {
            // console.log(this.skyList[i].position.x)
            if(this.skyList[i].position.x < this.x_delete) {
                this.skyList[i].destroy()
                // remove sky from skyList
                this.skyList.splice(i,1)
            }
        }
    }

    deletePipe() {
        for(let i = 0;i< this.pipeList.length;i++) {
            // console.log(this.pipeList[i].position.x)
            if(this.pipeList[i].position.x < this.x_delete) {
                this.pipeList[i].destroy()
                // remove pipe from pipeList
                this.pipeList.splice(i,1)
            }
        }
    }

    startGame() {
        this.isGameActive = true
        this.gameUI.getComponent(Animation).play()
    }

    async gameOver() {
        this.flash.active = true
        await this.delay(330)
        this.gameOverUI.active = true
        this.finalScoreText.string = this.score.toString()
        // console.log("Score GameOver: ",this.score);
        this.isGameActive = false
        this.isGameOver = true
        this.scoreText.enabled = false
        this.gameUI.active = false
        if(this.score > parseInt(localStorage.getItem("highScore"))) {
            localStorage.setItem("highScore",this.score.toString())
        }
        this.highScoreText.string = localStorage.getItem("highScore")
    }

    getPoint() {
        this.score += 1
        this.scoreText.string = this.score.toString()
        // console.log("Score: ",this.score);
        // this.scoreText.string = this.score.toString()
    }

    replayGame() {
        director.loadScene("game")
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
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
