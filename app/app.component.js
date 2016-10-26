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
var io = require("socket.io-client");
var CGGoComponent = (function () {
    function CGGoComponent() {
        this.socketUrl = 'http://localhost:8081';
        this.socketConnected = false;
        this.min = 0;
        this.sec = 0;
        this.msec = 0;
        this.scoreHome = 0;
        this.scoreAway = 0;
        this.per = "1";
        this.connect();
    }
    CGGoComponent.prototype.connect = function () {
        this.socket = io.connect(this.socketUrl);
        this.socket.on('connect', function () {
            this.socketConnected = true;
        }.bind(this));
        this.socket.on('disconnect', function () {
            this.socketConnected = false;
        }.bind(this));
    };
    CGGoComponent.prototype.setTime = function () {
        this.socket.emit("config-change", "update -clock " + this.min + " " + this.sec + " " + this.msec + " " + this.per);
    };
    CGGoComponent.prototype.setScore = function () {
        this.socket.emit("config-change", "update -clock " + this.min + " " + this.sec + " " + this.msec + " " + this.per);
    };
    CGGoComponent = __decorate([
        core_1.Component({
            selector: 'go-cg',
            templateUrl: 'app/app.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], CGGoComponent);
    return CGGoComponent;
}());
exports.CGGoComponent = CGGoComponent;
//# sourceMappingURL=app.component.js.map