import { ref, Ref, onMounted } from "vue";
import { Engine, World, Bodies, Body, Vertices, Composite } from "matter-js";
import { Sprite } from "@/lib/animation/Sprite";
import { Actor } from "@/lib/animation/Actor";
import { Actions } from "@/lib/animation/Actions";
import robotCatUrl from '@/assets/sprites/robot_cat_walking.png';


export function CreateWorld(
  canvasRef: Ref<HTMLCanvasElement | null, HTMLCanvasElement | null>
): {
  canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
  canvasSize: { renderWidth: number, renderHeight: number },
  engine: Engine, world: World
}
{
  const canvas = canvasRef.value!;
  const ctx = canvas.getContext("2d")!;

// Grab various sizes
  const renderWidth = canvas.clientWidth;
  const renderHeight = canvas.clientHeight;
  canvas.width = renderWidth;
  canvas.height = renderHeight;
  const canvasSize = { renderWidth, renderHeight };

// Setup Matter engine
  const engine = Engine.create();
  const world = engine.world;
  return { canvas, ctx, canvasSize, engine, world };
}

export function CreateColliders(
  { world, canvas }: {
    world: World, canvas: HTMLCanvasElement
  }): { ground: Body, actor: Actor } {
  // Ground
  const groundHeight = 256;
  const groundWidth = canvas.width;
  const groundY = canvas.height + groundHeight * 1.25;
  const ground = Bodies.rectangle(
    groundWidth / 2,      // center X
    groundY,               // center Y (flush with bottom)
    groundWidth,
    groundHeight,
    {
      isStatic: true,
      restitution: 0,
      friction: 0.5,
    }
  );
  World.add(world, ground);

  // Actor
  const sprite = new Sprite({
    url: robotCatUrl,
    frameWidth: 256,
    frameHeight: 256,
    frameCount: 4,
    frameTime: 150
  });
  const body = Bodies.rectangle(canvas.width / 4, canvas.height, 256, 256, {
    restitution: 0.3,
    frictionAir: 0.1
  });
  const actions = new Actions(); // can be empty for now
  const actor = new Actor(sprite, body, actions);
  World.add(world, actor.body);

  return { ground, actor }
}

export function AnimationLoop(
  {
    canvas, canvasSize, ctx, engine, world, ground, actor
  }: {
    canvas: HTMLCanvasElement,
    canvasSize: { renderWidth: number, renderHeight: number },
    ctx: CanvasRenderingContext2D,
    engine: Engine,
    world: World,
    ground: Body,
    actor: Actor
  }
) {
  let lastTime = performance.now();
  let delta = 0;


  function loop(time: number) {

    delta = time - lastTime;
    lastTime = time;
    delta = Math.min(delta, 100)

    EngineCycle({
      ctx, canvas, canvasSize,
      engine, actor, delta
    })

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

export function TimeTracker(time: number, lastTime:number):
{ lastTime: number, delta: number }
{
  let delta = time - lastTime;
  lastTime = time;
  delta = Math.min(delta, 100)
  return { delta, lastTime }
}

export function RefreshWorld(
  {
    ctx, canvas,
    engine, world, ground,
    actor, delta
  }:
  {
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    engine: Engine,
    world: World,
    ground: Body,
    actor: Actor,
    delta: number
  }): void
{
  const renderWidth = canvas.clientWidth;
  const renderHeight = canvas.clientHeight;
  canvas.width = renderWidth;
  canvas.height = renderHeight;
  const canvasSize = { renderWidth, renderHeight };

  World.remove(world, ground);
  World.remove(world, actor.body);

  EngineCycle({
    ctx, canvas, canvasSize,
    engine, actor, delta
  })
}


function EngineCycle(
  {
    ctx, canvas, canvasSize, engine, actor, delta
  }: {
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    canvasSize: { renderWidth: number, renderHeight: number },
    engine: Engine,
    actor: Actor,
    delta: number
  }): void {
  if (!delta) {
    return;
  }
  Engine.update(engine, delta);
  actor.update(delta);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  actor.draw(ctx, canvasSize);
}
