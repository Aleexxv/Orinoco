// const app = require('../js/app');
import app from '../js/app';

describe('Palindrom', () => {
    it('should retrieve a sentance', () => {
        expect(app.sentance.length).toBeGreaterThan(0);
    });
});

describe('Unit Test Suites', () => {
    it('should tow plus tow is four', () => {
        expect(2 + 2).toEqual(4);
    })
});

