import * as Constants from '../Constants';
import { Entity } from './Entity';
import { intersectTwoRects } from '../Core/Utils';

export class Rhino extends Entity {
  assetName = Constants.RHINO_DEFAULT;
  speed = Constants.RHINO_STARTING_SPEED;
  mode = Constants.RHINO_MODES.CHASE;


  animationDuration = 0;

  constructor(x, y) {
    super(x, y);
  }

  setMode(mode) {
    this.mode = mode;
    this.animationDuration = 0;
    this.updateAsset();
  }

  getChaseStep() {
    return Math.floor(this.animationDuration / Constants.RHINO_CHASE_TIME);
  }

  getEatStep() {
    return Math.floor(this.animationDuration / Constants.RHINO_EAT_TIME);
  }

  updateAsset() {
    this.animationDuration++;

    switch (this.mode) {
      case Constants.RHINO_MODES.CHASE:
        if (this.getChaseStep() >= Constants.RHINO_CHASE_ASSETS.length) {
          this.animationDuration = 0;
        }

        this.assetName = Constants.RHINO_CHASE_ASSETS[this.getChaseStep()];
        break;

      case Constants.RHINO_MODES.EAT:
        if (this.getEatStep() >= Constants.RHINO_EAT_ASSETS.length) {
          return;
        }

        this.assetName = Constants.RHINO_EAT_ASSETS[this.getEatStep()];
        break;
    }
  }

  accelerate() {
    this.speed = this.speed * Constants.RHINO_ACCELERATION;
  }

  move(entityPosition) {
    if (this.mode === Constants.RHINO_MODES.CHASE) {
      if (this.speed <= Constants.RHINO_MAX_SPEED) {
        this.accelerate();
      }

      this.chaseEntity(entityPosition);
    }
    this.updateAsset();
  }

  chaseEntity(entityPosition) {
    const { x: rhinoX, y: rhinoY } = this.getPosition();
    const { x: skierX, y: skierY } = entityPosition;

    const xDistance = skierX - rhinoX;
    const yDistance = skierY - rhinoY;
    const distanceFromEntity = Math.sqrt(
      xDistance * xDistance + yDistance * yDistance
    );

    if (distanceFromEntity === 0) {
      return;
    }

    this.y += Math.round((this.speed * yDistance) / distanceFromEntity);
    this.x += Math.round((this.speed * xDistance) / distanceFromEntity);
  }

  checkIfRhinoCaughtSkier(skier, assetManager) {
    if (skier.direction === Constants.SKIER_CRASH) {
      return;
    }

    if (
      this.mode === Constants.RHINO_MODES.CHASE &&
      intersectTwoRects(
        this.getBounds(assetManager),
        skier.getBounds(assetManager)
      )
    ) {
      this.setMode(Constants.RHINO_MODES.EAT);

      skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
    }
  }
}
