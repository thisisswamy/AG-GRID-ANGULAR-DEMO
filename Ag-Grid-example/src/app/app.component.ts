import { Component, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { TableData } from 'src/TableData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Ag-Grid-Example';
  gridApi!: GridApi<any>;
  cols: any = [];
  months = ['USERINFO','JAN', 'FEB', 'MAR'];

  rowData: any = TableData.sampleUsersData
  correctedData:any;

  ngOnInit(): void {
    let i = 0;
    this.correctedData = this.calculateMonthlyTotals(this.months,this.rowData)
    this.months.forEach((Element, index) => {
      let parentHeader = this.getTableColumn(Element, Element, i);
      parentHeader.children = [];
      if(Element ==='USERINFO'){
        let idColumn = this.getTableColumn('id', Element, i);
        let nameColumn = this.getTableColumn('name', Element, i);
        parentHeader.children.push(idColumn);
        parentHeader.children.push(nameColumn);
      }
     else{
      let expectedColumn = this.getTableColumn('expected', Element, i);
      let committedColumn = this.getTableColumn('committed', Element, i);
      parentHeader.children.push(expectedColumn);
      parentHeader.children.push(committedColumn);
     }
      this.cols.push(parentHeader);
    });
    this.cols.push({
      headerName: 'Total',
      headerClass: 'bg-yellow',
      children:[
        {
          filed:"expected",
          headerName:'expeceted',
          headerClass: 'bg-yellow',
          valueGetter: "data['JAN']['expected'] + data['FEB']['expected'] + data['MAR']['expected']",
        },
        {
          filed:"committed",
          headerName:'committed',
          headerClass: 'bg-yellow',
          valueGetter: "data['JAN']['committed'] + data['FEB']['committed'] + data['MAR']['committed']",
        }

      ]
    });
  }

  bgColor: { [key: string]: string } = {
    USERINFO:'bg-blue',
    JAN: 'bg-yellow text-center',
    FEB: 'bg-orange',
    MAR: 'bg-green',
    TOTAL: 'bg-blue',
  };

  getTableColumn(headerName: any, month: any, row: number, isEditable?:any) {
    let colobj: any = {
      headerName: headerName,
      field: headerName,
      headerClass: this.bgColor[month],
      width:"160px",
      valueGetter: (params: any) => this.getValue(params, month, row),
    };
    if (headerName === 'committed' || headerName === 'expected') {
      colobj.editable = true; 
    }
    return colobj;
  }

  getValue(params: any, months: any, row: any) {
    let data = params.data[months][params.colDef.field];
    return data;
  }

  onGridReady(event: any) {
    this.gridApi = event.api;
    // this.gridApi.setRowData(this.rowData); //These methods are deprecated || Library suggesting below format
    this.gridApi.setGridOption('rowData', this.correctedData);
    // this.gridApi.setColumnDefs(this.cols); //These methods are deprecated || Library suggesting below format 
    this.gridApi.setGridOption('columnDefs', this.cols);
    this.gridApi.setGridOption('getRowStyle', this.getRowStyle());
    this.gridApi.setGridOption('onCellValueChanged', this.updtedColumns(event.api));
  }
  
  updtedColumns(event: any) {
    return (params: any) => {
      const field = params.column.colDef.field;
        let data = params.data;
        let parentColumnIndex = params.column.getParent().groupId; // Get the parent column
        const editedField = data[field]
        const editedColumnMonth = this.months[parentColumnIndex]
        data[editedColumnMonth][field] =  +editedField
        const updatedRowData = this.updateRowData(this.correctedData,data)
        this.correctedData = this.calculateMonthlyTotals(this.months,updatedRowData)
        this.gridApi.applyTransaction({ update: [data] });
        this.gridApi.setGridOption('rowData', this.correctedData);
    };
  }
 

  calculateMonthlyTotals(columnDefs:any[], rowData:any[], recalculate?:true){
    const months = columnDefs.filter((col:any) => col !== 'USERINFO');
    const newRowList = rowData.filter((item:any)=>item.USERINFO.name !== 'Total')
    let totalRow:any = {
      USERINFO: { 
        name: 'Total'
      }
    }
    months.forEach((month:any) => { 
      const monthCommittedTotal = newRowList.reduce((total:any, row:any) => total + (row[month].committed || 0), 0);
      const monthExpectedTotal = newRowList.reduce((total:any, row:any) => total + (row[month].expected || 0), 0);
      totalRow[month] = { expected: monthExpectedTotal, committed: monthCommittedTotal }
    });
    newRowList.push(totalRow);
    return newRowList;
  };

  updateRowData(rowData:any, newData:any){
    const index = rowData.findIndex((item:any) => item.USERINFO.id === newData.USERINFO.id);

    if (index !== -1) {
      rowData[index] = newData;
    }
    return rowData;
  };


  // Define the getRowStyle callback function
  getRowStyle():any{
    // Check if the row is the last row
    return (params:any)=>{
      if (params.node.rowIndex === params.api.getDisplayedRowCount() - 1) {
        return {
          background: 'lightblue',
          fontWeight: 'bold',
          cursor:'not-allowed',
          pointerEvents:'none'

        };
      }
      return null
    }
  };

}
