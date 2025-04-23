document.getElementById('formSolicitudProcedimiento').addEventListener('submit', function(event) {
  event.preventDefault();

  // 1. DATOS PACIENTE
  const nombrePaciente = document.getElementById('nombrePaciente').value;
  const edadPaciente = document.getElementById('edadPaciente').value;
  const cedulaPaciente = document.getElementById('cedulaPaciente').value;

  // 2. DATOS DEL MEDICO
  const nombreMedico = document.getElementById('nombreMedico').value;
  const cedulaMedico = document.getElementById('cedulaMedico').value;

  // 3. DETALLES DEL PROCEDIMIENTO
  const fechaProcedimiento = document.getElementById('fechaProcedimiento').value;
  const nombreProcedimiento = document.getElementById('nombreProcedimiento').value;
  const procedimientoRealizado = document.getElementById('procedimientoRealizado').checked; // true o false
  const detallesProcedimiento = document.getElementById('detallesProcedimiento').value;
  const personalEncargado = document.getElementById('personalEncargado').value;
  const horaProcedimiento = document.getElementById('horaProcedimiento').value;

  // Construir el objeto con los datos organizados en apartados
  const serviceRequestData = {
    paciente: {
      nombre: nombrePaciente,
      edad: edadPaciente,
      cedula: cedulaPaciente
    },
    medico: {
      nombre: nombreMedico,
      cedula: cedulaMedico
    },
    procedimiento: {
      fecha: fechaProcedimiento,
      nombre: nombreProcedimiento,
      realizado: procedimientoRealizado,
      detalles: detallesProcedimiento,
      personalEncargado: personalEncargado,
      hora: horaProcedimiento
    }
  };

  console.log('Datos de la solicitud:', serviceRequestData);

  // Enviar la solicitud al backend
  fetch('https://hl7-fhir-ehr-karol-1.onrender.com/service-request/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serviceRequestData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
    alert('Solicitud de procedimiento creada exitosamente! ID: ' + data._id);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Hubo un error en la solicitud: ' + error.message);
  });
});
