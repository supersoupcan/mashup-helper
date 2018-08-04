export const SVGRing = function(divisions, offset, rx0, ry0, rx1, ry1){
  return Array.from(Array(divisions)).map((_, index) => {
    const r0 = (index * 2 * Math.PI / divisions + offset);
    const x0 = Math.cos(r0);
    const y0 = Math.sin(r0);
    const r1 = r0 + 2 * Math.PI / divisions;
    const x1 = Math.cos(r1);
    const y1 = Math.sin(r1);

    const path = new SVGPath();
    path.moveTo(x0 * rx0, y0 * ry0);
    path.arcTo(rx0, ry0, x1 * rx0, y1 * ry0, 0, 1);
    path.lineTo(x1 * rx1, y1 * ry1);
    path.arcTo(rx1, ry1, x0 * rx1, y0 * ry1, 0, 0);
    
    const leftX = (x0 * rx1 + x1 * rx1) / 2;
    const rightX = (x0 * rx0 + x1 * rx0) / 2;

    const topY = (y0 * ry1 + y1 * ry1) / 2;
    const botY = (y0 * ry0 + y1 * ry0) / 2;
    
    const cx = (rightX + leftX) / 2;
    const cy = (topY + botY) / 2;

    return {
      d : path.d,
      lowX : (cx + leftX) / 2,
      lowY : (cy + topY) / 2,
      highX : (cx + rightX) / 2,
      highY : (cy + botY) / 2,
    }
  })
}

export const SVGPath = function(){
  this.actions = [];
}

SVGPath.prototype = {
  get d(){
    return this.actions.join(' ');
  },
  moveTo : function(x, y){
    this.actions.push(['M', x, y].join(' '));
  },
  lineTo : function(x, y){
    this.actions.push(['L', x, y].join(' '));
  },
  arcTo : function(rx, ry, x, y, lf, sf){
    this.actions.push(['A', rx, ry, 0, lf, sf, x, y].join(' '));
  }
}

