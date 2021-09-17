import { Component, OnInit } from '@angular/core';

/*
We import Component from the module "@angular/core".
The "@angular/core" portion tells our program where to find the dependencies that we’re looking for.


OnInit helps us to run code when we initialize the component.
*/

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
