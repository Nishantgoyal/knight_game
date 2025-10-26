const test = require("node:test");
const { all_moves } = require("../scripts/helper.js");

describe('all_moves', () => {
    test('should return all possible knight moves from a given position', () => {
        const position = { x: 4, y: 4 };

        const moves = all_moves(position);

        expect(moves).toHaveLength(8);
        expect(moves).toEqual(
            [
                { x: 5, y: 6 },
                { x: 5, y: 2 },
                { x: 3, y: 6 },
                { x: 3, y: 2 },
                { x: 6, y: 5 },
                { x: 6, y: 3 },
                { x: 2, y: 5 },
                { x: 2, y: 3 },
            ]);
    });
});