import Engine from './classes/Engine';
import Player from './classes/Player';
import Map from './classes/Map';

import testMap from './maps/bigmap.json';
import mapTiles from './images/dungeon_sheet.png';

const engine = new Engine();

engine.phyDebug = true;

const map = new Map(testMap, mapTiles);

engine.addObject(map);

engine.addColliders(map.getColliders());

const player = new Player(engine, 65, 375);

engine.addObject(player);

engine.update = (dt) => {
  if (engine.input.isKeyDown('KeyW')) {
    player.translate(0, -100 * dt * 0.8);
    player.facing = 1;
  }

  if (engine.input.isKeyDown('KeyS')) {
    player.translate(0, 100 * dt * 0.8);
    player.facing = 3;
  }

  if (engine.input.isKeyDown('KeyA')) {
    player.translate(-100 * dt, 0);
    player.facing = 4;
  }

  if (engine.input.isKeyDown('KeyD')) {
    player.translate(100 * dt, 0);
    player.facing = 2;
  }

  if (
    !engine.input.isKeyDown('KeyW') &&
    !engine.input.isKeyDown('KeyS') &&
    !engine.input.isKeyDown('KeyA') &&
    !engine.input.isKeyDown('KeyD')
  ) {
    player.facing = 0;
  }

  // Check bounds

  const localPos = engine.getLocalPosition(player);

  if (localPos.x < window.innerWidth * 0.48) {
    engine.camera.position.x += 3;
  }

  if (localPos.x > window.innerWidth * 0.52) {
    engine.camera.position.x -= 3;
  }

  if (localPos.y < window.innerHeight * 0.45) {
    engine.camera.position.y += 3;
  }

  if (localPos.y > window.innerHeight * 0.55) {
    engine.camera.position.y -= 3;
  }
};
