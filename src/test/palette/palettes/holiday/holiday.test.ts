/*
 * Copyright (C) 2024 brittni and the polar bear LLC.
 *
 * This file is a part of brittni and the polar bear's Generative Art Library,
 * which is released under the GNU Affero General Public License, Version 3.0.
 * You may not use this file except in compliance with the license.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. See LICENSE or go to
 * https://www.gnu.org/licenses/agpl-3.0.en.html for full license details.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 */

import {
    getHolidayColorSelectors,
    glitter,
    holidayPalettes,
    mutedChristmas,
    PaletteColorSelector
} from '../../../../main';

import {checkForValidStringMap} from '../../../index';
import {buildPaletteTestArray, checkForPaletteInMap} from '../index';
import {ColorSelector, ColorSelectorManager} from "@batpb/genart-base";


describe('holiday palettes test', (): void => {
    test('holiday palettes map exists', (): void => {
        checkForValidStringMap(holidayPalettes);
    });

    test.each(
        buildPaletteTestArray(
            [
                mutedChristmas,
                glitter
            ]
        )
    )('$# successful addition of palette: $name',
        ({palette}): void => {
            checkForPaletteInMap(palette, holidayPalettes);
        }
    );

    test('color selector manager test', (): void => {
        const selectors: Set<PaletteColorSelector> = getHolidayColorSelectors();
        const manager: ColorSelectorManager = new ColorSelectorManager();
        manager.addColorSelectors(selectors);
        const selectorsArray: PaletteColorSelector[] = Array.from(selectors);

        for (let i: number = 0; i < 50; i++) {
            const selector: ColorSelector | undefined = manager.getRandomColorSelector();

            if (selector) {
                expect(selectorsArray).toContainEqual(selector);
            }
        }
    });
});
