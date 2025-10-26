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
        [{ x: 0, y: 0 }, true, 'top-left corner'],
        [{ x: 7, y: 7 }, true, 'bottom-right corner'],
        [{ x: 4, y: 4 }, true, 'center'],
        [{ x: 0, y: 7 }, true, 'bottom-left corner'],
        [{ x: 7, y: 0 }, true, 'top-right corner'],
        [{ x: -1, y: 4 }, false, "negative x"],
        [{ x: -5, y: 0 }, false, "large negative x"],
        [{ x: 4, y: -1 }, false, "negative y"],
        [{ x: 4, y: -3 }, false, "large negative y"],
        [{ x: 8, y: 4 }, false, "x at boundary"],
        [{ x: 10, y: 0 }, false, "x beyond boundary"],
        [{ x: 4, y: 8 }, false, "y at boundary"],
        [{ x: 0, y: 12 }, false, "y beyond boundary"],
        [{ x: -1, y: -1 }, false, "both negative"],
        [{ x: 8, y: 8 }, false, "both at boundary"],
        [{ x: -1, y: 8 }, false, "x negative, y at boundary"],
    ])('should return %s for coordinates %s (%s)', (coordinates, expected, description) => {
        expect(is_coordinates_bounded(coordinates)).toBe(expected);
    });
});