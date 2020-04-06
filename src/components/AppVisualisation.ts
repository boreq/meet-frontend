import { Component, Vue } from 'vue-property-decorator';

import Phaser from 'phaser';

@Component({
    components: {},
})
export default class AppVisualisation extends Vue {

    private game: Phaser.Game;

    mounted(): void {
        const container: HTMLElement = document.querySelector('#visualisation-canvas-container');
        const rect = container.getBoundingClientRect();

        const config = {
            type: Phaser.AUTO,
            width: rect.width,
            height: rect.height,
            parent: container,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 200},
                },
            },
            scene: {
                preload: preload,
                create: create,
            },
        };

        this.game = new Phaser.Game(config);
    }

    destroyed(): void {
        this.game.destroy(true);
    }
}

function preload() {
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'http://labs.phaser.io/assets/skies/space3.png');
    this.load.image('logo', 'http://labs.phaser.io/assets/sprites/phaser3-logo.png');
    this.load.image('red', 'http://labs.phaser.io/assets/particles/red.png');
}

function create() {
    this.add.image(400, 300, 'sky');

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: {start: 1, end: 0},
        blendMode: 'ADD',
    });

    var logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);

    // const rect = new Phaser.GameObjects.Rectangle();
    this.add.rectangle(100, 100, 100, 100, 0xff0000);
}
