import { AdditionalModifiers, AdditionalModifiersResult } from "../src/types/DiceTerm";
import { replaceFunction } from "../src/module/modifiers";

describe("Modifiers", () => {
	describe("Replace", () => {
		let compareResult = jest.fn();
		let results: AdditionalModifiersResult[] = [];

		beforeEach(() => {
			results = [];
			compareResult = jest.fn()
		});

		it("No modifier - Returns when no match is found", () => {
			// Arrange
			const modifier = "";
			results = [{
				result: 0
			}];

			// Should not get to comparing results
			compareResult.mockReturnValue(() => {
				throw "Whoops";
			});

			// Act
			replaceFunction(results, modifier, compareResult)

			// Assert
			expect(results[0].replaced).toBeFalsy();
		});

		it("Simple Replace - No equals", () => {
			// Arrange
			const modifier = "1d6rep5,10";
			results = [{
				result: 5
			},
			{
				result: 4
			}];

			compareResult.mockImplementation(((result: number, comparison: string, target: number) => {
				return result == 5;
			}));


			// Act
			replaceFunction(results, modifier, compareResult);

			// Assert
			expect(results[0].replaced).toBeTruthy();
			expect(results[0].result).toBe(10);
			expect(results[1].replaced).toBeFalsy();
			expect(results[1].result).toBe(4);
			expect(compareResult).toHaveBeenCalledTimes(2);
			expect(compareResult).toHaveBeenNthCalledWith(1, 5, "=", 5);
			expect(compareResult).toHaveBeenNthCalledWith(2, 4, "=", 5);
		});

		it("Simple replace, passes in comparison", () => {
			// Arrange
			const modifier = "1d6rep<=3,10";
			results = [{
				result: 2
			}];

			compareResult.mockImplementation(((result: number, comparison: string, target: number) => {
				return result <= 3;
			}));


			// Act
			replaceFunction(results, modifier, compareResult);

			// Assert
			expect(results[0].replaced).toBeTruthy();
			expect(results[0].result).toBe(10);
			expect(compareResult).toHaveBeenCalledTimes(1);
			expect(compareResult).toHaveBeenNthCalledWith(1, 2, "<=", 3);
		});

		it("No Replace", () => {
			// Arrange
			const modifier = "1d6rep5,10";
			results = [{
				result: 4
			}];

			compareResult.mockReturnValue(false);

			// Act
			replaceFunction(results, modifier, compareResult)

			// Assert
			expect(results[0].replaced).toBeFalsy();
			expect(results[0].result).toBe(4);
		});
	})
});