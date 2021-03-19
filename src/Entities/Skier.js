import * as Constants from '../Constants';
import { Entity } from './Entity';
import { intersectTwoRects, Rect } from '../Core/Utils';

export class Skier extends Entity {
  assetName = Constants.SKIER_DOWN;

  direction = Constants.SKIER_DIRECTIONS.DOWN;
  directionBeforeJump = Constants.SKIER_DIRECTIONS.DOWN;

  speed = Constants.SKIER_STARTING_SPEED;
  jumpDuration = 0;
  mode = Constants.SKIER_MODES.SKI;

  constructor(x, y) {
    super(x, y);
  }

  setDirection(direction) {
    this.direction = direction;
    this.updateAsset();
  }

  updateAsset() {
    this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
  }

  move() {
    if (this.hasCrashed()) {
      return;
    }

    if (this.mode === Constants.SKIER_MODES.JUMP) {
      return this.jump();
    }

    this.chooseDirection(this.direction);
  }

  initJump() {
    if (this.mode === Constants.SKIER_MODES.JUMP) {
      return;
    }

    this.directionBeforeJump = this.direction;
    this.direction = Constants.SKIER_DIRECTIONS.JUMP;
    this.speed = Constants.SKIER_JUMP_SPEED;
    this.mode = Constants.SKIER_MODES.JUMP;
  }

  setSpeed(speed = Constants.SKIER_STARTING_SPEED) {
    this.speed = speed;
  }

  jump() {
    this.jumpDuration++;

    if (this.jumpDuration >= Constants.SKIER_MAX_JUMP_DURATION) {
      return this.stopJump();
    }

    this.chooseDirection(this.directionBeforeJump);
  }

  chooseDirection(direction) {
    switch (direction) {
      case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
        this.moveSkierLeftDown();
        break;
      case Constants.SKIER_DIRECTIONS.DOWN:
        this.moveSkierDown();
        break;
      case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
        this.moveSkierRightDown();
        break;
    }
  }

  stopJump() {
    this.setSpeed();
    this.jumpDuration = 0;

    this.setDirection(this.directionBeforeJump);
    this.mode = Constants.SKIER_MODES.JUMPis;
  }

  isJumping() {
    return (
      this.direction >= Constants.SKIER_DIRECTIONS.JUMP &&
      this.jumpDuration <= Constants.SKIER_MAX_JUMP_DURATION &&
      this.mode === Constants.SKIER_MODES.JUMP
    );
  }

  hasCrashed() {
    return this.direction === Constants.SKIER_DIRECTIONS.CRASH;
  }

  moveSkierLeft() {
    this.x -= Constants.SKIER_STARTING_SPEED;
  }

  moveSkierLeftDown() {
    this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
  }

  moveSkierDown() {
    this.y += this.speed;
  }

  moveSkierRightDown() {
    this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
  }

  moveSkierRight() {
    this.x += Constants.SKIER_STARTING_SPEED;
  }

  moveSkierUp() {
    this.y -= Constants.SKIER_STARTING_SPEED;
  }

  turnLeft() {
    if (this.canTurnLeft()) {
      this.moveSkierLeft();
    } else {
      this.setDirection(this.direction - 1);
    }
  }

  canTurnLeft() {
    return (
      this.direction === Constants.SKIER_DIRECTIONS.LEFT ||
      this.direction === Constants.SKIER_DIRECTIONS.CRASH
    );
  }

  turnRight() {
    if (this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
      this.moveSkierRight();
    } else {
      this.setDirection(this.direction + 1);
    }
  }

  turnUp() {
    if (
      this.direction === Constants.SKIER_DIRECTIONS.LEFT ||
      this.direction === Constants.SKIER_DIRECTIONS.RIGHT
    ) {
      this.moveSkierUp();
    }
  }

  turnDown() {
    this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
  }

  checkIfSkierHitObstacle(obstacleManager, assetManager) {
    const skierBounds = this.getBounds(assetManager);

    const collision = obstacleManager.getObstacles().find((obstacle) => {
      const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
      const obstaclePosition = obstacle.getPosition();
      const obstacleBounds = new Rect(
        obstaclePosition.x - obstacleAsset.width / 2,
        obstaclePosition.y - obstacleAsset.height / 2,
        obstaclePosition.x + obstacleAsset.width / 2,
        obstaclePosition.y
      );

      return intersectTwoRects(skierBounds, obstacleBounds);
    });

    if (collision) {
      if (this.isJumpingOverRock(collision)) {
        return;
      }

      if (this.shouldBounceOnRamp(collision)) {
        return this.initJump();
      }

      this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
    }
  }

  shouldBounceOnRamp(collision) {
    const collisionObject = collision.getAssetName();

    return (
      collisionObject === Constants.JUMP_RAMP &&
      this.mode !== Constants.SKIER_MODES.JUMP
    );
  }

  isJumpingOverRock(collisionObject) {
    return (
      this.mode === Constants.SKIER_MODES.JUMP &&
      (collisionObject.assetName === Constants.ROCK1 ||
        collisionObject.assetName === Constants.ROCK2)
    );
  }
}
