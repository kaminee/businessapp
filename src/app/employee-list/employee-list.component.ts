import { HttpClient } from '@angular/common/http';
import { EmployeeDetailsComponent } from './../employee-details/employee-details.component';
import { Observable } from "rxjs";
import { EmployeeService } from "./../employee.service";
import { Employee } from "./../employee";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ColDef,GridApi,ColumnApi,GridOptions} from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr'; 
  
@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  //  public columnDefs: ColDef[];  
    // gridApi and columnApi  
  	public gridOptions: GridOptions;
 	private api: GridApi;  
    private columnApi: ColumnApi;   
    
	  employees: Observable<Employee[]>;
	  emps: Employee[];

	  constructor(private employeeService: EmployeeService,
	    private router: Router,private http: HttpClient, private toastr: ToastrService) {
	    }

	  ngOnInit() {
	    this.reloadData();
	      this.employeeService.getEmployees().subscribe(data => {  
	            this.emps = data  
	        })  
	  }

	columnDefs: ColDef[] = [{ field: 'firstName', sortable: true, filter: true , checkboxSelection: true  ,editable: true},
       { field: 'lastName', sortable: true, filter: true ,editable: true},
       { field: 'emailId', sortable: true, filter: true ,editable: true}
  	 ];
 // create column definitions  
  

  reloadData() {
    this.employees = this.employeeService.getEmployeesList();
    console.log(" reloadData="+this.employees);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  employeeDetails(){
    var selectedRows = this.api.getSelectedRows();  
        if (selectedRows.length == 0) {  
            this.toastr.error("error", "Please select a employee to see details");  
            return;  
        }  
       this.router.navigate(['employee/details', selectedRows[0].id]); 
    
    //this.router.navigate(['employee/details', id]);
  }

  updateEmployee(){
     var selectedRows = this.api.getSelectedRows();  
        if (selectedRows.length == 0) {  
            this.toastr.error("error", "Please select a employee for update");  
            return;  
        }  
              var row = this.api.getSelectedRows(); 
         this.employeeService.updateEmployee(row[0].id,row[0]).subscribe(data => {  
            this.toastr.success("Employee updated successfully");  
            this.ngOnInit();  
        });  
  //  this.router.navigate(['employee/update', id]);
  }
   // one grid initialisation, grap the APIs and auto resize the columns to fit the available space  
  onGridReady(params: any): void {  
        this.api = params.api;  
        this.columnApi = params.columnApi;  
        this.api.sizeColumnsToFit();  
    }  
   //Delete Employee  
    deleteEmp() {  
        debugger;  
        var selectedRows = this.api.getSelectedRows();  
        if (selectedRows.length == 0) {  
            this.toastr.error("error", "Please select a employee for deletion");  
            return;  
        }  
        this.employeeService.deleteEmployee(selectedRows[0].id).subscribe(data => {  
            this.toastr.success("Employee deleted successfully");  
            this.ngOnInit();  
      
        });  
    }  
}
