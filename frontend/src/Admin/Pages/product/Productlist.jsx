
import React, { useState, useEffect,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import "../Create_user/create_user.css"
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
// import 'primeflex/primeflex.css';                                   // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css'; 
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { ToastContainer, toast } from "react-toastify";
// import { ProductService } from './service/ProductService';
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { Link } from 'react-router-dom';
export default function ManageProduct({ setIsActive, isActive }) {
    const [product, setProduct] = useState([]);
    const dt = useRef(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);
    

  const exportColumns = product.map((product) => ({ title: product.header, dataKey: product.field }));


// =============customer api===========
    useEffect(() => {
     
      fetchData();
    }, []);

    // ========product get api=========
    const fetchData = async () => {
      try {
        const response = await apiServices.getallProduct();
        if (response.data.success) {
          console.log("response data",response)
            setProduct(response.data.data);
        } else {
         
        }
      } catch (error) {
       
      } finally {
        setLoading(false);
      }
    };


      // / -------------delete api--------
  const deleteproduct = (id) => {
    const data = { _id: id };
    apiServices.deleteProduct(data).then((response) => {
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


    // product change status api
    const changeStatus = (id, status) => {
      setLoading(true);
      const upstatus = status ? '0' : '1';
      const data = {
        _id: id,
        status: upstatus,
      };
      apiServices.updateProductStatus(data).then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          apiServices.getallProduct().then(updatedData => {
            if (updatedData.data.success) {
             
              setProduct(updatedData.data.data);
            }
          });
        } else {
          toast.error(response.data.message);
        }
        setLoading(false);
      }).catch((error) => {
        // console.error(error);
        toast.error('Something went wrong!! Try Again Later');
        setLoading(false);
      });
    };
   
// image body
    const imageBodyTemplate = (product) => {
        return <img src={BASE_URL_IMG + product?.Image} alt='product image'  className="rounded-circle table-image img-fluid" />;
    };
  

// status function start
    const statusItemTemplate = (option) => {
      return <Tag value={ option} severity={getSeverity(option)} />;
  };

    const statusBodyTemplate = (product) => {
      return <Tag value={ product?.status ? 'active' : 'in-active'} severity={getSeverity(product)}></Tag>;
  };


// status fiter function
const [statuses] = useState(['active' , 'in-active']);
  const statusRowFilterTemplate = (options) => {
    return (
        <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
    );
};


    const getSeverity = (product) => {
      switch (product?.status? 'Active' : 'In-active' ) {
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

//pdf export function 
const exportPdf = () => {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then(() => {
            const doc = new jsPDF.default(0, 0);

            doc.autoTable(exportColumns, product);
            doc.save('product.pdf');
        });
    });
};


// exel export function 
const exportExcel = () => {
    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(product);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });

        saveAsExcelFile(excelBuffer, 'product');
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
  productname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  price: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  countInStock: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
        <Link to={`/admin/update-product/${rowData?._id}`}>
        <Button
          icon="pi pi-pencil"
          className="rounded-circle p-button-success p-mr-2"
          tooltip="Edit"
        />
        </Link>
        <Button
          icon="pi pi-trash"
          className="rounded-circle p-button-danger p-mr-2"
          onClick={() => deleteproduct(rowData)}
          tooltip="Delete"
        />
        <Button
          icon="pi pi-trash"
          className={`rounded-circle ${rowData?.status ? 'p-button-success' : 'p-button-warning'}`}
          onClick={() => changeStatus(rowData._id, rowData.status)}
          tooltip={rowData?.status ? 'Deactivate' : 'Activate'}
        />
      </div>
    );
  };
    // ... (action button end)

// ============header start===========
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
        <Button type="button" icon="pi pi-file-pdf" severity="warning" className='rounded-circle' onClick={exportPdf} data-pr-tooltip="PDF" />
                </div>
                
            </div>

  </>
  
);
// ===========header end==================
    
// =============footer start=================
    const footer = `In total there are ${product ? product.length : 0} Product.`;
// =============footer end=================
    return (
      <main id="main" className={`main mainWrapper ${isActive === true && 'active'}`}>
          <Tooltip target=".export-buttons>button" position="bottom" />
        <div className="card">
            <DataTable ref={dt} stripedRows   value={product} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}   sortMode="multiple" sortOrder={-1} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}
            dataKey="id" filters={filters} filterDisplay="row" loading={loading}
            globalFilterFields={['productname', 'description', 'price', 'product?.status', 'countInStock']}  emptyMessage="No Product found.">
                <Column field="productname" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }}  sortable header="Product Name"></Column>
                <Column field="Image"  header="Image" style={{ minWidth: '12rem' }} body={imageBodyTemplate}></Column>
                <Column field="price" filter filterPlaceholder="Search by email" style={{ minWidth: '12rem' }} sortable header="Price" ></Column>
                <Column field="countInStock" filter filterPlaceholder="Search by contact" style={{ minWidth: '12rem' }} sortable header="CountInStock"></Column>
                <Column field="description" filter filterPlaceholder="Search by address" style={{ minWidth: '70rem' }} sortable header="Description"></Column>
                {/* <Column field="userId" header="User ID"></Column> */}
                <Column header="Status" showFilterMenu={false} filter filterPlaceholder="Search by status" style={{ minWidth: '12rem' }} sortable body={statusBodyTemplate}  filterElement={statusRowFilterTemplate}></Column>
                <Column header="Actions" body={actionTemplate} style={{ textAlign: 'center', width: '10rem' }} />
            </DataTable>
        </div>
        <ToastContainer/>
        </main>
    );
}
        