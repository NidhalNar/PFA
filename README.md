# QR & Barcode Scanner Web Application

This project is a web application built with **.NET** for the backend and **Angular** for the frontend. The application allows users to scan QR codes and barcodes using the camera, retrieve the scanned data, and search for related employee information from a database.

## Features

- **QR & Barcode Scanning**: Uses the camera to scan QR codes or barcodes and captures the data.
- **Automatic Data Input**: Automatically populates an input field with the scanned data (reference).
- **Employee Lookup**: Searches for employee details in the database using the scanned reference.

## Technologies Used

- **Frontend**: Angular
  - `@zxing/ngx-scanner` library for QR and barcode scanning.
- **Backend**: .NET Core Web API
  - SQL Server database for storing employee information.
- **Database**: SQL Server

## Getting Started

### Prerequisites

Make sure you have the following software installed:

- **Node.js** (for Angular)
- **.NET SDK** (for .NET Core)
- **SQL Server** (for the database)
