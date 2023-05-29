/*
Template Name: Nazox -  Admin & Dashboard Template
Author: Themesdesign
Contact: themesdesign.in@gmail.com
File: Datatables Js File
*/

$(document).ready(function() {

  var groupFieldVehicle = function(){
    this.formfieldVehicle=[
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
        field_type: 'select',
        field_placeholder: 'Empresa',
        field_label: 'Empresa',
        field_id: 'company',
        name: 'company',
        customClass:'col-md-4',
        field_is_required:true,
        // field_validation:` data-parsley-min="4" `,
        field_options: app_fields_data.companies,
        field_value:""
    },
    {
      field_type: 'select',
      field_label: 'Grupo',
      field_placeholder: 'Grupo',
      field_id: 'group_id',
      name: 'group_id',
      field_is_required:true,
      field_is_multi:true,
      // field_validation:` data-parsley-min="2" `,
      customClass:'col-md-2',
      field_options: [],
      field_value:""
    },
    {
        field_label: 'Ficha',
        field_placeholder: 'Ficha',
        field_type: 'text',
        field_id: 'ficha',
        name: 'ficha',
        field_is_required:true,
        field_validation:` minlength="4" data-parsley-minlength="4" `,
        customClass:'col-md-4',
        field_value:""
    },
    {
        field_type: 'select',
        field_label: 'Tipo',
        field_placeholder: 'Tipo',
        field_id: 'type',
        name: 'type',
        customClass:'col-md-4',
        field_is_required:true,
        field_validation:` data-parsley-min="3" `,
        field_options:app_fields_data.vehicle_type,
        field_value:""
    },
    {
        field_type: 'text',
        field_label: 'Identificador',
        field_placeholder: 'Identificador',
        field_id: 'identity',
        name: 'identity',
        field_is_required:true,
        field_validation:` data-parsley-min="6" `,
        customClass:'col-md-4',
        field_value:""
    },
    {
        field_type: 'text',
        field_label: 'IMEI',
        field_placeholder: 'IMEI',
        field_id: 'imei',
        name: 'imei',
        customClass:'col-md-4',
        field_value:""
    },
    
    {
        field_type: 'select',
        field_label: 'Veh. TESTER',
        field_placeholder: 'Veh. TESTER',
        field_id: 'unit_test',
        name: 'unit_test',
        customClass:'col-md-2',
        field_options: [{value:1,text:'SI'},{value:0,text:'NO'}],
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
    {
        field_type: 'text',
        field_label: 'Marca',
        field_placeholder: 'Marca',
        field_id: 'brand',
        name: 'brand',

        customClass:'col-md-4',
        field_value:""
    },
    {
        field_type: 'text',
        field_label: 'Modelo',
        field_placeholder: 'Modelo',
        field_id: 'model',
        name: 'model',
        customClass:'col-md-2',
        field_value:""
    },
    {
        field_type: 'text',
        field_label: 'Color',
        field_placeholder: 'Color',
        field_id: 'color',
        name: 'color',
        customClass:'col-md-2',
        field_value:""
    },
    {
        field_type: 'text',
        field_label: 'Año',
        field_placeholder: 'Año',
        field_id: 'year',
        name: 'year',
        customClass:'col-md-2',
        field_value:""
    },
    {
        field_type: 'text',
        field_label: 'Placa',
        field_placeholder: 'Placa',
        field_id: 'plate',
        name: 'plate',
        field_is_required:true,
        // field_validation:` data-parsley-min="5" `,
        // field_validation:` data-parsley-type="number" `,
        customClass:'col-md-2'
    },
  
    {
        field_type: 'select',
        field_label: 'Departamento',
        field_id: 'departament',
        name: 'departament',
        customClass:'col-md-4',
        field_is_required:true,
        field_options: app_fields_data.departments_section,
        field_value:""
    },
    {
        field_type: 'select',
        field_label: 'Seccion',
        field_id: 'section',
        name: 'section',
        field_is_required:true,
        customClass:'col-md-4',
        field_options: [],
    },
    {
        field_type: 'select',
        field_label: 'Region',
        name: 'region',
        field_id: 'region',
        customClass:'col-md-4',
        field_is_required:true,
        field_options: app_fields_data.region,
        field_value:""
    }
    ];
  
    this.vehicleFormMaintenance=[
      {
        field_type: 'number',
        field_label: 'Odometro (Vehiculo)',
        name: 'odometro',
        field_id: 'odometro',
        customClass:'col-md-3',
        field_value:""
      },
      
      {
          field_type: 'number',
          field_label: 'Odometro (GPS)',
          name: 'odometro_gps',
          field_id: 'odometro_gps',
          customClass:'col-md-3',
          field_value:""
      },
      {
          field_type: 'number',
          field_label: 'Horometro (vehiculo)',
          // field_placeholder: 'Horometro (vehiculo)',
          name: 'horometro',
          field_id: 'horometro',
          customClass:'col-md-3',
          field_value:""
      },
      {
          field_type: 'number',
          field_label: 'Horometro (GPS)',
          // field_placeholder: 'Horometro (GPS)',
          name: 'horometro_gps',
          field_id: 'horometro_gps',
          customClass:'col-md-3',
          field_value:""
      },
      {
          field_type: 'select',
          field_label: 'Tipo de Combustible',
          field_placeholder: 'Tipo de Combustible',
          field_id: 'fuel_type',
          name: 'fuel_type',
          customClass:'col-md-3',
          // value:this.form_department_selected,
          field_options: app_fields_data.fuel_type,
          field_value:""
      },
      {
          field_type: 'text',
          field_label: 'Consumo (1gl/100KM)',
          field_is_required:true,
          field_validation:` data-parsley-type="number" `,
          name: 'consumption',
          field_id: 'consumption',
          customClass:'col-md-3',
          field_value:""
      },
      {
          field_type: 'text',
          field_label: 'Capacidad del tanque',
          field_is_required:true,
          field_validation:` data-parsley-type="number" `,
          name: 'capacity_tank',
          field_id: 'capacity_tank',
          customClass:'col-md-3',
          field_value:""
      },
      {
          field_type: 'text',
          field_label: 'Capacidad Carga(Max.)',
          field_is_required:true,
          field_validation:` data-parsley-type="number" `,
          name: 'capacity',
          field_id: 'capacity',
          customClass:'col-md-3',
          field_value:""
      },
    ];
  }
  var formFieldsFilterDT = function(){
    this.formFieldsFilter=[
        {
          field_type: 'select',
          field_placeholder: 'Empresa',
          field_label: 'Empresa',
          field_id: 'company',
          name: 'company',
          customClass:'col-md-4',
          field_is_required:true,
          // field_validation:` data-parsley-min="4" `,
          field_options: app_fields_data.companies,
          field_value:""
        },
    ]
  };

  let formFieldEdit,formFieldDataEdit;
  let formVehicleAddValidation;
  let formVehicleEditValidation;

  // let formFieldsFilterDTData= new formFieldsFilterDT();
  // builFormInput(formFieldsFilterDTData.formFieldsFilter).then(function(uiFormFields){
  //   $("#formFilterDT").html(uiFormFields);
  // });

  let openNewFormModal=function(){
    const formVehicleInput = new groupFieldVehicle();
    builFormInput(formVehicleInput.formfieldVehicle).then(function(uidVehicle){
      $("#vehicle-general").html(uidVehicle);
      builFormInput(formVehicleInput.vehicleFormMaintenance).then(function(uidVehicleMaintenance){
        $("#vehicle-maintenance").html(uidVehicleMaintenance);
        buildFormValidation();
        appRenderSelect2('#form-add-vehicle #group_id');
        formVehicleAddValidation= $('#form-add-vehicle').parsley();
        $("#modalCreateVehicle").modal('show');
      });
    });
  }
  $(document).on('click','.open-form-new-modal',function(){ openNewFormModal(); });
  var dataTable= $('#dtVehicles').DataTable({
      'processing': true,
      'serverSide': true,
      'serverMethod': 'post',
      //'searching': false, // Remove default Search Control
      'ajax': {
        'url': '/vehicles/list/',
        // "contentType": "application/json",
        "dataType": "json",
        "method": "POST",
        // "data": function (d) {
        //    return JSON.stringify(d);
        // },
        // "data": JSON.stringify({data})
        'data': function (data) {
          // console.log(data);
          // data.form_option = 1; 
          searchFields = $('#form_filter_dt').serializeArray(); 
          for (var i = 0; i < searchFields.length; i++) { 
            data[searchFields[i].name] = searchFields[i].value; 
          } 
        }
      },
      "language":SetdataTableLanguage,
      "aaSorting": [],
      'columns': [
        { data: 'stt' },
      //   { data: 'image' },
        { data: 'id' },
        { data: 'ficha' },
        { data: 'identity' },
        { data: 'imei' },
        { data: 'company' },
        { data: 'group_id' },
        { data: 'type' },
        { data: 'brand' },
        { data: 'plate' },
        { data: 'status' },
        { data: 'date_created' },
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
        $('td:eq(12)', row).html(` <a href="javascript:void(0);" class="me-3 text-primary btn-open-record" data-bs-container="#tooltip-container3" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar" data-id="${data.id}"><i class="mdi mdi-pencil font-size-18"></i></a>
        <a href="javascript:void(0);" class="text-danger" data-bs-container="#tooltip-container3" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="mdi mdi-trash-can font-size-18"></i></a>`);
      }

  });

  
  $(document).on('submit','#form-add-vehicle',function(e){
    e.preventDefault(); //=== To Avoid Page Refresh and Fire the Event "Click"===
    if ( $(this).parsley().isValid() ) {
        submitCreateVehicle();
    }
  });
  
  $(document).on('submit','#form-edit-vehicle',function(e){
    e.preventDefault(); //=== To Avoid Page Refresh and Fire the Event "Click"===
    if ( $(this).parsley().isValid() ) {
      submitUpdateVehicle();
    }
  });
  
  $(document).on('change','#form-add-vehicle  #departament',function(){
    let getInputType = $(this).val();
    fillDepartmentSection(getInputType,"#form-add-vehicle  #section").then(function(uid){

    });
  });
  $(document).on('change','#form-add-vehicle  #company',function(){
    let getInputType = $(this).val();
    fillGroupOptions(getInputType,"#form-add-vehicle  #group_id",0).then(function(uid){

    });
  });

  $(document).on('change','#form-edit-vehicle  #departament',function(){
    let getInputType = $(this).val();
    fillDepartmentSection(getInputType,"#form-edit-vehicle  #section").then(function(uid){

    });
  });
  $(document).on('change','#form-edit-vehicle  #company',function(){
    let getInputType = $(this).val();
    fillGroupOptions(getInputType,"#form-edit-vehicle  #group_id",formFieldDataEdit.group_id).then(function(uid){
    });
  });

  var formSubmitPOST=function(formData){
    var settings = {
        "url": '/vehicle/create',
        "method": "POST",
        "timeout": 0,
        "headers": { "Content-Type": "application/json" },
        "data": JSON.stringify(formData),
        };
    
    $.ajax(settings).done(function (response) {
        if (response) {
          if(response.status =='ok'){
            dataTable.ajax.reload(null, false); 
            $("#modalCreateVehicle").modal('hide');
            $('#form-add-vehicle')[0].reset();
            toastr["success"](`Se ha agregado un nuevo registro satisfactoriamente!`);
          }else if(response.status =='found'){
            toastr["warning"](`Identificador: ${response.message}`);
          }else{
            toastr["error"](`Error: comunicacion con el servidor!`);
          }
        }
    });
  }
  var formFillWithData=function(thisFormData){
    formFieldEdit = new groupFieldVehicle();
    
    builFormInput(formFieldEdit.formfieldVehicle,thisFormData).then(function(uidVehicle){
      $("#edit-vehicle-general").html(uidVehicle);
      builFormInput(formFieldEdit.vehicleFormMaintenance,thisFormData).then(function(uidVehicleMaintenance){
        $("#edit-vehicle-maintenance").html(uidVehicleMaintenance);
        fillGroupOptions(thisFormData.company,"#form-edit-vehicle #group_id",thisFormData.group_id).then(function(uidGroups){
            fillDepartmentSection(thisFormData.departament,"#form-edit-vehicle  #section",thisFormData.section).then(function(uid){
              // $("#form-edit-vehicle #identity").prop('readonly', true);
              $("#form-edit-vehicle #odometro_gps").prop('disabled', true);
              $("#form-edit-vehicle #horometro_gps").prop('disabled', true);
              formVehicleEditValidation= $('#form-edit-vehicle').parsley();
              $('#modalEditVehicle').modal('show');
            });
        });
      });
    });
    // $("#edit-vehicle-general").html(builFormInput(formfieldVehicle,thisFormData));
    // $("#edit-vehicle-maintenance").html(builFormInput(vehicleFormMaintenance,thisFormData));
  }
  var formOpenRecord=function(recordID){
    
    var settings = {
        "url": '/vehicle',
        "method": "POST",
        "timeout": 0,
        "headers": { "Content-Type": "application/json" },
        // "data": 'vehicle_id='+recordID,
        "data": JSON.stringify({ "vehicle_id": recordID }),
        };
    
    $.ajax(settings).done(function (response) {
        if (response) {
          formFieldDataEdit=response.data;
          formFillWithData(response.data);
        }
    });
  }
  var fillGroupOptions=function(company_id,form_select,optionSelected){
    return new Promise(function(resolve, reject){
      var settings = {
        "url": '/app-group',
        "method": "POST",
        "timeout": 0,
        "headers": { "Content-Type": "application/json" },
        "data": JSON.stringify({ "company_id": company_id }),
      };

      $.ajax(settings).done(function (response) {
          if (response.data) {
            $(form_select).empty();
            $(form_select).append($('<option>', {value:'', text:'---'}));
            response.data.forEach((thisSection,index,array) => {
              $(form_select).append($('<option>', {value:thisSection.value, text:thisSection.text}));
              if (index === array.length - 1) { 
                $(form_select).select2();
                if( optionSelected != 0){ 
                  console.log('ddd',optionSelected);
                  if( optionSelected != null){
                    let strOptionsGroups = optionSelected.split(',');
                    $(form_select).select2().val(strOptionsGroups).trigger('change');
                  }
                }
                resolve(); 
              }
            });
          }else{
            $(form_select).select2();
            resolve(); 
          }
      });
    });
  }
  var fillDepartmentSection=function(department_id,form_select,optionSelected){
    return new Promise(function(resolve, reject){
      var settings = {
        "url": '/app-section',
        "method": "POST",
        "timeout": 0,
        "headers": { "Content-Type": "application/json" },
        "data": JSON.stringify({ "department_id": department_id }),
        };
      
        $.ajax(settings).done(function (response) {
          if (response) {
              $(form_select).empty();
              $(form_select).append($('<option>', {value:'', text:'---'}));
              response.data.forEach((thisSection,index,array) => {
                $(form_select).append($('<option>', {value:thisSection.value, text:thisSection.text}));
                if (index === array.length - 1) { 
                  if(optionSelected !=0){
                    $(form_select).val(optionSelected);
                  }
                  resolve(); 
                }
              });
          }
        });
    });
  }
  var submitCreateVehicle=function(){
    let data =getFormData('form-add-vehicle');
    let userGroups=$('#form-add-vehicle #group_id').select2("val");
        data.group_id=userGroups.toString();
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

  var formSubmitUpdatePOST=function(formData){
    var settings = {
        "url": '/vehicle/update',
        "method": "POST",
        "timeout": 0,
        "headers": { "Content-Type": "application/json" },
        "data": JSON.stringify(formData),
        };
    
    $.ajax(settings).done(function (response) {
        if (response) {
            dataTable.ajax.reload(null, false); 
            $("#modalEditVehicle").modal('hide');
        }
    });
  }
  var submitUpdateVehicle=function(){
    // var data =$("#form-add-vehicle").serialize();
    let data =getFormData('form-edit-vehicle');
    let userGroups=$('#form-edit-vehicle #group_id').select2("val");
        data.group_id=userGroups.toString();
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
            // this.updateDriver(data);
        } 
    });
  }
  $(document).on('click','.btn-open-record',function(){
    let getRecordId= $(this).attr('data-id');
    formOpenRecord(getRecordId);
  });
  
});