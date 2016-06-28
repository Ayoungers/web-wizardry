import { Component, Input } from '@angular/core';

@Component({
	selector: 'draw-panel',
	template: `
	<svg>
		<line *ngFor="let line of lines" [attr.x1]="line.x1" [attr.y1]="line.y1" [attr.x2]="line.x2" [attr.y2]="line.y2"></line>
	</svg>
	`,
	styleUrls: ['app/css/draw.component.css']
})

export class DrawComponent { 
	@Input()
	feature: String;

	@Input()
	isLeftFacing: boolean;


	@Input()
	distance: number;

	m: number;

	b: number;

	startPos: number;

	endPos: number;

	lines: Array<Line>;

	ngOnInit() {
		this.lines = new Array<Line>();
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

		if(this.isLeftFacing){
			this.m = 26 / 23;
			this.b = -300;

			this.startPos = 575 - this.startPos;
			this.endPos = 575 - this.endPos;
		}
		else if(!this.isLeftFacing) {
			this.m = -26 / 23;
			this.b = 350;
		}

		this.generateLines();
	}

	generateLines() {
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
	}

	calcWallLine(xPos: number) : number {
		return (xPos * this.m) + (this.b);
	}

	generateWallLines() {
		this.lines.push(new Line(this.startPos, this.calcWallLine(this.startPos), this.endPos, this.calcWallLine(this.endPos)));
		this.lines.push(new Line(this.startPos, 750 - this.calcWallLine(this.startPos), this.endPos, 750 - this.calcWallLine(this.endPos)));
		this.lines.push(new Line(this.startPos, this.calcWallLine(this.startPos), this.startPos, 750 - this.calcWallLine(this.startPos)));
		this.lines.push(new Line(this.endPos, this.calcWallLine(this.endPos), this.endPos, 750 - this.calcWallLine(this.endPos)));
	}

	generateDoorLines() {

		var offset = 10 * (4 - this.distance);


		if(this.isLeftFacing){
			var x1 = this.startPos - offset;
			var x2 = this.endPos + offset;
		}
		else if(!this.isLeftFacing){
			var x1 = this.startPos + offset;
			var x2 = this.endPos - offset;
		}


		this.lines.push(new Line(x1, this.calcWallLine(x1) + offset, x2, this.calcWallLine(x2) + offset));
		this.lines.push(new Line(x1, 750 - this.calcWallLine(x1), x2, 750 - this.calcWallLine(x2)));
		this.lines.push(new Line(x1, this.calcWallLine(x1) + offset, x1, 750 - this.calcWallLine(x1)));
		this.lines.push(new Line(x2, this.calcWallLine(x2) + offset, x2, 750 - this.calcWallLine(x2)));
	}

	generateHallLines() {
		var y = this.calcWallLine(this.startPos);

		this.lines.push(new Line(this.startPos, y, this.endPos, y));
		this.lines.push(new Line(this.startPos, 750 - y, this.endPos, 750 - y));
	}
}

class Line {
	public x1: number;
	public x2: number;
	public y1: number;
	public y2: number;

	constructor(x1: number, y1: number, x2: number,y2:number) {
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
	}
}