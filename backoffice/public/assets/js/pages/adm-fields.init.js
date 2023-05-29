/*
Template Name: Nazox -  Admin & Dashboard Template
Author: Themesdesign
Contact: themesdesign.in@gmail.com
File: Datatables Js File
*/

$(document).ready(function() {

    // State Saving Datatable
   var dtVehicleType= $('#dtVehicleType').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'get',
        //'searching': false, // Remove default Search Control
        'ajax': {
          'url': URLAPI+'/backoffice/vehicletype/list/',
          'data': function (data) {
          }
        },
        "language":SetdataTableLanguage,
        "aaSorting": [],
        'columns': [
          { data: 'stt' },
        //   { data: 'image' },
          { data: 'unique_id' },
          { data: 'name' },
        //   { data: 'short_name' },
          { data: 'status' },
        //   { data: 'date_created' },
          { data: 'opt' },
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
          var info = dtVehicleType.page.info();
          var page = info.page;
          var length = info.length;
          var index = (page * length + (iDisplayIndex + 1));
          $('td:eq(0)', row).html(index);
          $('td:eq(4)', row).html(` <a href="javascript:void(0);" class="me-3 text-primary" data-bs-container="#tooltip-container3" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="mdi mdi-pencil font-size-18"></i></a>
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
   
    var dtRegions= $('#dtRegions').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'get',
        //'searching': false, // Remove default Search Control
        'ajax': {
          'url': URLAPI+'/backoffice/regions/list/',
          'data': function (data) {
          }
        },
        "language":SetdataTableLanguage,
        "aaSorting": [],
        'columns': [
          { data: 'stt' },
        //   { data: 'image' },
          { data: 'unique_id' },
          { data: 'name' },
        //   { data: 'short_name' },
          { data: 'status' },
        //   { data: 'date_created' },
          { data: 'opt' },
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
          var info = dtRegions.page.info();
          var page = info.page;
          var length = info.length;
          var index = (page * length + (iDisplayIndex + 1));
          $('td:eq(0)', row).html(index);
          $('td:eq(4)', row).html(` <a href="javascript:void(0);" class="me-3 text-primary" data-bs-container="#tooltip-container3" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="mdi mdi-pencil font-size-18"></i></a>
          <a href="javascript:void(0);" class="text-danger" data-bs-container="#tooltip-container3" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="mdi mdi-trash-can font-size-18"></i></a>`);
        }
    });
    var dtDepartments= $('#dtDepartments').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'get',
        //'searching': false, // Remove default Search Control
        'ajax': {
          'url': URLAPI+'/backoffice/departments/list/',
          'data': function (data) {
          }
        },
        "language":SetdataTableLanguage,
        "aaSorting": [],
        'columns': [
          { data: 'stt' },
        //   { data: 'image' },
          { data: 'unique_id' },
          { data: 'name' },
        //   { data: 'short_name' },
          { data: 'status' },
        //   { data: 'date_created' },
          { data: 'opt' },
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
          var info = dtDepartments.page.info();
          var page = info.page;
          var length = info.length;
          var index = (page * length + (iDisplayIndex + 1));
          $('td:eq(0)', row).html(index);
          $('td:eq(4)', row).html(` <a href="javascript:void(0);" class="me-3 text-primary" data-bs-container="#tooltip-container3" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="mdi mdi-pencil font-size-18"></i></a>
          <a href="javascript:void(0);" class="text-danger" data-bs-container="#tooltip-container3" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="mdi mdi-trash-can font-size-18"></i></a>`);
        }
    });
    var dtSections= $('#dtSections').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'get',
        //'searching': false, // Remove default Search Control
        'ajax': {
          'url': URLAPI+'/backoffice/sections/list/',
          'data': function (data) {
          }
        },
        "language":SetdataTableLanguage,
        "aaSorting": [],
        'columns': [
          { data: 'stt' },
          { data: 'unique_id' },
          { data: 'parent_name' },
          { data: 'name' },
          { data: 'status' },
          { data: 'opt' },
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
          var info = dtSections.page.info();
          var page = info.page;
          var length = info.length;
          var index = (page * length + (iDisplayIndex + 1));
          $('td:eq(0)', row).html(index);
          $('td:eq(5)', row).html(` <a href="javascript:void(0);" class="me-3 text-primary" data-bs-container="#tooltip-container3" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="mdi mdi-pencil font-size-18"></i></a>
          <a href="javascript:void(0);" class="text-danger" data-bs-container="#tooltip-container3" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="mdi mdi-trash-can font-size-18"></i></a>`);
        }
    });

    // let formFieldsGroups=[
    //     {
    //         field_id:"parent_id",
    //         field_type:"select",
    //         field_placeholder:"Empresa",
    //         field_label:"Empresa",
    //         field_class:"",
    //         field_row:"row mb-3",
    //         field_options:[],
    //         field_value:""
    //     },
        
    //     {
    //         field_id:"name",
    //         field_type:"text",
    //         field_placeholder:"Nombre del Grupo",
    //         field_label:"Nombre",
    //         field_class:"",
    //         field_row:"row mb-3",
    //         field_value:""
    //     },
    //     {
    //         field_id:"short_name",
    //         field_type:"text",
    //         field_placeholder:"Alias del grupo",
    //         field_label:"Alias",
    //         field_class:"",
    //         field_row:"row mb-3",
    //         field_value:""
    //     },

    // ];

    // formFieldsGroups[0].field_options=app_fields_data.companies;
    // // $("#groups-general").html(builFormInput(formFieldsGroups));
    // builFormInput(formFieldsGroups).then(function(uiFormFields){
    //     $("#groups-general").html(uiFormFields);
    // });
    // bsCustomFileInput.init()

    // var formSubmitPOST=function(formData){
    //     var settings = {
    //         "url": '/app-new-group',
    //         "method": "POST",
    //         "timeout": 0,
    //         "headers": { "Content-Type": "application/json" },
    //         "data": JSON.stringify(formData),
    //         // "data": JSON.stringify({ "department_id": getInputType }),
    //         };
        
    //     $.ajax(settings).done(function (response) {
    //         if (response) {
                
    //             dataTable.ajax.reload(null, false); 
    //             $("#modalCreateGroup").modal('hide');
    //         }
    //     });
    // }

    // var submitCreateGroup=function(){
    //     let data =getFormData('form-add-group');
    //     Swal.fire({
    //         title: "¿Estas seguro?",
    //         text: "Si deseas aplicar los cambios, presione [Si, continuar]!",
    //         type: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: "Si, continuar",
    //         cancelButtonText: "Cancelar!",
    //         confirmButtonClass: "btn btn-success mt-2",
    //         cancelButtonClass: "btn btn-danger ml-2 mt-2",
    //     }).then((result) => {
    //         if (result.value) {
    //             console.log('ddd',data);
    //             formSubmitPOST(data);
    //         } 
    //     });
    // }
    // $(document).on('click','.btn-create-group',function(){ submitCreateGroup(); });

});