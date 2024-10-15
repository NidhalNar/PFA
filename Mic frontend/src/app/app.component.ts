import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { ScannerQRCodeConfig, NgxScannerQrcodeService, ScannerQRCodeSelectedFiles, ScannerQRCodeResult, NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { EmployeeService } from 'src/app/service/employee.service';
import { Employee } from 'src/app/models/employee';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth
      },
    },
  };

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];
  public percentage = 80;
  public quality = 100;
  public scannedData: string = ''; // Property to hold the scanned QR code data
  employees: Employee[] = [];
  filteredEmployees: Employee[] = []; // Filtered employees to display
  public showTable: boolean = false;


  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  constructor(private qrcode: NgxScannerQrcodeService,private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      this.filteredEmployees = data; // Initialize with all employees
    });
  }

  searchByReference(): void {
    if (this.scannedData) {
      this.showTable = true;

      this.filteredEmployees = this.employees.filter(employee => 
        employee.reference.toLowerCase().includes(this.scannedData.toLowerCase())
      );
    } else {
      this.showTable = false;

      this.filteredEmployees = this.employees; // Show all employees if input is empty
    }
  }

  ngAfterViewInit(): void {
    this.action.isReady.subscribe((res: any) => {
      // this.handle(this.action, 'start');
    });
  }

  public onEvent(e: ScannerQRCodeResult[], action: any, fn: string): void {
    if (e.length > 0) {
      const result = e[0].data;

      // Check if result is Int8Array and convert to string
      if (result instanceof Int8Array) {
        this.scannedData = new TextDecoder().decode(result);
        action[fn]().subscribe((r: any) => console.log(fn, r), alert);

      } else if (typeof result === 'string') {
        this.scannedData = result;
        action[fn]().subscribe((r: any) => console.log(fn, r), alert);

      } else {
        console.error('Unexpected result type:', result);
      }
      
      console.log(this.scannedData);
    }
  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label)));
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    }

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }



  public onDowload(action: NgxScannerQrcodeComponent) {
    action.download().subscribe(console.log, alert);
  }

  public onSelects(files: any) {
    this.qrcode.loadFiles(files, this.percentage, this.quality).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
      this.qrCodeResult = res;
    });
  }

  public onSelects2(files: any) {
    this.qrcode.loadFilesToScan(files, this.config, this.percentage, this.quality).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
      console.log(res);
      this.qrCodeResult2 = res;
    });
  }

  public onGetConstraints() {
    const constrains = this.action.getConstraints();
    console.log(constrains);
  }
  
  public applyConstraints() {
    const constrains = this.action.applyConstraints({
      ...this.action.getConstraints(),
      width: 510
    });
    console.log(constrains);
  } 
}
