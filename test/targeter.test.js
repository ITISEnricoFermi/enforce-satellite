"use strict"

const expect = require('chai').expect;
const Targeter = require('../server/lib/targeter')

describe('Absolute direction of vector', () => {
    it('correct angle in first quadrant', () => {
        const targeter = new Targeter()
        const vector = {
            x: 10,
            y: 10
        }
        
        const angle = targeter.getAngleToVector(vector)

        expect(angle).to.be.equal(0.25 * Math.PI)
    })

    it('correct angle in third quadrant', () => {
        const targeter = new Targeter()
        const vector = {
            x: -10,
            y: -10
        }
        
        const angle = targeter.getAngleToVector(vector)

        expect(angle).to.be.equal(-0.75 * Math.PI)
    })

    it('correct angle in front', () => {
        const targeter = new Targeter()
        const vector = {
            x: 0,
            y: 10
        }

        const angle = targeter.getAngleToVector(vector)

        expect(angle).to.be.equal(0.5 * Math.PI)
    })

    it('correct angle in left', () => {
        const targeter = new Targeter()
        const vector = {
            x: -10,
            y: 0
        }

        const angle = targeter.getAngleToVector(vector)

        expect(angle).to.be.equal(1 * Math.PI)
    })
})

describe('Absolute direction of target', () => {
    it('correct direction in front', () => {
        const targeter = new Targeter()
        targeter.setPosition({
            x: 30,
            y: 0
        })
        targeter.setTarget({
            x: 30,
            y: 30
        })

        const angle = targeter.getTargetDirection()

        expect(angle).to.be.equal(0.5 * Math.PI)
    })

    it('correct direction in first quadrant', () => {
        const targeter = new Targeter()
        targeter.setPosition({
            x: -10,
            y: 20
        })
        targeter.setTarget({
            x: -20,
            y: 20
        })

        const angle = targeter.getTargetDirection()

        expect(angle).to.be.equal(1 * Math.PI)
    })
})

describe('Relative direction to target', () => {
    it('correct direction in front when rotated left', () => {
        const targeter = new Targeter()
        targeter.setPosition({
            x: -10,
            y: -10
        })
        targeter.setTarget({
            x: -10,
            y: 20
        })
        targeter.setOrientation(1 * Math.PI)

        const angle = targeter.getTargetDirectionDelta()

        expect(angle).to.be.equal(-0.5 * Math.PI)
    })

    it('correct direction in second quadrant when rotated at 0.25 rads', () => {
        const targeter = new Targeter()
        targeter.setPosition({
            x: 10,
            y: -10
        })
        targeter.setTarget({
            x: 20,
            y: -20
        })
        targeter.setOrientation(0.25 * Math.PI)

        const angle = targeter.getTargetDirectionDelta()

        expect(angle).to.be.equal(-0.5 * Math.PI)
    })

    it('correct direction in first quadrant when rotated at 0 rads', () => {
        const targeter = new Targeter()
        targeter.setPosition({
            x: 3,
            y: 11
        })
        targeter.setTarget({
            x: 7,
            y: 4
        })
        targeter.setOrientation(0 * Math.PI)

        const angle = targeter.getTargetDirectionDelta()

        expect(angle).to.be.equal(-1.0516502125483738)
    })
})

describe('Real GPS coordinates', () => {
    it('correct direction when target is above', () => {
        const targeter = new Targeter()
        const current = {
            x: 12.012535,
            y: 42.466210
        }
        const target = {
            x: 12.040001,
            y: 42.069862
        }
        targeter.setPosition(current)
        targeter.setTarget(target)
        targeter.setOrientation(0)

        const angle = targeter.getTargetDirectionDelta()

        expect(angle).to.be.closeTo(-0.5 * Math.PI, 0.1 * Math.PI)
    })
})

describe('Turn direction', () => {
    it('turn direction left', () => {
        const targeter = new Targeter()
        targeter.setPosition({x: 0, y: 0})
        targeter.setTarget({x: 10, y: 10})
        targeter.setOrientation(1 * Math.PI)

        const direction = targeter.getTurnDirection()

        expect(direction).to.be.equal(-1)
    })

    it('turn direction right', () => {
        const targeter = new Targeter()
        targeter.setPosition({x: 0, y: 0})
        targeter.setTarget({x: 10, y: 10})
        targeter.setOrientation(0 * Math.PI)

        const direction = targeter.getTurnDirection()

        expect(direction).to.be.equal(1)
    })
})