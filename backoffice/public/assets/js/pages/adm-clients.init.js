/*
Template Name: Nazox -  Admin & Dashboard Template
Author: Themesdesign
Contact: themesdesign.in@gmail.com
File: Datatables Js File
*/

$(document).ready(function() {

    // State Saving Datatable
   var dataTable= $('#dtClients').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        //'searching': false, // Remove default Search Control
        'ajax': {
          // 'url': URLAPI+'/companies/list/',
          "dataType": "json",
          "method": "POST",
          'url': '/customers/list/',
          'data': function (data) {
            console.log(data);
          }
        },
        "language":SetdataTableLanguage,
        "aaSorting": [],
        'columns': [
         
        //   { data: 'image' },
          { data: 'id_reg' },
          { data: 'client_name' },
          { data: 'client_description' },
          { data: 'id_company' },
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
        
        FormAppHelper.selectCompany(data.id_company).then(function(uidGroups){
            $('td:eq(3)', row).html(uidGroups);
        });
        $('td:eq(4)', row).html(FormAppHelper.getStatus(data.status));
          $('td:eq(6)', row).html(` <a href="javascript:void(0);" class="me-3 text-primary btn-open-record" data-bs-container="#tooltip-container3" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar" data-id="${data.id_reg}"><i class="mdi mdi-pencil font-size-18"></i></a>
        <a href="javascript:void(0);" class="text-danger" data-bs-container="#tooltip-container3" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="mdi mdi-trash-can font-size-18"></i></a>`);
        }

        // stateSave: true,
        // "language": {
        //     "paginate": {
        //         "previous": "<i class='mdi mdi-chevron-left'>",
        //         "next": "<i class='mdi mdi-chevron-right'>"
        //     }
        // },
        // "drawCallback": function () {
        //     $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
        //     $(".dataTables_length select").addClass('form-select form-select-sm'); 
        // }
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
            field_id:"client_name",
            field_type:"text",
            field_placeholder:"Cliente",
            field_label:"Cliente",
            field_class:"",
            field_row:"row mb-3",
            field_is_required:true,
            // field_validation:` data-parsley-min="6" `,
            field_value:""
        },
        {
            field_id:"client_description",
            field_type:"text",
            field_placeholder:"Descripcion",
            field_label:"Descripcion",
            field_class:"",
            field_row:"row mb-3",
            field_is_required:true,
            // field_validation:` data-parsley-min="6" `,
            field_value:""
        },
        {
          field_id:"id_company",
          field_type:"select",
          field_placeholder:"Empresa",
          field_label:"Empresa",
          field_class:"",
          field_row:"row mb-3",
          field_is_required:true,
          // field_validation:` data-parsley-min="6" `,
          field_value:"",
          field_options:[
            {value:'DO',text:'Republica Dominicana'},
            {value:'PR',text:'Puerto Rico'},
            {value:'CO',text:'Rep. de Colombia'},
          ]
      },
    //   {
    //     field_id:"address",
    //     field_type:"textarea",
    //     field_placeholder:"Direccion",
    //     field_label:"Direccion",
    //     field_class:"",
    //     field_row:"row mb-3",
    //     field_value:""
    //   },
    //   {
    //     field_id:"phone",
    //     field_type:"tel",
    //     field_placeholder:"Telefono",
    //     field_label:"Telefono",
    //     field_class:"",
    //     field_row:"row mb-3",
    //     field_is_required:true,
    //     // field_validation:` data-parsley-type="number" `,
    //     field_value:""
    //   },
      
    //   {
    //     field_id:"email",
    //     field_type:"email",
    //     field_placeholder:"Email",
    //     field_label:"Email",
    //     field_class:"",
    //     field_is_required:true,
    //     field_validation:` data-parsley-type="email" `,
    //     field_row:"row mb-3",
    //     field_value:""
    //   },
    ];

    this.formFieldsContact=[
      {
          field_id:"contact_name",
          field_type:"text",
          field_placeholder:"Nombre",
          field_label:"Nombre",
          field_class:"",
          field_row:"row mb-3",
          field_is_required:true,
          // field_validation:` data-parsley-min="4" `,
          field_value:""
      },
      {
        field_id:"contact_lastname",
        field_type:"text",
        field_placeholder:"Apellidos",
        field_label:"Apellidos",
        field_class:"",
        field_is_required:true,
        // field_validation:` data-parsley-min="4" `,
        field_row:"row mb-3",
        field_value:""
      },
      {
        field_id:"contact_phone",
        field_type:"tel",
        field_placeholder:"Telefono",
        field_label:"Telefono",
        field_class:"",
        field_row:"row mb-3",
        field_is_required:true,
        // field_validation:` data-parsley-type="number" `,
        field_value:""
      },
      
      {
        field_id:"contact_email",
        field_type:"email",
        field_placeholder:"Email",
        field_label:"Email",
        field_class:"",
        field_row:"row mb-3",
        field_is_required:true,
        field_validation:` data-parsley-type="email" `,
        field_value:""
      },
    ];

    this.formFieldsModules=[
      {
        field_id:"divv",
        field_type:"section",
        field_placeholder:"Mapas",
        field_label:"Modulos",
        field_class:"",
        field_row:"row mb-3",
        field_value:1
      },
      {
          field_id:"monitoring",
          field_type:"checkbox",
          field_placeholder:"Monitoreo",
          field_label:"Monitoreo",
          field_class:"",
          field_row:"row mb-3",
          field_value:1
      },
      {
        field_id:"alerts",
        field_type:"checkbox",
        field_placeholder:"Alertas",
        field_label:"Alertas",
        field_class:"",
        field_row:"row mb-3",
        field_value:1
      },
      {
        field_id:"geofences",
        field_type:"checkbox",
        field_placeholder:"Geocercas",
        field_label:"Geocercas",
        field_class:"",
        field_row:"row mb-3",
        field_value:1
      },
      {
        field_id:"routes",
        field_type:"checkbox",
        field_placeholder:"Carta de Rutas",
        field_label:"Carta de Rutas",
        field_class:"",
        field_row:"row mb-3",
        field_value:1
      },
      // {
      //   field_id:"routes",
      //   field_type:"radiobox",
      //   field_label:"Carta de Rutas",
      //   field_class:"",
      //   field_row:"row mb-3",
      //   field_value:"",
      //   field_options:[
      //       {value:'1',text:'Basica'},
      //       {value:'2',text:'Extendida con AX'},
      //   ]
      // },
      {
        field_id:"app_movil",
        field_type:"checkbox",
        field_placeholder:"App (acceso)",
        field_label:"App Movil(acceso)",
        field_class:"",
        field_row:"row mb-3",
        field_value:1
      },
      {
        field_id:"divv",
        field_type:"section",
        field_placeholder:"Mapas",
        field_label:"Mapas",
        field_class:"",
        field_row:"row mb-3",
        field_value:""
      },
      {
        field_id:"map_base",
        field_type:"checkbox",
        field_placeholder:"mpa 1",
        field_label:"Base",
        field_class:"",
        field_row:"row mb-3",
        field_value:""
      },
      {
        field_id:"map_google",
        field_type:"checkbox",
        field_placeholder:"Monitoreo",
        field_label:"Google",
        field_class:"",
        field_row:"row mb-3",
        field_value:""
      },
      {
        field_id:"map_open_street",
        field_type:"checkbox",
        field_placeholder:"Open Street Map",
        field_label:"Open Street Map",
        field_class:"",
        field_row:"row mb-3",
        field_value:""
      },
    ];
  }

  let formFieldEdit,formFieldDataEdit;
  let formCompaniesInput = new groupFieldCompanies();
  let formCompaniesAddValidation;
  let formCompaniesEditValidation;
  // $("#companies-general").html(builFormInput(formFieldsCompanies));
  // $("#companies-contact").html(builFormInput(formFieldsContact));
  // $("#companies-modules").html(builFormInput(formFieldsModules));
  builFormInput(formCompaniesInput.formFieldsCompanies).then(function(uiFieldCompanies){
    $("#companies-general").html(uiFieldCompanies);
    // builFormInput(formCompaniesInput.formFieldsContact).then(function(uiFieldContact){
    //   $("#companies-contact").html(uiFieldContact);
    //   builFormInput(formCompaniesInput.formFieldsModules).then(function(uiFieldModules){
    //     $("#companies-modules").html(uiFieldModules);
    //     formCompaniesAddValidation= $('#form-add-company').parsley();
    //   });
    // });
  });
  var formSubmitPOST=function(formData){
    var settings = {
        "url": '/customers/create',
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
  
  var formOpenRecord=function(recordID){
    var settings = {
      "url": '/customers',
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
    //   builFormInput(formCompaniesInput.formFieldsContact,thisFormData).then(function(uiFieldContact){
    //     $("#edit-companies-contact").html(uiFieldContact);
    //     builFormInput(formCompaniesInput.formFieldsModules,thisFormData).then(function(uiFieldModules){
    //       $("#edit-companies-modules").html(uiFieldModules);
    FormAppHelper.fillCompaniesList("#form-edit-company #id_company",thisFormData.id_company).then(function(uidGroups){
          formCompaniesEditValidation= $('#form-edit-company').parsley();
          $('#modalEditCompany').modal('show');
    
      });
    });
  }
  // bsCustomFileInput.init()

  $(document).on('submit','#form-edit-company',function(e){
    e.preventDefault(); //=== To Avoid Page Refresh and Fire the Event "Click"===
    if ( $(this).parsley().isValid() ) {
      submitUpdateForm();
    }
  });

  var formSubmitUpdatePOST=function(formData){
    var settings = {
        "url": '/customers/update',
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