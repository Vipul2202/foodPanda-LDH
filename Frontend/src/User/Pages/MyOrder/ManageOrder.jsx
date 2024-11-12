
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
// import "../Create_user/create_user.css"
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
// import 'primeflex/primeflex.css';                                   // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { InputText } from 'primereact/inputtext';
import { ToastContainer, toast } from "react-toastify";
import { Toast } from 'primereact/toast';
// import { ProductService } from './service/ProductService';
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { Link } from 'react-router-dom';
export default function ManageMyOrder({ setIsActive, isActive }) {
    const [order, setOrder] = useState([]);
    const dt = useRef(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const [id, setId] = useState(sessionStorage.getItem("_id"));
    const exportColumns = order.map((order) => ({ title: order.header, dataKey: order.field }));



    //   ========expend colleps==========
    const onRowExpand = (event) => {
        toast.current.show({ severity: 'info', summary: 'order Expanded', detail: event.data.name, life: 3000 });
    };

    const onRowCollapse = (event) => {
        toast.current.show({ severity: 'success', summary: 'order Collapsed', detail: event.data.name, life: 3000 });
    };

    // =============order api===========
    useEffect(() => {
        setId(sessionStorage.getItem("_id"));
       
        fetchData();
    }, []);

    // ========order get api=========
    const fetchData = async () => {
        try {
            const response = await apiServices.getAllOrders({userId: id});
            if (response.data.success) {
                console.log("response data", response)
                setOrder(response.data.data);
            } else {

            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };


  

 // -------------change Status api--------
 const changeStatus = (id, status) => {
    setLoading(true);
    const upstatus = status ? '0' : '1';
    const data = {
      _id: id ,
      status: upstatus,
    };
   
    apiServices.updateorderStatus(data).then((response) => {
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


   
    // image
    const imageBodyTemplate = (order) => {
        return <img src={BASE_URL_IMG + order?.productId?.Image} alt={order.image} className="rounded-circle table-image img-fluid" />;
    };

    
    // user contact
    const usercontactBodyTemplate = (order) => {
        return (order.userId?.contact);
    };
    const TotalBodyTemplate = (order) => {
        return (order.productId?.price)*(order.quantity);
    };
    // user name
    const usernameBodyTemplate = (order) => {
        return (order.userId?.name);
    };
   




    // export function 
    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    //pdf export function 
    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(exportColumns, order);
                doc.save('order.pdf');
            });
        });
    };


    // exel export function 
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(order);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'order');
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
        "user?.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "user._id": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        rating: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "product?.productname": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "product._id": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    // =============global filter end==========

    // ... (action button start)

    const actionTemplate = (rowData) => {
        return (
            <div className="d-flex justify-content-center gap-3">
                <Link to={`/order-track/${rowData?._id}`}>
                    <Button
                        icon="pi pi-eye"
                        className="rounded-circle p-button-light p-mr-2"
                        tooltip="Track order"
                    />
                </Link>
                <Link to={`/user/update-user-order/${rowData?._id}`}>
                    <Button
                        icon="pi pi-pencil"
                        className="rounded-circle p-button-success p-mr-2"
                        tooltip="Edit"
                    />
                </Link>
                
                <Button
        icon="pi pi-trash"
        className={`rounded-circle ${rowData.status ? 'p-button-success' : 'p-button-warning'}`}
        onClick={() => changeStatus(rowData._id, rowData.status)}
        tooltip="cancel order"
      />

            </div>
        );
    };
    // ... (action button end)


    // ======expendalble collums start/
    const allowExpansion = (rowData) => {
        return rowData.items.length > 0;
    };

   

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <h5>Items for {data.userId?.name}</h5>
                <DataTable value={data.items} className="p-datatable-sm"  >
                
                    <Column  field="productId.productname" header="Product Name" sortable filter filterPlaceholder="Search by name" ></Column>
                    <Column field="productId.Image" header="Image" body={imageBodyTemplate} ></Column>
                    <Column field="_id" header="Item Id" sortable></Column>
                    <Column field="quantity" header="Quantity" sortable></Column>
                    <Column field="productId.price" header="Price" sortable></Column>
                    <Column body={TotalBodyTemplate} header="TOtal" sortable></Column>
                   
                    
                </DataTable>
            </div>
        );
    };


  
    
    // ======expendalble collums end/
    // ============header start===========
    const header = (
        <>
            {/* <div className="flex flex-wrap justify-content-end gap-2">
            <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
            <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text />
        </div> */}
            <div className="">

                <div className='d-flex justify-content-end gap-3'>
                    <span className="p-input-icon-left ">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                    </span>
                    <Button type="button" icon="pi pi-file" className='rounded-circle' onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
                    <Button type="button" icon="pi pi-file-excel" severity="success" className='rounded-circle' onClick={exportExcel} data-pr-tooltip="XLS" />
                    <Button type="button" icon="pi pi-file-pdf" severity="warning" className='rounded-circle' onClick={exportPdf} data-pr-tooltip="PDF" />
                </div>

            </div>

        </>

    );
    // ===========header end==================

    // =============footer start=================
    const footer = `In total there are ${order ? order.length : 0} order.`;
    // =============footer end=================
    return (
        <main id="main" className={`main mainWrapper ${isActive === true && 'active'}`}>
            <Tooltip target=".export-buttons>button" position="bottom" />
            <div className="card">
                {/* Data Table Start */}
                <Toast ref={toast} />
                <DataTable ref={dt} stripedRows expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} rowExpansionTemplate={rowExpansionTemplate}  dataKey="id" value={order} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} sortMode="multiple" sortOrder={-1} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }} filters={filters} filterDisplay="row" loading={loading} globalFilterFields={['user.name', 'product?.productname', 'rating', 'order?.status', 'comment']} emptyMessage="No Product found.">
                {/* Data Table end */}
                <Column expander={allowExpansion} style={{ width: '5rem' }}  />
                {/* column start  */} 
                   
                    <Column sortable  header="User Name" body={usernameBodyTemplate} filterPlaceholder="Search by name" ></Column>

                    <Column sortable  header="Contact" body={usercontactBodyTemplate} filterPlaceholder="Search by contact" ></Column>

                    <Column field='billingAddress.country' sortable  header="Country"  ></Column>
                    <Column field='billingAddress.state' sortable  header="State"  ></Column>
                    <Column field='billingAddress.city' sortable  header="City"  ></Column>
                    <Column field='billingAddress.zip' sortable  header="Zip"  ></Column>
                    <Column field='billingAddress.street1' sortable  header="Address"  style={{ width: '16rem' }} ></Column>

                    <Column field='totalAmount' header="Total Amount"  style={{ textAlign: 'center', width: '10rem' }} />
                    
                    <Column field='paymentMethod' header="Payment Method" sortable  style={{ textAlign: 'center', width: '10rem' }} />
                    <Column field='paymentStatus' header="Payment Status" sortable  style={{ textAlign: 'center', width: '10rem' }} />
                    <Column field='orderStatus' header="Order Status" sortable  style={{ textAlign: 'center', width: '10rem' }} />
                    <Column header="Actions" body={actionTemplate} style={{ textAlign: 'center', width: '10rem' }} />
                   
                </DataTable>
            </div>
            <ToastContainer />
        </main>
    );
}
