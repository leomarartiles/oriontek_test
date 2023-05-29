/*
Template Name: Nazox -  Admin & Dashboard Template
Author: Themesdesign
Contact: themesdesign.in@gmail.com
File: Datatables Js File
*/

$(document).ready(function() {

    // State Saving Datatable
   var dataTable= $('#dtGroups').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'get',
        //'searching': false, // Remove default Search Control
        'ajax': {
          'url': URLAPI+'/groups/list/',
          'data': function (data) {
            // Read values
            // var title = $('#title').val();
            // var listWebsiteId = $('#listWebsite').val();
            // var score = $('#score').val();
            // var scoreQuery = $('#scoreQuery').val();
            // // Append to data
            // data.searchByTitle = title;
            // data.listWebsiteId = listWebsiteId;
            // data.score=score;
            // data.scoreQuery=scoreQuery;
          }
        },
        "language":SetdataTableLanguage,
        "aaSorting": [],
        'columns': [
          { data: 'stt' },
        //   { data: 'image' },
          { data: 'id_reg' },
          { data: 'parent_id' },
          { data: 'name' },
          { data: 'short_name' },
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
          var info = dataTable.page.info();
          var page = info.page;
          var length = info.length;
          var index = (page * length + (iDisplayIndex + 1));
          $('td:eq(0)', row).html(index);
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

    var formFieldsGroupsDT = function(){ 
        this.formFieldsGroups=[
          {
              field_id:"parent_id",
              field_type:"select",
              field_placeholder:"Empresa",
              field_label:"Empresa",
              field_class:"",
              field_row:"row mb-3",
              field_options:app_fields_data.companies,
              field_value:""
          },
          
          {
              field_id:"name",
              field_type:"text",
              field_placeholder:"Nombre del Grupo",
              field_label:"Nombre",
              field_class:"",
              field_row:"row mb-3",
              field_value:""
          },
          {
              field_id:"short_name",
              field_type:"text",
              field_placeholder:"Alias del grupo",
              field_label:"Alias",
              field_class:"",
              field_row:"row mb-3",
              field_value:""
          },
          {
            field_type: 'select',
            field_label: 'Estatus',
            field_placeholder: 'Estatus',
            field_id: 'status',
            name: 'status',
            customClass:'col-md-2',
            field_options: [{value:1,text:'Activo'},{value:0,text:'Inactivo'}],
            field_value:""
        },

      ];
      this.formFieldsGroupsSettings=[
        
        {
            field_id:"group_ralenti",
            field_type:"text",
            field_placeholder:"Ralentti",
            field_label:"Ralentti",
            field_class:"",
            field_row:"row mb-3",
            field_value:""
        },
        {
          field_id:"group_ralenti",
          field_type:"text",
          field_placeholder:"Limit. Velocidad",
          field_label:"Limit. Velocidad",
          field_class:"",
          field_row:"row mb-3",
          field_value:""
        },
        {
          field_id:"group_ralenti",
          field_type:"text",
          field_placeholder:"Geocerca (Aparcar)",
          field_label:"Geocerca (Aparcar)",
          field_class:"",
          field_row:"row mb-3",
          field_value:""
        },
      ]
    }
    let formFieldEdit,formFieldDataEdit,formFieldsEditValidation;
    // formFieldsGroups[0].field_options=app_fields_data.companies;
    
    bsCustomFileInput.init()

    var formSubmitPOST=function(formData){
        var settings = {
            "url": '/group/create',
            "method": "POST",
            "timeout": 0,
            "headers": { "Content-Type": "application/json" },
            "data": JSON.stringify(formData),
            };
        
        $.ajax(settings).done(function (response) {
            if (response) {
                dataTable.ajax.reload(null, false); 
                $("#modalCreateGroup").modal('hide');
            }
        });
    }

    var submitCreateGroup=function(){
        let data =getFormData('form-add-group');
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
                formSubmitPOST(data);
            } 
        });
    }
    var formFillWithData=function(thisFormData){
      formFieldEdit = new formFieldsGroupsDT();
      
      builFormInput(formFieldEdit.formFieldsGroups,thisFormData).then(function(uiFieldCompanies){
        $("#edit-groups-general").html(uiFieldCompanies);
        builFormInput(formFieldEdit.formFieldsGroupsSettings,thisFormData).then(function(uiFormFieldsSettings){
          $("#edit-groups-maintenance").html(uiFormFieldsSettings);
          formFieldsEditValidation= $('#form-edit-group').parsley();
          $('#modalEditGroup').modal('show');
        });
          
      });
    }
    var formOpenRecord=function(recordID){
      var settings = {
          "url": '/group',
          "method": "POST",
          "timeout": 0,
          "headers": { "Content-Type": "application/json" },
          // "data": 'vehicle_id='+recordID,
          "data": JSON.stringify({ "record_id": recordID }),
          };
      
      $.ajax(settings).done(function (response) {
          if (response) {
            formFieldDataEdit=response.data;
            formFillWithData(response.data);
          }
      });
    }
    
    $(document).on('click','.btn-create-group',function(){ submitCreateGroup(); });

    $(document).on('click','.btn-open-record',function(){
      let getRecordId= $(this).attr('data-id');
      formOpenRecord(getRecordId);
    });

    let formFieldsAdd= new formFieldsGroupsDT();
    builFormInput(formFieldsAdd.formFieldsGroups).then(function(uiFormFields){
      $("#groups-general").html(uiFormFields);
      builFormInput(formFieldsAdd.formFieldsGroupsSettings).then(function(uiFormFieldSettings){
          $("#groups-maintenance").html(uiFormFieldSettings);
      });
    });
});