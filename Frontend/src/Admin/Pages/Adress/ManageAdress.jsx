
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../Create_user/create_user.css"
import { FilterMatchMode } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme 
import { ToastContainer, toast } from "react-toastify"; 
import { Link } from "react-router-dom";                             // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { InputText } from 'primereact/inputtext';
import apiServices from "../../../ApiServices/ApiServices";
import { Tag } from 'primereact/tag';
export default function ManageAddress({ setIsActive, isActive }) {
  const [data, setData] = useState([]);
  const dt = useRef(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [loading, setLoading] = useState(true);

//   console.log("???????????????", coupon)
 

  // const exportColumns = user.map((user) => ({ title: user.header, dataKey: user.field }));
 

  // =============customer api===========
  useEffect(() => {

    fetchData();
}, []);

// ========review get api=========
const fetchData = async () => {
    try {
        const response = await apiServices.getAllAddresses();
        if (response.data.success) {
           
            setData(response.data.data);
        } else {
            // Handle error if needed
        }
    } catch (error) {
        // Handle error if needed
    } finally {
        setLoading(false);
    }
};

    // / -------------delete api--------
    const deleteaddress = (id) => {
      const data = { _id: id };
      apiServices.deleteAddress(data).then((response) => {
        if (response.data.success) {
          toast.success(response.data.msg);
          fetchData();
        } else {
          toast.error(response.data.msg);
        }
      }).catch((error) => {
        // console.error(error);
      });
    };
  
    // -------------change Status api--------
    const changeStatus = (id, status) => {
      setLoading(true);
      const upstatus = status ? '0' : '1';
      const data = {
        _id: id ,
        status: upstatus,
      };
     
      apiServices.updateAddressStatus(data).then((response) => {
        if (response.data.success) {
          
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
        setLoading(false);
        fetchData();
      }).catch((error) => {
     
        toast.error('Something went wrong!! Try Again Later');
        setLoading(false);
      });
    };
  
  
    
    const statusBodyTemplate = (banner) => {
      return < Tag value={banner.status ? 'active' : 'in-active'} severity={getSeverity(banner)}></Tag>;
    };
  
  
    const getSeverity = (banner) => {
      switch (banner.status ? 'Active' : 'In-active') {
        case 'Active':
          return 'success';
  
        case 'In-active':
          return 'danger';
  
        default:
          return null;
      }
    };
    // status function end 
  

  // export function 
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  //pdf rint function 
  const handlePrintPdf = () => {
    import('jspdf').then((jsPDF) => {
      const doc = new jsPDF.default();

      // Prepare the data for the table
      const printableData = data.map((data) => [data._id, data.fullName,data.userId?._id, data.city, data.state, data.postalCode, data.country, data.phoneNumber,data.addressLine1, data.addressLine2, data.isDefault ]);

      // Add table content to PDF
      doc.autoTable({ head: ["Coupon Id", "Code", "Description", "Discount Type", "Discount Value", "Expiry Date"], body: printableData });

      // Save the PDF document
      doc.save("coupon_data.pdf");
    });
  };


  // exel export function 
  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

      saveAsExcelFile(excelBuffer, 'coupon');
    });
  };

  // cvs export function 
  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };


  // ========global filter===========
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    _id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    fullName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    city: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    state: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    postalCode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    country: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phoneNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "userId._id": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    isDefault: { value: null, matchMode: FilterMatchMode.EQUALS }

  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const header = (
    <>
      <div className="flex flex-wrap align-items-center  gap-2">


      </div>
      <div className="">

        <div className='d-flex justify-content-end gap-3'>
          <span className="p-input-icon-left ">
            <i className="pi pi-search" />
            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
          </span>

          <Button type="button" icon="pi pi-file" className='rounded-circle' onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
          <Button type="button" icon="pi pi-file-excel" severity="success" className='rounded-circle' onClick={exportExcel} data-pr-tooltip="XLS" />
          <Button type="button" icon="pi pi-file-pdf" severity="warning" className='rounded-circle' onClick={handlePrintPdf} data-pr-tooltip="PDF" />
        </div>

      </div>

    </>

  );


  // ... (action button start)

const actionTemplate = (rowData) => {
  return (
    <div className="d-flex justify-content-center gap-3">
      <Link to={`/admin/update-address/${rowData._id}`}>
      <Button
        icon="pi pi-pencil"
        className="rounded-circle p-button-success p-mr-2"
        tooltip="Edit"
      />
      </Link>
      <Button
        icon="pi pi-trash"
        className="rounded-circle p-button-danger p-mr-2"
        onClick={() => deleteaddress(rowData)}
        tooltip="Delete"
      />
      <Button
        icon="pi pi-trash"
        className={`rounded-circle ${rowData.status ? 'p-button-success' : 'p-button-warning'}`}
        onClick={() => changeStatus(rowData._id, rowData.status)}
        tooltip={rowData.status ? 'Deactivate' : 'Activate'}
      />
    </div>
  );
};
  // ... (action button end)

  const footer = `In total there are ${data ? data.length : 0} address.`;

  return (
    <main id="main" className={`main mainWrapper ${isActive === true && 'active'}`}>
      <Tooltip target=".export-buttons>button" position="bottom" />
      <div className="card">
        <DataTable ref={dt} stripedRows value={data} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} sortMode="multiple" sortOrder={-1} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}
          dataKey="id" filters={filters} filterDisplay="row" loading={loading}
          globalFilterFields={['_id','FullName', 'city', 'state', 'postalCode', 'country',"phoneNumber","addressLine1","isDefault"]} emptyMessage="No Coupon found.">
          <Column field="_id" filter filterPlaceholder="Search by Id" style={{ minWidth: '16rem' }} sortable header="Address Id"></Column>

          <Column field="fullName" filter filterPlaceholder="Search by name" style={{ minWidth: '16rem' }} sortable header="Full Name"></Column>
          <Column field="userId._id" filter filterPlaceholder="Search by Id" style={{ minWidth: '16rem' }} sortable header="User Id"></Column>

          <Column field="city" filter filterPlaceholder="Search by city" style={{ minWidth: '16rem' }} sortable header="City" ></Column>

          <Column field="state" filter filterPlaceholder="Search by state" style={{ minWidth: '17rem' }} sortable header=" State"></Column>

          <Column field="postalCode" filter filterPlaceholder="Search by postalcode" style={{ minWidth: '17rem' }} sortable header="Postalcode"></Column>

          <Column field="country" filter filterPlaceholder="Search by country" style={{ minWidth: '17rem' }} sortable header="Expiry Date"></Column>

          <Column field="phoneNumber" filter filterPlaceholder="Search by phone number" style={{ minWidth: '17rem' }} sortable header="Phone Number"></Column>

          <Column field="addressLine1" filter filterPlaceholder="Search by address" style={{ minWidth: '17rem' }} sortable header="AddressLine 1"></Column>

          <Column field="addressLine2" filter filterPlaceholder="Search by address" style={{ minWidth: '17rem' }} sortable header="AddressLine 2"></Column>

          <Column field="isDefault"  style={{ minWidth: '17rem' }} sortable header="Is Default"></Column>
          <Column header="Status"    style={{ minWidth: '12rem' }} sortable body={statusBodyTemplate} ></Column>
          <Column header="Actions" body={actionTemplate} style={{ textAlign: 'center', width: '10rem' }} />
          

        </DataTable>
      </div>
      <ToastContainer />
    </main>
  );
}
