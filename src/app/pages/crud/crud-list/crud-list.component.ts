import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { GeneralAttributes } from 'src/app/core/models/general-attributes';

@Component({
  selector: 'app-crud-list',
  templateUrl: './crud-list.component.html',
  styleUrls: ['./crud-list.component.scss']
})
export class CrudListComponent implements OnInit {

  @Input() list = [];
  @Input() listList = [];
  @Input() listCreate = [];

  @Input() submitting = false;;

  constructor() { }

  ngOnInit(): void {
  }
  drop(event: CdkDragDrop<string[]>) {
    debugger
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
  }
  removeItem(index) {
    debugger
    this.list.slice(index, 1)
  }
  addList(item) {
    if (item.showList && !this.listList.find(x => x.name == item.name)) {
      this.listList.push(item);
    }
    if (!item.showList && this.listList.find(x => x.name == item.name)) {
      this.listList.slice(this.listList.findIndex(x => x.name == item.name), 0);
    }
  }
  addCreate(item: GeneralAttributes) {
    if (item.showCreate && !this.listCreate.find(x => x.name == item.name)) {
      this.listCreate.push(item);
    }
    if (!item.showList && this.listCreate.find(x => x.name == item.name)) {
      this.listCreate.slice(this.listCreate.findIndex(x => x.name == item.name), 0);
    }
  }
}
