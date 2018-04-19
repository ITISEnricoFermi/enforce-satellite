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
})
