import Shader from '../../shader'
import {simpleShader, clamp, percentage} from '../../util'
import * as store from '../../store'

/**
 * @filter         Overlay
 * @description    Add a rgba color overlay on image
 * @param red   red color value 0 - 255
 * @param green   green color value 0 - 255
 * @param blue   blue color value 0 - 255
 * @param adjust   adjust value 0 - 1
 */
export default function(red, green, blue, adjust) {
  var gl = store.get('gl')
  gl.overlay = gl.overlay || new Shader(null, '\
    uniform sampler2D texture;\
    uniform float red;\
    uniform float green;\
    uniform float blue;\
    uniform float adjust;\
    varying vec2 texCoord;\
    void main() {\
      vec4 color = texture2D(texture, texCoord);\
      float r = color.r;\
      float g = color.g;\
      float b = color.b;\
      \
      color.r = r - (r - red) * adjust;\
      color.g = g - (g - green) * adjust;\
      color.b = b - (b - blue) * adjust;\
      \
      gl_FragColor = color;\
    }\
  ');

  simpleShader.call(this, gl.overlay, {
    red: clamp(0, red, 1),
    green: clamp(0, green, 1),
    blue: clamp(0, blue, 1),
    adjust: clamp(0, adjust, 1)
  });

  return this;
}
