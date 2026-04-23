export class ProjectStyle {
	fg: string = 'white';
	bg: string = 'black';
}

export class Project {
	name!: string;
	description!: string;
	complexity!: number;
	thumbnail: string = '';
	stack: Array<string> = [];
	style: ProjectStyle = new ProjectStyle();
}