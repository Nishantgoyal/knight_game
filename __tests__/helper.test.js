const { all_moves, is_coordinates_bounded } = require("../scripts/helper.js");

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

describe('is_coordinates_bounded', () => {
    test.each([
        { coordinates: { x: 0, y: 0 }, expected: true, description: 'top-left corner' },
        { coordinates: { x: 7, y: 7 }, expected: true, description: 'bottom-right corner' },
        { coordinates: { x: 4, y: 4 }, expected: true, description: 'center' },
        { coordinates: { x: 0, y: 7 }, expected: true, description: 'bottom-left corner' },
        { coordinates: { x: 7, y: 0 }, expected: true, description: 'top-right corner' },
        { coordinates: { x: -1, y: 4 }, expected: false, description: "negative x" },
        { coordinates: { x: -5, y: 0 }, expected: false, description: "large negative x" },
        { coordinates: { x: 4, y: -1 }, expected: false, description: "negative y" },
        { coordinates: { x: 4, y: -3 }, expected: false, description: "large negative y" },
        { coordinates: { x: 8, y: 4 }, expected: false, description: "x at boundary" },
        { coordinates: { x: 10, y: 0 }, expected: false, description: "x beyond boundary" },
        { coordinates: { x: 4, y: 8 }, expected: false, description: "y at boundary" },
        { coordinates: { x: 0, y: 12 }, expected: false, description: "y beyond boundary" },
        { coordinates: { x: -1, y: -1 }, expected: false, description: "both negative" },
        { coordinates: { x: 8, y: 8 }, expected: false, description: "both at boundary" },
        { coordinates: { x: -1, y: 8 }, expected: false, description: "x negative, y at boundary" },
    ])('should return $expected for coordinates $coordinates ($description)', (coordinates, expected, description) => {
        expect(is_coordinates_bounded(coordinates)).toBe(expected);
    });
});