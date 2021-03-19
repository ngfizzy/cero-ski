import * as Constants from '../Constants';
import { Skier } from './Skier';

// jest.enableAutomock()

describe('Skier', () => {
  describe('setDirection', () => {
    let skier;
    beforeEach(() => {
      skier = new Skier(0, 0);
    });

    it('can change direction', () => {
      const initialDirection = skier.direction;
      const newDirection = 2;
      const updateAsset = jest.spyOn(skier, 'updateAsset');

      skier.setDirection(newDirection);

      expect(initialDirection).not.toBe(newDirection);
      expect(updateAsset).toHaveBeenCalled();
    });
  });

  describe('move', () => {
    let skier;
    beforeEach(() => {
      skier = new Skier(0, 0);
    });

    it('can  jump', () => {
      skier.mode = Constants.SKIER_MODES.JUMP;
      const initialJumpDuration = skier.jumpDuration;
      const jump = jest.spyOn(skier, 'jump');

      skier.move();

      expect(jump).toHaveBeenCalled();
      expect(initialJumpDuration).toBeLessThan(skier.jumpDuration);
    });

    it('can  jump', () => {
      skier.mode = Constants.SKIER_MODES.JUMP;
      const initialJumpDuration = skier.jumpDuration;
      const jump = jest.spyOn(skier, 'jump');

      skier.move();

      expect(jump).toHaveBeenCalled();
      expect(initialJumpDuration).toBeLessThan(skier.jumpDuration);
    });

    it('can  move left', () => {
      skier.mode = Constants.SKIER_MODES.JUMP;
      const initialJumpDuration = skier.jumpDuration;
      const jump = jest.spyOn(skier, 'jump');

      skier.move();

      expect(jump).toHaveBeenCalled();
      expect(initialJumpDuration).toBeLessThan(skier.jumpDuration);
    });

    it('can  move left', () => {
      skier.direction = Constants.SKIER_DIRECTIONS.LEFT;
      const chooseDirection = jest.spyOn(skier, 'chooseDirection');

      skier.move();

      expect(chooseDirection).toHaveBeenCalledWith(skier.direction);
    });

    it('can  move right', () => {
      skier.direction = Constants.SKIER_DIRECTIONS.RIGHT;
      const chooseDirection = jest.spyOn(skier, 'chooseDirection');

      skier.move();

      expect(chooseDirection).toHaveBeenCalledWith(skier.direction);
    });
  });

  describe('chooseDirection', () => {
    let skier;
    beforeEach(() => {
      skier = new Skier(0, 0);
    });

    it('can move left down', () => {
      const direction = Constants.SKIER_DIRECTIONS.LEFT_DOWN;
      const moveSkierLeftDown = jest.spyOn(skier, 'moveSkierLeftDown');

      skier.chooseDirection(direction);

      expect(moveSkierLeftDown).toHaveBeenCalledWith();
    });

    it('can move right down', () => {
      const direction = Constants.SKIER_DIRECTIONS.RIGHT_DOWN;
      const moveSkierRightDown = jest.spyOn(skier, 'moveSkierRightDown');

      skier.chooseDirection(direction);

      expect(moveSkierRightDown).toHaveBeenCalledWith();
    });

    it('can move down', () => {
      const direction = Constants.SKIER_DIRECTIONS.DOWN;
      const moveSkierDown = jest.spyOn(skier, 'moveSkierDown');

      skier.chooseDirection(direction);

      expect(moveSkierDown).toHaveBeenCalledWith();
    });
  });

  describe('isJumping', () => {
    let skier;
    beforeEach(() => {
      skier = new Skier(0, 0);
    });

    it('should return true if jumping', () => {
      skier.direction = Constants.SKIER_DIRECTIONS.JUMP;
      skier.mode = Constants.SKIER_MODES.JUMP;

      const isJumping = skier.isJumping();

      expect(isJumping).toBe(true);
    });

    it('should return false when not jumping', () => {
      skier.direction = Constants.SKIER_DIRECTIONS.DOWN;
      skier.mode = Constants.SKIER_MODES.SKI;

      const isJumping = skier.isJumping();

      expect(isJumping).toBe(false);
    });
  });

  describe('hasCrashed', () => {
    let skier;
    beforeEach(() => {
      skier = new Skier(0, 0);
    });

    it('should return true after crash', () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);

      expect(skier.hasCrashed()).toBe(true);
    });

    it('should return false when skiing', () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);

      expect(skier.hasCrashed()).toBe(false);
    });
  });

  describe('moveSkierLeft', () => {
    let skier;

    beforeEach(() => {
      skier = new Skier(0, 0);
    });

    it('should move skier to the left', () => {
      const previousX = skier.x;

      skier.moveSkierLeftDown();

      expect(skier.x).toBeLessThan(previousX);
    });
  });

  describe('moveSkierLeftDown', () => {
    let skier;

    beforeEach(() => {
      skier = new Skier(0, 0);
    });

    it('should move skier left down', () => {
      const previousX = skier.x;
      const previousY = skier.y;

      skier.moveSkierLeftDown();

      expect(skier.x).toBeLessThan(previousX);
      expect(skier.y).toBeGreaterThan(previousY);
    });
  });

  describe('moveSkierRightDown', () => {
    let skier;

    beforeEach(() => {
      skier = new Skier(0, 0);
    });

    it('should move skier right down', () => {
      const previousX = skier.x;
      const previousY = skier.y;

      skier.moveSkierRightDown();

      expect(skier.x).toBeGreaterThan(previousX);
      expect(skier.y).toBeGreaterThan(previousY);
    });
  });

  describe('moveSkierDown', () => {
    let skier;

    beforeEach(() => {
      skier = new Skier(0, 0);
    });

    it('should move skier down', () => {
      const previousY = skier.y;

      skier.moveSkierDown();

      expect(skier.y).toBeGreaterThan(previousY);
    });
  });

  describe('turnLeft', () => {
    let skier;

    beforeEach(() => {
      skier = new Skier(0, 0);
    });

    it('can turn left', () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
      const canTurnLeft = jest.spyOn(skier, 'canTurnLeft');
      const moveSkierLeft = jest.spyOn(skier, 'moveSkierLeft');

      skier.turnLeft();

      expect(canTurnLeft).toHaveBeenCalled();
      expect(moveSkierLeft).toHaveBeenCalled();
    });
  });

  describe('turnRight', () => {
    let skier;

    beforeEach(() => {
      skier = new Skier(0, 0);
    });

    it('can turn right', () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
      const moveSkierRight = jest.spyOn(skier, 'moveSkierRight');

      skier.turnRight();

      expect(moveSkierRight).toHaveBeenCalled();
    });
  });

  describe('canTurnDown', () => {
    let skier;

    beforeEach(() => {
      skier = new Skier(0, 0);
    });

    it('can turn right', () => {
      // skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
      const setDirection = jest.spyOn(skier, 'setDirection');

      skier.turnDown();

      expect(setDirection).toHaveBeenCalledWith(
        Constants.SKIER_DIRECTIONS.DOWN
      );
    });
  });
});
