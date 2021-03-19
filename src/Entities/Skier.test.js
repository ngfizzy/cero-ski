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
});
