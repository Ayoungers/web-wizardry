"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var DrawComponent = (function () {
    function DrawComponent() {
    }
    DrawComponent.prototype.ngOnInit = function () {
        this.lines = new Array();
        switch (this.distance) {
            case 0:
                this.startPos = 245;
                this.endPos = 525;
                break;
            case 1:
                this.startPos = 105;
                this.endPos = 245;
                break;
            case 2:
                this.startPos = 35;
                this.endPos = 105;
                break;
            case 3:
                this.startPos = 0;
                this.endPos = 35;
                break;
        }
        if (this.isLeftFacing) {
            this.m = 26 / 23;
            this.b = -300;
            this.startPos = 575 - this.startPos;
            this.endPos = 575 - this.endPos;
        }
        else if (!this.isLeftFacing) {
            this.m = -26 / 23;
            this.b = 350;
        }
        this.generateLines();
    };
    DrawComponent.prototype.generateLines = function () {
        switch (this.feature) {
            case 'door':
                this.generateWallLines();
                this.generateDoorLines();
                break;
            case 'wall':
                this.generateWallLines();
                break;
            case 'hall':
                this.generateHallLines();
                break;
        }
    };
    DrawComponent.prototype.calcWallLine = function (xPos) {
        return (xPos * this.m) + (this.b);
    };
    DrawComponent.prototype.generateWallLines = function () {
        this.lines.push(new Line(this.startPos, this.calcWallLine(this.startPos), this.endPos, this.calcWallLine(this.endPos)));
        this.lines.push(new Line(this.startPos, 750 - this.calcWallLine(this.startPos), this.endPos, 750 - this.calcWallLine(this.endPos)));
        this.lines.push(new Line(this.startPos, this.calcWallLine(this.startPos), this.startPos, 750 - this.calcWallLine(this.startPos)));
        this.lines.push(new Line(this.endPos, this.calcWallLine(this.endPos), this.endPos, 750 - this.calcWallLine(this.endPos)));
    };
    DrawComponent.prototype.generateDoorLines = function () {
        var offset = 10 * (4 - this.distance);
        if (this.isLeftFacing) {
            var x1 = this.startPos - offset;
            var x2 = this.endPos + offset;
        }
        else if (!this.isLeftFacing) {
            var x1 = this.startPos + offset;
            var x2 = this.endPos - offset;
        }
        this.lines.push(new Line(x1, this.calcWallLine(x1) + offset, x2, this.calcWallLine(x2) + offset));
        this.lines.push(new Line(x1, 750 - this.calcWallLine(x1), x2, 750 - this.calcWallLine(x2)));
        this.lines.push(new Line(x1, this.calcWallLine(x1) + offset, x1, 750 - this.calcWallLine(x1)));
        this.lines.push(new Line(x2, this.calcWallLine(x2) + offset, x2, 750 - this.calcWallLine(x2)));
    };
    DrawComponent.prototype.generateHallLines = function () {
        var y = this.calcWallLine(this.startPos);
        this.lines.push(new Line(this.startPos, y, this.endPos, y));
        this.lines.push(new Line(this.startPos, 750 - y, this.endPos, 750 - y));
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DrawComponent.prototype, "feature", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DrawComponent.prototype, "isLeftFacing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DrawComponent.prototype, "distance", void 0);
    DrawComponent = __decorate([
        core_1.Component({
            selector: 'draw-panel',
            template: "\n\t<svg>\n\t\t<line *ngFor=\"let line of lines\" [attr.x1]=\"line.x1\" [attr.y1]=\"line.y1\" [attr.x2]=\"line.x2\" [attr.y2]=\"line.y2\"></line>\n\t</svg>\n\t",
            styleUrls: ['app/css/draw.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], DrawComponent);
    return DrawComponent;
}());
exports.DrawComponent = DrawComponent;
var Line = (function () {
    function Line(x1, y1, x2, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }
    return Line;
}());
//# sourceMappingURL=draw-panel.component.js.map