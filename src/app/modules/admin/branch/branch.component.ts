import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Branch } from 'src/app/interfaces/Branchs';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit{
  @Input() branch!: Branch;

  constructor(private $websocket: WebsocketService){}

  ngOnInit(): void {
      
  }

}
