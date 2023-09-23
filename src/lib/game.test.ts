import { describe, it, expect } from 'vitest';
import {Game} from "$lib/game";

describe('sum test', () => {
	const game = new Game()

	it('scores 0 initially', () => {
		expect(game.score()).toBe(0);
	});
});
