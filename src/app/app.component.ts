import { Component } from '@angular/core';
import * as io from "socket.io-client";
@Component({
	selector: 'go-cg',
	templateUrl: 'app/app.component.pug'
})
export class CGGoComponent {
		socket: SocketIOClient.Socket;
		socketUrl: string = 'http://localhost:8081';
		socketConnected: boolean = false;
		min: number = 0;
		sec: number = 0;
		msec: number = 0;
		scoreHome: number = 0;
		scoreAway: number = 0;
		per = "1";

		constructor () {
				this.connect()
		}

		connect () {
				this.socket = io.connect(this.socketUrl);
				this.socket.on('connect', function () {
						this.socketConnected = true;
				}.bind(this));
				this.socket.on('disconnect', function () {
						this.socketConnected = false;
				}.bind(this));
		}

		caspar (status: boolean): void {
			this.socket.emit('config-change', 'caspar -' + (status ? 'on' : 'off'));
		}

		vmix (status: boolean): void {
			this.socket.emit('config-change', 'vmix -' + (status ? 'on' : 'off'));
		}

		hdmi (status: boolean): void {
			this.socket.emit('config-change', 'hdmi -' + (status ? 'on' : 'off'));
		}

		setTime (): void {
			this.socket.emit('config-change', 'update -clock ' + this.min + ' ' + this.sec + ' ' + this.msec + ' ' + this.per);
		}
		setScore (): void {
			this.socket.emit('config-change', 'update -score ' + this.scoreHome + ' ' + this.scoreAway);
		}
}
