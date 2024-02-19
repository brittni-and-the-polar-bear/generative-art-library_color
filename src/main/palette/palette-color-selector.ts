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

import P5Lib from 'p5';
import {Color, ColorSelector, randomBoolean, randomInt, SketchContext} from '@batpb/genart-base';
import {PaletteColor} from '../color';
import {Palette} from "./palette";

const p5: P5Lib = SketchContext.p5;

class PaletteColorSelector implements ColorSelector {
    private _colors: PaletteColor[] = [];
    private _currentIndex: number = 0;
    private readonly _randomOrder: boolean;

    constructor(_palette: Palette);
    constructor(_palette: Palette, colorCount: number, randomOrder: boolean);
    constructor(private readonly _palette: Palette,
                colorCount?: number,
                randomOrder?: boolean) {
        if (randomOrder === undefined) {
            this._randomOrder = randomBoolean();
        } else {
            this._randomOrder = randomOrder;
        }

        if (!colorCount) {
            colorCount = randomInt(2, this._palette.colors.length + 1);
        }

        colorCount = p5.constrain(colorCount, 2, this._palette.colors.length);
        this.chooseColors(colorCount);
    }

    public getColor(): Color {
        let pc: PaletteColor;

        if (this.randomOrder) {
            const i: number = randomInt(0, this.colors.length);
            pc = this.colors[i];
        } else {
            pc = this.colors[this.currentIndex];
            this.incrementCurrentIndex();
        }

        const p5Color: P5Lib.Color = p5.color(pc.hexString);
        return new Color(p5Color);
    }

    private get colors(): PaletteColor[] {
        return this._colors;
    }

    private set colors(colors: PaletteColor[]) {
        this._colors = colors;
    }

    private get currentIndex(): number {
        return this._currentIndex;
    }

    private get palette(): Palette {
        return this._palette;
    }

    private get randomOrder(): boolean {
        return this._randomOrder;
    }

    private chooseColors(count: number): void {
        if (count == this.palette.colors.length) {
            this.colors = Array.from(this.palette.colors);
        } else {
            const colorIndices: number[] = [];
            for (let i: number = 0; i < this.palette.colors.length; i++) {
                colorIndices.push(i);
            }

            for (let i: number = 0; i < count; i++) {
                const index: number = randomInt(0, colorIndices.length);
                const colorIndex: number = colorIndices[index];
                const color: PaletteColor = this.palette.colors[colorIndex];
                this.colors.push(color);
                colorIndices.splice(index, 1);
            }
        }
    }

    private incrementCurrentIndex(): void {
        this._currentIndex = (this.currentIndex + 1) % this.colors.length;
    }
}

export {PaletteColorSelector};
