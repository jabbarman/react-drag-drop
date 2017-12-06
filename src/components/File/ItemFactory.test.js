import * as Item from './ItemFactory';

describe('ItemFactory', () => {

    describe('formatTitle', () => {

        it('returns the filename without extension', () => {
            let filename = "test.jpg";

            expect(Item.formatTitle(filename)).toEqual('test');
        });

        it('returns the full string if no extension present', () => {
            let filename = "testfile";

            expect(Item.formatTitle(filename)).toEqual('testfile');
        });

        it('returns the full string if it starts with .', () => {
            let filename = ".testfile";

            expect(Item.formatTitle(filename)).toEqual('.testfile');
        });

        it('removes the final . if the string ends with .', () => {
            let filename = "testfile.";

            expect(Item.formatTitle(filename)).toEqual('testfile');
        });

    });
});

