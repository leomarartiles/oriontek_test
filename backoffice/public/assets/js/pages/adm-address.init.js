

$(document).ready(function() {
    var dataTable;
    getAppFieldsDT().then(function(uiFieldCompanies){
    // State Saving Datatable
        dataTable= $('#dtAddress').DataTable({
            'processing': true,
            'serverSide': true,
            'serverMethod': 'post',
            //'searching': false, // Remove default Search Control
            'ajax': {
            // 'url': URLAPI+'/companies/list/',
            "dataType": "json",
            "method": "POST",
            'url': '/address/list/',
            'data': function (data) {
                data['filter_client'] = $("#filter_client").val(); 
            }
            },
            "language":SetdataTableLanguage,
            "aaSorting": [],
            'columns': [
            
            //   { data: 'image' },
            { data: 'id_reg' },
            { data: 'id_client' },
            { data: 'address' },
            { data: 'city' },
            { data: 'country' },
            { data: 'status' },
            
            { data: 'date_created' },
            { data: '_id' },
            ],
            "columnDefs": [{
            "targets": 0,
            "orderable": false
            },
            {
            "targets": 1,
            "orderable": false
            }
        ],
            "rowCallback": function (row, data, iDisplayIndex) {
            var info = dataTable.page.info();
            var page = info.page;
            var length = info.length;
            var index = (page * length + (iDisplayIndex + 1));
            
            // FormAppHelper.selectCompany(data.id_company).then(function(uidGroups){
            //     $('td:eq(3)', row).html(uidGroups);
            // });
            $('td:eq(5)', row).html(FormAppHelper.getStatus(data.status));
            // $('td:eq(1)', row).html(FormAppHelper.selectClient(data.id_client));
            FormAppHelper.selectClient(data.id_client).then(function(uidGroups){
                $('td:eq(1)', row).html(uidGroups);
            });
            $('td:eq(7)', row).html(` <a href="javascript:void(0);" class="me-3 text-primary btn-open-record" data-bs-container="#tooltip-container3" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar" data-id="${data.id_reg}"><i class="mdi mdi-pencil font-size-18"></i></a>
            <a href="javascript:void(0);" class="text-danger" data-bs-container="#tooltip-container3" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="mdi mdi-trash-can font-size-18"></i></a>`);
            }

            
        });

        builFormInput(formCompaniesInput.formFieldsCompanies).then(function(uiFieldCompanies){
            $("#companies-general").html(uiFieldCompanies);
            FormAppHelper.fillClientsList("#form-add-company #id_client","").then(function(uiUNits){
                FormAppHelper.fillClientsList("#filter_client","").then(function(uiUNits){
        
                });
            });
          
          });
    });

  
  var groupFieldCompanies = function(){
    this.formFieldsCompanies=[
        {
            field_label: 'id',
            field_placeholder: 'id',
            field_type: 'hidden',
            field_id: 'id',
            name: 'id',
            customClass:'col-md-4',
            field_value:""
        },
        {
            field_label: 'id_reg',
            field_placeholder: 'id_reg',
            field_type: 'hidden',
            field_id: 'id_reg',
            name: 'id_reg',
            customClass:'col-md-4',
            field_value:""
        },
        {
          field_id:"id_client",
            field_type:"select",
            field_placeholder:"Cliente",
            field_label:"Cliente",
            field_class:"",
            field_row:"row mb-3",
            field_is_required:true,
            // field_validation:` data-parsley-min="6" `,
            field_value:"",
            field_options:[]
        },
            
        {
            field_id:"address",
            field_type:"text",
            field_placeholder:"Direccion",
            field_label:"Direccion",
            field_class:"",
            field_row:"row mb-3",
            field_is_required:true,
            // field_validation:` data-parsley-min="6" `,
            field_value:""
        },
        {
            field_id:"city",
            field_type:"text",
            field_placeholder:"Cuidad",
            field_label:"Cuidad",
            field_class:"",
            field_row:"row mb-3",
            field_is_required:true,
            // field_validation:` data-parsley-min="6" `,
            field_value:""
        },
        {
            field_id:"country",
            field_type:"text",
            field_placeholder:"Pais",
            field_label:"Pais",
            field_class:"",
            field_row:"row mb-3",
            field_is_required:true,
            // field_validation:` data-parsley-min="6" `,
            field_value:""
        },
    
    ];

    
  }

  let formFieldEdit,formFieldDataEdit;
  let formCompaniesInput = new groupFieldCompanies();
  let formCompaniesAddValidation;
  let formCompaniesEditValidation;
  
//   builFormInput(formCompaniesInput.formFieldsCompanies).then(function(uiFieldCompanies){
//     $("#companies-general").html(uiFieldCompanies);
//     FormAppHelper.fillClientsList("#form-add-company #id_client","").then(function(uiUNits){

//     });
  
//   });
  var formSubmitPOST=function(formData){
    var settings = {
        "url": '/address/create',
        "method": "POST",
        "timeout": 0,
        "headers": { "Content-Type": "application/json" },
        "data": JSON.stringify(formData),
    };
    
    $.ajax(settings).done(function (response) {
        if (response) {
          if(response.status =='ok'){
            dataTable.ajax.reload(null, false); 
            $("#modalCreateCompany").modal('hide');
            toastr["success"](`Se ha agregado un nuevo registro satisfactoriamente!`);
          }else{
            toastr["error"](`Error: comunicacion con el servidor!`);
          }
        }
    });
  }
  var submitCreateCompany=function(){
    let data =getFormData('form-add-company');
    Swal.fire({
        title: "¿Estas seguro?",
        text: "Si deseas aplicar los cambios, presione [Si, continuar]!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, continuar",
        cancelButtonText: "Cancelar!",
        confirmButtonClass: "btn btn-success mt-2",
        cancelButtonClass: "btn btn-danger ml-2 mt-2",
    }).then((result) => {
        if (result.value) {
          // console.log(data);
          formSubmitPOST(data);
        } 
    });
  }
  $(document).on('submit','#form-add-company',function(e){
    e.preventDefault(); //=== To Avoid Page Refresh and Fire the Event "Click"===
    if ( $(this).parsley().isValid() ) {
      submitCreateCompany();
    }
  });

  $(document).on('click','.btn-open-record',function(){
    let getRecordId= $(this).attr('data-id');
    formOpenRecord(getRecordId);
  });
  
  $(document).on('change','#filter_client',function(){
    dataTable.ajax.reload(null, false); 
  });
  
  var formOpenRecord=function(recordID){
    var settings = {
      "url": '/address',
      "method": "POST",
      "timeout": 0,
      "headers": { "Content-Type": "application/json" },
      "data": JSON.stringify({ "record_id": recordID }),
    };
    
    $.ajax(settings).done(function (response) {
        if (response) {
          formFieldDataEdit=response.data;
          formFillWithData(response.data);
        }
    });
  }

  var formFillWithData=function(thisFormData){
    formFieldEdit = new groupFieldCompanies();
    
    builFormInput(formFieldEdit.formFieldsCompanies,thisFormData).then(function(uiFieldCompanies){
      $("#edit-companies-general").html(uiFieldCompanies);
    
        FormAppHelper.fillClientsList("#form-edit-company #id_client",thisFormData.id_client).then(function(uidGroups){
            formCompaniesEditValidation= $('#form-edit-company').parsley();
            $('#modalEditCompany').modal('show');
        
        });
    });
  }
  

  $(document).on('submit','#form-edit-company',function(e){
    e.preventDefault(); //=== To Avoid Page Refresh and Fire the Event "Click"===
    if ( $(this).parsley().isValid() ) {
      submitUpdateForm();
    }
  });

  var formSubmitUpdatePOST=function(formData){
    var settings = {
        "url": '/address/update',
        "method": "POST",
        "timeout": 0,
        "headers": { "Content-Type": "application/json" },
        "data": JSON.stringify(formData),
        };
    
    $.ajax(settings).done(function (response) {
        if (response) {
            dataTable.ajax.reload(null, false); 
            $("#modalEditCompany").modal('hide');
        }
    });
  }
  var submitUpdateForm=function(){
    // var data =$("#form-add-vehicle").serialize();
    let data =getFormData('form-edit-company');
    Swal.fire({
        title: "¿Estas seguro?",
        text: "Si deseas aplicar los cambios, presione [Si, continuar]!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, continuar",
        cancelButtonText: "Cancelar!",
        confirmButtonClass: "btn btn-success mt-2",
        cancelButtonClass: "btn btn-danger ml-2 mt-2",
    }).then((result) => {
        if (result.value) {
          formSubmitUpdatePOST(data);
        } 
    });
  }
});