import * as React from "react";

export interface Aufgabe {
	zahl1: number;
	zahl2: number;
}

export interface AppState {
	zeit?: number;
	punkte?: number;
	aufgabe?: Aufgabe;
	richtig?: boolean;
}
export default class App extends React.Component<void, AppState> {

	constructor() {
		super();
		this.state = {
			zeit: 0,
			punkte: 0
		};
	}

	public start(): void {
		this.setState(
			{
				zeit: 60,
				punkte: 0,
				aufgabe: {
					zahl1: 1,
					zahl2: 1
				}
			},
			() => {
				this.tick();
			});
	}

	public tick(): void {
		this.setState({
			zeit: this.state.zeit - 1
		});
		setTimeout(
			() => {
				this.tick();
			},
			1000);
	}

	public render(): React.ReactElement<any> {
		return <div className="container">
			<h1 className="header center blue-text">Mathe Ass</h1>
			<div className="row">
				{this.state.zeit}
				<button type="button" onClick={() => { this.start(); } }>START</button>
			</div>

			<div className="row">
				PUNKTE: {this.state.punkte}
			</div>

			<div className="row">
				AUFGABE:
				{this.renderTask(this.state.aufgabe)}
			</div>

			<div className="row">
				ERGEBNIS:
				{this.renderResult(this.state.richtig)}
			</div>

			<div className="row">
				HILFE
			</div>
		</div>;
	}

	private renderTask(task: Aufgabe): React.ReactElement<any> {
		if (task === undefined) {
			return <div>GIBT KEINE AUFGABE</div>;
		} else {
			return <div>
				{task.zahl1}
				+
				{task.zahl2}
				=
				<input type="number" onKeyPress={(ev) => { this.onKeyPress(ev); } }></input>
			</div>;
		}
	}

	private renderResult(richtig?: boolean): React.ReactElement<any> {
		if (richtig === undefined) {
			return <p></p>;
		} else if (richtig) {
			return <p style={{ color: "green" }}>RICHTIG!</p>;
		} else {
			return <p style={{ color: "red" }}>FALSCH!</p>;
		}
	}

	private onKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
		if (event.charCode == 13) {
			const eingabe = Number(event.currentTarget.value);
			this.pruefeEingabe(eingabe);
		}
	}

	private pruefeEingabe(eingabe: number): void {
		const ergebnis = this.state.aufgabe.zahl1 + this.state.aufgabe.zahl2;
		const richtig = eingabe === ergebnis;
		let punkte: number;
		if (richtig) {
			punkte = this.state.punkte + 1;
		} else {
			punkte = this.state.punkte - 1;
		}
		this.setState({
			richtig: richtig,
			punkte: punkte
		});
	}
}
