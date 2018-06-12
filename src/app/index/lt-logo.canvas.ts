import {ElementRef} from '@angular/core';

let stop = false

class Logo {

  private maxRadius
  private colorObj
  private radius

  private readonly X_REF
  private readonly Y_REF
  private readonly LPoints
  private readonly TPoints
  private readonly ALLPoints
  private readonly minRadius
  private readonly startColorObj
  private readonly randomLines
  private readonly COLORS
  private readonly c
  private readonly canvas

  private readonly POINT_INTERVAL_CONSTANT
  private readonly POINT_MOVE_CONSTANT
  private readonly MAX_LINE_WIDTH_FACTOR
  private readonly MAX_RADIUS_FACTOR

  constructor(c, canvas, lPoints, tPoints, radius) {

    this.COLORS = [
      {r:214,g:14,b:3}, '#12283F', '#01465A', '#9CD4D3'
    ]

    this.X_REF = 24
    this.Y_REF = 18

    this.POINT_INTERVAL_CONSTANT = 100
    this.POINT_MOVE_CONSTANT = 2
    this.MAX_LINE_WIDTH_FACTOR = 15
    this.MAX_RADIUS_FACTOR = 15

    this.c = c
    this.canvas = canvas
    this.LPoints = this.ALLPoints = this.getPoints(lPoints)
    this.TPoints = this.getPoints(tPoints)

    this.radius = radius
    this.minRadius = radius
    this.maxRadius = this.MAX_RADIUS_FACTOR
    this.colorObj = this.startColorObj = this.COLORS[0]

    this.TPoints.forEach(p => this.ALLPoints.push(p))

    this.randomLines = this.createRandomLines(this.ALLPoints, 1)
  }

  public draw () {

    this.drawLetter(this.c,
      this.LPoints,
      this.radius,
      'rgb(' + this.colorObj.r + ',' + this.colorObj.g + ',' + this.colorObj.b + ')')
    this.drawLetter(this.c,
      this.TPoints,
      this.radius,
      'rgb(' + this.colorObj.r + ',' + this.colorObj.g + ',' + this.colorObj.b + ')')

    this.drawRandomLines(this.c, this.randomLines)
  }

  public update (mouse) {
    this.randomLines.forEach(line => {

      line.maxLineWidth = (mouse.y / this.canvas.height) * this.MAX_LINE_WIDTH_FACTOR
      if (line.lineWidth < line.maxLineWidth) line.lineWidth += .5
      else if (line.lineWidth > line.minLineWidth) line.lineWidth -= .2

      if ((Date.now() - line.latestUpdate) > (Math.random() * 2000)) {
        let newLine = this.createRandomLine(this.ALLPoints, 1)
        line.point1 = newLine.point1
        line.point2 = newLine.point2
        line.lineWidth = newLine.lineWidth
        line.minLineWidth = newLine.minLineWidth
        line.maxLineWidth = newLine.maxLineWidth
        line.latestUpdate = Date.now()
      }
    })

    this.maxRadius = (mouse.x / this.canvas.width) * this.MAX_RADIUS_FACTOR
    if (this.radius < this.maxRadius) this.radius += 1
    else if (this.radius > this.minRadius) this.radius -= .2

    let circlesColor = mouse.x / this.canvas.width
    this.colorObj = Math.random() > 0.99 ? {
      r: Math.abs(Math.floor(this.startColorObj.r + ((Math.random() - 0.5) * 200) * circlesColor)),
      g: Math.abs(Math.floor(this.startColorObj.g + ((Math.random() - 0.5) * 200) * circlesColor)),
      b: Math.abs(Math.floor(this.startColorObj.b + ((Math.random() - 0.5) * 200) * circlesColor))
    } : this.colorObj
  }

  private drawLetter(c, points, radius, color) {
    for (let i = 0; i < points.length; i++) {
      c.beginPath()
      c.arc(
        ((Math.random() - 0.5) * this.POINT_MOVE_CONSTANT) + points[i].x,
        ((Math.random() - 0.5) * this.POINT_MOVE_CONSTANT) + points[i].y,
        radius, 0, Math.PI * 2)
      c.fillStyle = color
      c.lineWidth = 1
      c.fill()
    }
  }

  private createRandomLine(points, lineWidth) {

    let point1
    let point2

    do {

      point1 = points[Math.floor(Math.random() * (points.length - 1))]
      point2 = points[Math.floor(Math.random() * (points.length - 1))]

    } while (Math.abs(point1.x - point2.x) > 5)

    lineWidth = Math.random() * lineWidth

    return {
      point1: point1,
      point2: point2,
      lineWidth: lineWidth,
      minLineWidth: lineWidth,
      maxLineWidth: this.MAX_LINE_WIDTH_FACTOR,
      latestUpdate: Date.now()
    }
  }

  private createRandomLines(points, lineWidth) {

    let lines = []

    for (let i = 0; i < (Math.random() * points.length * 100); i++) {
      let point1 = points[Math.floor(Math.random() * (points.length - 1))]
      let point2 = points[Math.floor(Math.random() * (points.length - 1))]

      lineWidth = Math.random() * lineWidth

      if (Math.abs(point1.x - point2.x) <= 5) {
        lines.push({
          point1: point1,
          point2: point2,
          lineWidth: lineWidth,
          minLineWidth: lineWidth,
          maxLineWidth: this.MAX_LINE_WIDTH_FACTOR,
          latestUpdate: Date.now()
        })
      }
    }

    return lines;
  }

  private drawRandomLines(c, randomLines) {

    randomLines.forEach(line => {
      c.beginPath()
      c.moveTo(line.point1.x, line.point1.y)
      c.lineTo(line.point2.x, line.point2.y)
      c.strokeStyle = this.COLORS[1]
      c.lineWidth = line.lineWidth
      c.stroke()
    })
  }

  private getX(x) {
    return Math.floor((x / this.X_REF) * this.canvas.width)
  }

  private getY(y) {
    return Math.floor((y / this.Y_REF) * this.canvas.height)
  }

  private getPoints(coordinates) {
    let points = []

    let lastPoint = {
      x: this.getX(coordinates[0].x),
      y: this.getY(coordinates[0].y)
    }
    for (let i = 1; i < coordinates.length; i++) {
      let currentPoint = {
        x: this.getX(coordinates[i].x),
        y: this.getY(coordinates[i].y)
      }
      let intervalX = (currentPoint.x - lastPoint.x) / this.POINT_INTERVAL_CONSTANT
      let intervalY = (currentPoint.y - lastPoint.y) / this.POINT_INTERVAL_CONSTANT

      for (let j = 0; j < this.POINT_INTERVAL_CONSTANT; j++) {
        points.push({
          x: lastPoint.x + intervalX * j,
          y: lastPoint.y + intervalY * j
        })
      }

      lastPoint = currentPoint
    }

    return points
  }
}

export class LTLogo {

  private stop

  private logos: Logo[]

  private readonly c
  private readonly canvas
  private readonly mouse

  private readonly L
  private readonly T

  constructor(canvasRef: ElementRef) {

    let obj = LTLogo.getContext(canvasRef)
    this.canvas = obj.canvas
    this.c = obj.context

    this.mouse = {
      x: 0, y: 0
    }

    this.logos = []

    this.L = [
      { x: 4, y: 3 },
      { x: 7, y: 3 },
      { x: 7, y: 12 },
      { x: 11, y: 12 },
      { x: 11, y: 15 },
      { x: 4, y: 15 },
      { x: 4, y: 3 }
    ]

    this.T = [
      { x: 9, y: 3 },
      { x: 20, y: 3 },
      { x: 20, y: 6 },
      { x: 16, y: 6 },
      { x: 16, y: 15 },
      { x: 13, y: 15 },
      { x: 13, y: 6 },
      { x: 9, y: 6 },
      { x: 9, y: 3 }
    ]

    this.canvas.onmousemove = LTLogo.getOnMousemoveCallback(this.mouse)
    this.canvas.ontouchmove = LTLogo.getOnTouchmoveCallback(this.mouse)
    window.onresize = this.getOnResizeCallback(this.canvas)
  }

  private getOnResizeCallback(canvas) {
    return () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      this.init()
      this.animate()
    }
  }

  private static getOnTouchmoveCallback(mouse) {
    return (event) => {
      mouse.x = event.x
      mouse.y = event.y
    }
  }

  private static getOnMousemoveCallback(mouse) {
    return (event) => {
      mouse.x = event.x
      mouse.y = event.y
    }
  }

  private static getContext(canvasRef: ElementRef) {

    let canvas = canvasRef.nativeElement;
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    return {
      canvas: canvas,
      context: canvas.getContext('2d')
    }
  }

  private static animate(self) {
    if (!stop) requestAnimationFrame((obj => {
      return () => LTLogo.animate(obj)
    })(self))
    self.c.clearRect(0, 0, self.canvas.width, self.canvas.height)

    self.logos.forEach((logo) => {
      logo.draw()
      logo.update(self.mouse)
    })
  }

  private init() {
    this.logos = []
    this.logos.push(new Logo(this.c, this.canvas, this.L, this.T, 2))
    stop = false
  }

  public doStart() {
    stop = false
    this.init()
    LTLogo.animate(this)
  }

  public doStop() {
    stop = true
  }
}
