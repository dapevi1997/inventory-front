import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  print(head: string[], body: Array<any>, title: string, save?:boolean){

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: 'letter'
    });

    doc.text(title, doc.internal.pageSize.width /2, 25, {align:'center'});

    autoTable(doc, {
      head: [head],
      body: body,
    })

    if(save){
      const today = new Date();
      doc.save(today.getDate() + today.getMonth() + today.getFullYear() + today.getTime() + '.pdf');
    }else{

    }

   

  }

}
