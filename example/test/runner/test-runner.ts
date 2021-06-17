console.log("init!");
import { register } from "../../../src";
import { Properties, properties } from "../test";

try {
  register("test-runner", properties, (ctx, geom, properties) => {
    console.log("paint!", geom, properties.get(Properties.COLOR));
    const t = properties.get(Properties.COLOR);
    properties.get(Properties.NAME).value;
    ctx.fillStyle = t.toString();
    ctx.fillRect(0, 0, geom.width, geom.height);
  });
} catch (e) {
  console.error(e);
}
