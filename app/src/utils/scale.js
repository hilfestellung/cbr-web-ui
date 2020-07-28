export class LogSlider {
  constructor(options) {
    options = options || {};
    this.minpos = options.minpos || 0;
    this.maxpos = options.maxpos || 100;
    this.minlval = Math.log(options.minval || 1);
    this.maxlval = Math.log(options.maxval || 100000);

    this.scale = (this.maxlval - this.minlval) / (this.maxpos - this.minpos);
  }
  // Calculate value from a slider position
  value(current) {
    return Math.exp((current - this.minpos) * this.scale + this.minlval);
  }

  position(value) {
    return this.minpos + (Math.log(value) - this.minlval) / this.scale;
  }
}
