
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import "./create_user.css"
import { FilterMatchMode } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
// import 'primeflex/primeflex.css';     
import { ToastContainer, toast } from "react-toastify"; 
import { Link } from "react-router-dom";                             // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
// import { ProductService } from './service/ProductService';
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
export default function ManageUser({ setIsActive, isActive }) {
  const [user, setUser] = useState([]);
  const dt = useRef(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [loading, setLoading] = useState(true);


 

  // const exportColumns = user.map((user) => ({ title: user.header, dataKey: user.field }));
 

  // =============customer api===========
  useEffect(() => {

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiServices.getallcustomer();
      if (response.data.success) {
      
        setUser(response.data.data);
      } else {
       
      }
    } catch (error) {
     toast.error(error)
    } finally {
      setLoading(false);
    }
  };
  // / -------------delete api--------
  const deleteuser = (id) => {
    const data = { _id: id };
    apiServices.deletecustomer(data).then((response) => {
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
   
    apiServices.changeStatus(data).then((response) => {
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



 
  // image body
  const imageBodyTemplate = (user) => {
    return <img src={BASE_URL_IMG + user?.Image} alt='userimage' className="rounded-circle table-image img-fluid" />;
  };


  // status function start
  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const statusBodyTemplate = (user) => {
    return < Tag value={user.userId?.status ? 'active' : 'in-active'} severity={getSeverity(user)}></Tag>;
  };


  // status fiter function
  const [statuses] = useState(['active', 'in-active']);
  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
    );
  };


  const getSeverity = (user) => {
    switch (user.userId?.status ? 'Active' : 'In-active') {
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
      const printableData = user.map((user) => [user.name, user.email, user.contact, user.address, user.userId?.status ? "Active" : "In-active"]);

      // Add table content to PDF
      doc.autoTable({ head: ["Name", "Email", "Contact", "Address", "Status"], body: printableData });

      // Save the PDF document
      doc.save("user_data.pdf");
    });
  };


  // exel export function 
  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(user);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

      saveAsExcelFile(excelBuffer, 'user');
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
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS }
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
      <Link to={`/admin/update-user/${rowData.userId?._id}`}>
      <Button
        icon="pi pi-pencil"
        className="rounded-circle p-button-success p-mr-2"
        tooltip="Edit"
      />
      </Link>
      <Button
        icon="pi pi-trash"
        className="rounded-circle p-button-danger p-mr-2"
        onClick={() => deleteuser(rowData)}
        tooltip="Delete"
      />
      <Button
        icon="pi pi-trash"
        className={`rounded-circle ${rowData.userId?.status ? 'p-button-success' : 'p-button-warning'}`}
        onClick={() => changeStatus(rowData.userId._id, rowData.userId.status)}
        tooltip={rowData.userId?.status ? 'Deactivate' : 'Activate'}
      />
    </div>
  );
};
  // ... (action button end)

  const footer = `In total there are ${user ? user.length : 0} user.`;

  return (
    <main id="main" className={`main mainWrapper ${isActive === true && 'active'}`}>
      <Tooltip target=".export-buttons>button" position="bottom" />
      <div className="card">
        <DataTable ref={dt} stripedRows value={user} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} sortMode="multiple" sortOrder={-1} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}
          dataKey="id" filters={filters} filterDisplay="row" loading={loading}
          globalFilterFields={['name', 'email', 'contact', 'userId?.status', 'address']} emptyMessage="No customers found.">
          {/* <Column field="id" header="Id" style={{ width: '20%' }}></Column> */}
          <Column field="name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} sortable header="Name"></Column>
          <Column field="Image" header="Image" style={{ minWidth: '12rem' }} body={imageBodyTemplate}></Column>
          <Column field="email" filter filterPlaceholder="Search by email" style={{ minWidth: '12rem' }} sortable header="Email" ></Column>
          <Column field="contact" filter filterPlaceholder="Search by contact" style={{ minWidth: '12rem' }} sortable header="Contact"></Column>
          <Column field="address" filter filterPlaceholder="Search by address" style={{ minWidth: '12rem' }} sortable header="Address"></Column>
          {/* <Column field="userId" header="User ID"></Column> */}
          <Column header="Status" showFilterMenu={false} filter filterPlaceholder="Search by status" style={{ minWidth: '12rem' }} sortable body={statusBodyTemplate} filterElement={statusRowFilterTemplate}></Column>
          <Column header="Actions" body={actionTemplate} style={{ textAlign: 'center', width: '10rem' }} />
          

        </DataTable>
      </div>
      <ToastContainer />
    </main>
  );
}
